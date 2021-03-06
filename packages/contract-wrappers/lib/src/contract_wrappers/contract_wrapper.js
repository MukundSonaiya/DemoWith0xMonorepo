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
var types_1 = require("@0xproject/types");
var utils_1 = require("@0xproject/utils");
var ethereumjs_blockstream_1 = require("ethereumjs-blockstream");
var _ = require("lodash");
var types_2 = require("../types");
var constants_1 = require("../utils/constants");
var filter_utils_1 = require("../utils/filter_utils");
var CONTRACT_NAME_TO_NOT_FOUND_ERROR = {
    ZRX: types_2.ContractWrappersError.ZRXContractDoesNotExist,
    EtherToken: types_2.ContractWrappersError.EtherTokenContractDoesNotExist,
    Token: types_2.ContractWrappersError.TokenContractDoesNotExist,
    TokenRegistry: types_2.ContractWrappersError.TokenRegistryContractDoesNotExist,
    TokenTransferProxy: types_2.ContractWrappersError.TokenTransferProxyContractDoesNotExist,
    Exchange: types_2.ContractWrappersError.ExchangeContractDoesNotExist,
};
var ContractWrapper = /** @class */ (function () {
    function ContractWrapper(web3Wrapper, networkId) {
        this._web3Wrapper = web3Wrapper;
        this._networkId = networkId;
        this._filters = {};
        this._filterCallbacks = {};
        this._blockAndLogStreamerIfExists = undefined;
        this._onLogAddedSubscriptionToken = undefined;
        this._onLogRemovedSubscriptionToken = undefined;
    }
    ContractWrapper.prototype._unsubscribeAll = function () {
        var _this = this;
        var filterTokens = _.keys(this._filterCallbacks);
        _.each(filterTokens, function (filterToken) {
            _this._unsubscribe(filterToken);
        });
    };
    ContractWrapper.prototype._unsubscribe = function (filterToken, err) {
        if (_.isUndefined(this._filters[filterToken])) {
            throw new Error(types_2.ContractWrappersError.SubscriptionNotFound);
        }
        if (!_.isUndefined(err)) {
            var callback = this._filterCallbacks[filterToken];
            callback(err, undefined);
        }
        delete this._filters[filterToken];
        delete this._filterCallbacks[filterToken];
        if (_.isEmpty(this._filters)) {
            this._stopBlockAndLogStream();
        }
    };
    ContractWrapper.prototype._subscribe = function (address, eventName, indexFilterValues, abi, callback) {
        var filter = filter_utils_1.filterUtils.getFilter(address, eventName, indexFilterValues, abi);
        if (_.isUndefined(this._blockAndLogStreamerIfExists)) {
            this._startBlockAndLogStream();
        }
        var filterToken = filter_utils_1.filterUtils.generateUUID();
        this._filters[filterToken] = filter;
        this._filterCallbacks[filterToken] = callback;
        return filterToken;
    };
    ContractWrapper.prototype._getLogsAsync = function (address, eventName, blockRange, indexFilterValues, abi) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, logs, logsWithDecodedArguments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = filter_utils_1.filterUtils.getFilter(address, eventName, indexFilterValues, abi, blockRange);
                        return [4 /*yield*/, this._web3Wrapper.getLogsAsync(filter)];
                    case 1:
                        logs = _a.sent();
                        logsWithDecodedArguments = _.map(logs, this._tryToDecodeLogOrNoop.bind(this));
                        return [2 /*return*/, logsWithDecodedArguments];
                }
            });
        });
    };
    ContractWrapper.prototype._tryToDecodeLogOrNoop = function (log) {
        if (_.isUndefined(this._web3Wrapper.abiDecoder)) {
            throw new Error(types_2.InternalContractWrappersError.NoAbiDecoder);
        }
        var logWithDecodedArgs = this._web3Wrapper.abiDecoder.tryToDecodeLogOrNoop(log);
        return logWithDecodedArgs;
    };
    ContractWrapper.prototype._getContractAbiAndAddressFromArtifactsAsync = function (artifact, addressIfExists) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, doesContractExist, abiAndAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (_.isUndefined(addressIfExists)) {
                            if (_.isUndefined(artifact.networks[this._networkId])) {
                                throw new Error(types_2.ContractWrappersError.ContractNotDeployedOnNetwork);
                            }
                            contractAddress = artifact.networks[this._networkId].address.toLowerCase();
                        }
                        else {
                            contractAddress = addressIfExists;
                        }
                        return [4 /*yield*/, this._web3Wrapper.doesContractExistAtAddressAsync(contractAddress)];
                    case 1:
                        doesContractExist = _a.sent();
                        if (!doesContractExist) {
                            throw new Error(CONTRACT_NAME_TO_NOT_FOUND_ERROR[artifact.contract_name]);
                        }
                        abiAndAddress = [artifact.abi, contractAddress];
                        return [2 /*return*/, abiAndAddress];
                }
            });
        });
    };
    ContractWrapper.prototype._getContractAddress = function (artifact, addressIfExists) {
        if (_.isUndefined(addressIfExists)) {
            var contractAddress = artifact.networks[this._networkId].address;
            if (_.isUndefined(contractAddress)) {
                throw new Error(types_2.ContractWrappersError.ExchangeContractDoesNotExist);
            }
            return contractAddress;
        }
        else {
            return addressIfExists;
        }
    };
    ContractWrapper.prototype._onLogStateChanged = function (isRemoved, log) {
        var _this = this;
        _.forEach(this._filters, function (filter, filterToken) {
            if (filter_utils_1.filterUtils.matchesFilter(log, filter)) {
                var decodedLog = _this._tryToDecodeLogOrNoop(log);
                var logEvent = {
                    log: decodedLog,
                    isRemoved: isRemoved,
                };
                _this._filterCallbacks[filterToken](null, logEvent);
            }
        });
    };
    ContractWrapper.prototype._startBlockAndLogStream = function () {
        if (!_.isUndefined(this._blockAndLogStreamerIfExists)) {
            throw new Error(types_2.ContractWrappersError.SubscriptionAlreadyPresent);
        }
        this._blockAndLogStreamerIfExists = new ethereumjs_blockstream_1.BlockAndLogStreamer(this._web3Wrapper.getBlockAsync.bind(this._web3Wrapper), this._web3Wrapper.getLogsAsync.bind(this._web3Wrapper));
        var catchAllLogFilter = {};
        this._blockAndLogStreamerIfExists.addLogFilter(catchAllLogFilter);
        this._blockAndLogStreamIntervalIfExists = utils_1.intervalUtils.setAsyncExcludingInterval(this._reconcileBlockAsync.bind(this), constants_1.constants.DEFAULT_BLOCK_POLLING_INTERVAL, this._onReconcileBlockError.bind(this));
        var isRemoved = false;
        this._onLogAddedSubscriptionToken = this._blockAndLogStreamerIfExists.subscribeToOnLogAdded(this._onLogStateChanged.bind(this, isRemoved));
        isRemoved = true;
        this._onLogRemovedSubscriptionToken = this._blockAndLogStreamerIfExists.subscribeToOnLogRemoved(this._onLogStateChanged.bind(this, isRemoved));
    };
    ContractWrapper.prototype._onReconcileBlockError = function (err) {
        var _this = this;
        var filterTokens = _.keys(this._filterCallbacks);
        _.each(filterTokens, function (filterToken) {
            _this._unsubscribe(filterToken, err);
        });
    };
    ContractWrapper.prototype._setNetworkId = function (networkId) {
        this._networkId = networkId;
    };
    ContractWrapper.prototype._stopBlockAndLogStream = function () {
        if (_.isUndefined(this._blockAndLogStreamerIfExists)) {
            throw new Error(types_2.ContractWrappersError.SubscriptionNotFound);
        }
        this._blockAndLogStreamerIfExists.unsubscribeFromOnLogAdded(this._onLogAddedSubscriptionToken);
        this._blockAndLogStreamerIfExists.unsubscribeFromOnLogRemoved(this._onLogRemovedSubscriptionToken);
        utils_1.intervalUtils.clearAsyncExcludingInterval(this._blockAndLogStreamIntervalIfExists);
        delete this._blockAndLogStreamerIfExists;
    };
    ContractWrapper.prototype._reconcileBlockAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var latestBlock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._web3Wrapper.getBlockAsync(types_1.BlockParamLiteral.Latest)];
                    case 1:
                        latestBlock = _a.sent();
                        if (!!_.isUndefined(this._blockAndLogStreamerIfExists)) return [3 /*break*/, 3];
                        // If we clear the interval while fetching the block - this._blockAndLogStreamer will be undefined
                        return [4 /*yield*/, this._blockAndLogStreamerIfExists.reconcileNewBlock(latestBlock)];
                    case 2:
                        // If we clear the interval while fetching the block - this._blockAndLogStreamer will be undefined
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ContractWrapper;
}());
exports.ContractWrapper = ContractWrapper;
//# sourceMappingURL=contract_wrapper.js.map