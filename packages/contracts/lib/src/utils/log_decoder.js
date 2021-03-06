"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
var _ = require("lodash");
var artifacts_1 = require("./artifacts");
var constants_1 = require("./constants");
var LogDecoder = /** @class */ (function () {
    function LogDecoder(web3Wrapper, contractAddress) {
        this._web3Wrapper = web3Wrapper;
        this._contractAddress = contractAddress;
        var abiArrays = [];
        _.forEach(artifacts_1.artifacts, function (artifact) {
            var compilerOutput = artifact.compilerOutput;
            abiArrays.push(compilerOutput.abi);
        });
        this._abiDecoder = new utils_1.AbiDecoder(abiArrays);
    }
    LogDecoder.wrapLogBigNumbers = function (log) {
        var argNames = _.keys(log.args);
        for (var _i = 0, argNames_1 = argNames; _i < argNames_1.length; _i++) {
            var argName = argNames_1[_i];
            var isWeb3BigNumber = _.startsWith(log.args[argName].constructor.toString(), 'function BigNumber(');
            if (isWeb3BigNumber) {
                log.args[argName] = new utils_1.BigNumber(log.args[argName]);
            }
        }
    };
    LogDecoder.prototype.decodeLogOrThrow = function (log) {
        var logWithDecodedArgsOrLog = this._abiDecoder.tryToDecodeLogOrNoop(log);
        if (_.isUndefined(logWithDecodedArgsOrLog.args)) {
            throw new Error("Unable to decode log: " + JSON.stringify(log));
        }
        LogDecoder.wrapLogBigNumbers(logWithDecodedArgsOrLog);
        return logWithDecodedArgsOrLog;
    };
    LogDecoder.prototype.getTxWithDecodedLogsAsync = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._web3Wrapper.awaitTransactionSuccessAsync(txHash, constants_1.constants.AWAIT_TRANSACTION_MINED_MS)];
                    case 1:
                        tx = _a.sent();
                        tx.logs = _.filter(tx.logs, function (log) { return log.address === _this._contractAddress; });
                        tx.logs = _.map(tx.logs, function (log) { return _this.decodeLogOrThrow(log); });
                        return [2 /*return*/, tx];
                }
            });
        });
    };
    return LogDecoder;
}());
exports.LogDecoder = LogDecoder;
//# sourceMappingURL=log_decoder.js.map