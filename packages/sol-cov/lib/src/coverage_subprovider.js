"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var subproviders_1 = require("@0xproject/subproviders");
var _ = require("lodash");
var semaphore_async_await_1 = require("semaphore-async-await");
var constants_1 = require("./constants");
var coverage_manager_1 = require("./coverage_manager");
var trace_1 = require("./trace");
var types_1 = require("./types");
// Because there is no notion of a call trace in the Ethereum rpc - we collect them in a rather non-obvious/hacky way.
// On each call - we create a snapshot, execute the call as a transaction, get the trace, revert the snapshot.
// That allows us to avoid influencing test behaviour.
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It collects traces of all transactions that were sent and all calls that were executed through JSON RPC.
 */
var CoverageSubprovider = /** @class */ (function (_super) {
    __extends(CoverageSubprovider, _super);
    /**
     * Instantiates a CoverageSubprovider instance
     * @param artifactAdapter Adapter for used artifacts format (0x, truffle, giveth, etc.)
     * @param defaultFromAddress default from address to use when sending transactions
     * @param isVerbose If true, we will log any unknown transactions. Otherwise we will ignore them
     */
    function CoverageSubprovider(artifactAdapter, defaultFromAddress, isVerbose) {
        if (isVerbose === void 0) { isVerbose = true; }
        var _this = _super.call(this) || this;
        _this._lock = new semaphore_async_await_1.Lock();
        _this._defaultFromAddress = defaultFromAddress;
        _this._coverageManager = new coverage_manager_1.CoverageManager(artifactAdapter, _this._getContractCodeAsync.bind(_this), isVerbose);
        return _this;
    }
    /**
     * Write the test coverage results to a file in Istanbul format.
     */
    CoverageSubprovider.prototype.writeCoverageAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._coverageManager.writeCoverageAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    // tslint:disable-next-line:prefer-function-over-method async-suffix
    CoverageSubprovider.prototype.handleRequest = function (payload, next, end) {
        return __awaiter(this, void 0, void 0, function () {
            var txData, callData, blockNumber;
            return __generator(this, function (_a) {
                switch (payload.method) {
                    case 'eth_sendTransaction':
                        txData = payload.params[0];
                        next(this._onTransactionSentAsync.bind(this, txData));
                        return [2 /*return*/];
                    case 'eth_call':
                        callData = payload.params[0];
                        blockNumber = payload.params[1];
                        next(this._onCallExecutedAsync.bind(this, callData, blockNumber));
                        return [2 /*return*/];
                    default:
                        next();
                        return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    CoverageSubprovider.prototype._onTransactionSentAsync = function (txData, err, txHash, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var toAddress, payload, jsonRPCResponsePayload, transactions, _i, transactions_1, transaction, toAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!txData.isFakeTransaction) return [3 /*break*/, 2];
                        // This transaction is a usual ttransaction. Not a call executed as one.
                        // And we don't want it to be executed within a snapshotting period
                        return [4 /*yield*/, this._lock.acquire()];
                    case 1:
                        // This transaction is a usual ttransaction. Not a call executed as one.
                        // And we don't want it to be executed within a snapshotting period
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!_.isNull(err)) return [3 /*break*/, 4];
                        toAddress = _.isUndefined(txData.to) || txData.to === '0x0' ? constants_1.constants.NEW_CONTRACT : txData.to;
                        return [4 /*yield*/, this._recordTxTraceAsync(toAddress, txData.data, txHash)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 4:
                        payload = {
                            method: 'eth_getBlockByNumber',
                            params: [types_1.BlockParamLiteral.Latest, true],
                        };
                        return [4 /*yield*/, this.emitPayloadAsync(payload)];
                    case 5:
                        jsonRPCResponsePayload = _a.sent();
                        transactions = jsonRPCResponsePayload.result.transactions;
                        _i = 0, transactions_1 = transactions;
                        _a.label = 6;
                    case 6:
                        if (!(_i < transactions_1.length)) return [3 /*break*/, 9];
                        transaction = transactions_1[_i];
                        toAddress = _.isUndefined(txData.to) || txData.to === '0x0' ? constants_1.constants.NEW_CONTRACT : txData.to;
                        return [4 /*yield*/, this._recordTxTraceAsync(toAddress, transaction.data, transaction.hash)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9:
                        if (!txData.isFakeTransaction) {
                            // This transaction is a usual ttransaction. Not a call executed as one.
                            // And we don't want it to be executed within a snapshotting period
                            this._lock.release();
                        }
                        cb();
                        return [2 /*return*/];
                }
            });
        });
    };
    CoverageSubprovider.prototype._onCallExecutedAsync = function (callData, blockNumber, err, callResult, cb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._recordCallTraceAsync(callData, blockNumber)];
                    case 1:
                        _a.sent();
                        cb();
                        return [2 /*return*/];
                }
            });
        });
    };
    CoverageSubprovider.prototype._recordTxTraceAsync = function (address, data, txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, jsonRPCResponsePayload, trace, tracesByContractAddress, subcallAddresses, _i, subcallAddresses_1, subcallAddress, traceInfo, traceForThatSubcall, coveredPcs, runtimeBytecode, traceForThatSubcall, coveredPcs, _a, subcallAddresses_2, subcallAddress, runtimeBytecode, traceForThatSubcall, coveredPcs, traceInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        payload = {
                            method: 'debug_traceTransaction',
                            params: [txHash, { disableMemory: true, disableStack: false, disableStorage: true }],
                        };
                        return [4 /*yield*/, this.emitPayloadAsync(payload)];
                    case 1:
                        jsonRPCResponsePayload = _b.sent();
                        trace = jsonRPCResponsePayload.result;
                        tracesByContractAddress = trace_1.getTracesByContractAddress(trace.structLogs, address);
                        subcallAddresses = _.keys(tracesByContractAddress);
                        if (!(address === constants_1.constants.NEW_CONTRACT)) return [3 /*break*/, 8];
                        _i = 0, subcallAddresses_1 = subcallAddresses;
                        _b.label = 2;
                    case 2:
                        if (!(_i < subcallAddresses_1.length)) return [3 /*break*/, 7];
                        subcallAddress = subcallAddresses_1[_i];
                        traceInfo = void 0;
                        if (!(subcallAddress === 'NEW_CONTRACT')) return [3 /*break*/, 3];
                        traceForThatSubcall = tracesByContractAddress[subcallAddress];
                        coveredPcs = _.map(traceForThatSubcall, function (log) { return log.pc; });
                        traceInfo = {
                            coveredPcs: coveredPcs,
                            txHash: txHash,
                            address: constants_1.constants.NEW_CONTRACT,
                            bytecode: data,
                        };
                        return [3 /*break*/, 5];
                    case 3:
                        payload = { method: 'eth_getCode', params: [subcallAddress, types_1.BlockParamLiteral.Latest] };
                        return [4 /*yield*/, this.emitPayloadAsync(payload)];
                    case 4:
                        jsonRPCResponsePayload = _b.sent();
                        runtimeBytecode = jsonRPCResponsePayload.result;
                        traceForThatSubcall = tracesByContractAddress[subcallAddress];
                        coveredPcs = _.map(traceForThatSubcall, function (log) { return log.pc; });
                        traceInfo = {
                            coveredPcs: coveredPcs,
                            txHash: txHash,
                            address: subcallAddress,
                            runtimeBytecode: runtimeBytecode,
                        };
                        _b.label = 5;
                    case 5:
                        this._coverageManager.appendTraceInfo(traceInfo);
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 12];
                    case 8:
                        _a = 0, subcallAddresses_2 = subcallAddresses;
                        _b.label = 9;
                    case 9:
                        if (!(_a < subcallAddresses_2.length)) return [3 /*break*/, 12];
                        subcallAddress = subcallAddresses_2[_a];
                        payload = { method: 'eth_getCode', params: [subcallAddress, types_1.BlockParamLiteral.Latest] };
                        return [4 /*yield*/, this.emitPayloadAsync(payload)];
                    case 10:
                        jsonRPCResponsePayload = _b.sent();
                        runtimeBytecode = jsonRPCResponsePayload.result;
                        traceForThatSubcall = tracesByContractAddress[subcallAddress];
                        coveredPcs = _.map(traceForThatSubcall, function (log) { return log.pc; });
                        traceInfo = {
                            coveredPcs: coveredPcs,
                            txHash: txHash,
                            address: subcallAddress,
                            runtimeBytecode: runtimeBytecode,
                        };
                        this._coverageManager.appendTraceInfo(traceInfo);
                        _b.label = 11;
                    case 11:
                        _a++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    CoverageSubprovider.prototype._recordCallTraceAsync = function (callData, blockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var snapshotId, _a, fakeTxData, err_1, jsonRPCResponse, didRevert;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // We don't want other transactions to be exeucted during snashotting period, that's why we lock the
                    // transaction execution for all transactions except our fake ones.
                    return [4 /*yield*/, this._lock.acquire()];
                    case 1:
                        // We don't want other transactions to be exeucted during snashotting period, that's why we lock the
                        // transaction execution for all transactions except our fake ones.
                        _b.sent();
                        _a = Number;
                        return [4 /*yield*/, this.emitPayloadAsync({ method: 'evm_snapshot' })];
                    case 2:
                        snapshotId = _a.apply(void 0, [(_b.sent()).result]);
                        fakeTxData = __assign({ isFakeTransaction: true }, callData, { from: callData.from || this._defaultFromAddress });
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.emitPayloadAsync({
                                method: 'eth_sendTransaction',
                                params: [fakeTxData],
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        return [3 /*break*/, 6];
                    case 6: return [4 /*yield*/, this.emitPayloadAsync({ method: 'evm_revert', params: [snapshotId] })];
                    case 7:
                        jsonRPCResponse = _b.sent();
                        this._lock.release();
                        didRevert = jsonRPCResponse.result;
                        if (!didRevert) {
                            throw new Error('Failed to revert the snapshot');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CoverageSubprovider.prototype._getContractCodeAsync = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, jsonRPCResponsePayload, contractCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            method: 'eth_getCode',
                            params: [address, types_1.BlockParamLiteral.Latest],
                        };
                        return [4 /*yield*/, this.emitPayloadAsync(payload)];
                    case 1:
                        jsonRPCResponsePayload = _a.sent();
                        contractCode = jsonRPCResponsePayload.result;
                        return [2 /*return*/, contractCode];
                }
            });
        });
    };
    return CoverageSubprovider;
}(subproviders_1.Subprovider));
exports.CoverageSubprovider = CoverageSubprovider;
//# sourceMappingURL=coverage_subprovider.js.map