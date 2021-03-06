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
var balance_proxy_allowance_lazy_store_1 = require("../stores/balance_proxy_allowance_lazy_store");
var types_2 = require("../types");
var constants_1 = require("../utils/constants");
var FailureReason;
(function (FailureReason) {
    FailureReason["Balance"] = "balance";
    FailureReason["ProxyAllowance"] = "proxyAllowance";
})(FailureReason || (FailureReason = {}));
var ERR_MSG_MAPPING = (_a = {},
    _a[FailureReason.Balance] = (_b = {},
        _b[types_2.TradeSide.Maker] = (_c = {},
            _c[types_2.TransferType.Trade] = types_1.ExchangeContractErrs.InsufficientMakerBalance,
            _c[types_2.TransferType.Fee] = types_1.ExchangeContractErrs.InsufficientMakerFeeBalance,
            _c),
        _b[types_2.TradeSide.Taker] = (_d = {},
            _d[types_2.TransferType.Trade] = types_1.ExchangeContractErrs.InsufficientTakerBalance,
            _d[types_2.TransferType.Fee] = types_1.ExchangeContractErrs.InsufficientTakerFeeBalance,
            _d),
        _b),
    _a[FailureReason.ProxyAllowance] = (_e = {},
        _e[types_2.TradeSide.Maker] = (_f = {},
            _f[types_2.TransferType.Trade] = types_1.ExchangeContractErrs.InsufficientMakerAllowance,
            _f[types_2.TransferType.Fee] = types_1.ExchangeContractErrs.InsufficientMakerFeeAllowance,
            _f),
        _e[types_2.TradeSide.Taker] = (_g = {},
            _g[types_2.TransferType.Trade] = types_1.ExchangeContractErrs.InsufficientTakerAllowance,
            _g[types_2.TransferType.Fee] = types_1.ExchangeContractErrs.InsufficientTakerFeeAllowance,
            _g),
        _e),
    _a);
var ExchangeTransferSimulator = /** @class */ (function () {
    function ExchangeTransferSimulator(token, defaultBlock) {
        this._store = new balance_proxy_allowance_lazy_store_1.BalanceAndProxyAllowanceLazyStore(token, defaultBlock);
        this._UNLIMITED_ALLOWANCE_IN_BASE_UNITS = token.UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
    }
    ExchangeTransferSimulator._throwValidationError = function (failureReason, tradeSide, transferType) {
        var errMsg = ERR_MSG_MAPPING[failureReason][tradeSide][transferType];
        throw new Error(errMsg);
    };
    /**
     * Simulates transferFrom call performed by a proxy
     * @param  tokenAddress      Address of the token to be transferred
     * @param  from              Owner of the transferred tokens
     * @param  to                Recipient of the transferred tokens
     * @param  amountInBaseUnits The amount of tokens being transferred
     * @param  tradeSide         Is Maker/Taker transferring
     * @param  transferType      Is it a fee payment or a value transfer
     */
    ExchangeTransferSimulator.prototype.transferFromAsync = function (tokenAddress, from, to, amountInBaseUnits, tradeSide, transferType) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, proxyAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(from === constants_1.constants.NULL_ADDRESS && tradeSide === types_2.TradeSide.Taker)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._increaseBalanceAsync(tokenAddress, to, amountInBaseUnits)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this._store.getBalanceAsync(tokenAddress, from)];
                    case 3:
                        balance = _a.sent();
                        return [4 /*yield*/, this._store.getProxyAllowanceAsync(tokenAddress, from)];
                    case 4:
                        proxyAllowance = _a.sent();
                        if (proxyAllowance.lessThan(amountInBaseUnits)) {
                            ExchangeTransferSimulator._throwValidationError(FailureReason.ProxyAllowance, tradeSide, transferType);
                        }
                        if (balance.lessThan(amountInBaseUnits)) {
                            ExchangeTransferSimulator._throwValidationError(FailureReason.Balance, tradeSide, transferType);
                        }
                        return [4 /*yield*/, this._decreaseProxyAllowanceAsync(tokenAddress, from, amountInBaseUnits)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this._decreaseBalanceAsync(tokenAddress, from, amountInBaseUnits)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this._increaseBalanceAsync(tokenAddress, to, amountInBaseUnits)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeTransferSimulator.prototype._decreaseProxyAllowanceAsync = function (tokenAddress, userAddress, amountInBaseUnits) {
        return __awaiter(this, void 0, void 0, function () {
            var proxyAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._store.getProxyAllowanceAsync(tokenAddress, userAddress)];
                    case 1:
                        proxyAllowance = _a.sent();
                        if (!proxyAllowance.eq(this._UNLIMITED_ALLOWANCE_IN_BASE_UNITS)) {
                            this._store.setProxyAllowance(tokenAddress, userAddress, proxyAllowance.minus(amountInBaseUnits));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeTransferSimulator.prototype._increaseBalanceAsync = function (tokenAddress, userAddress, amountInBaseUnits) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._store.getBalanceAsync(tokenAddress, userAddress)];
                    case 1:
                        balance = _a.sent();
                        this._store.setBalance(tokenAddress, userAddress, balance.plus(amountInBaseUnits));
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeTransferSimulator.prototype._decreaseBalanceAsync = function (tokenAddress, userAddress, amountInBaseUnits) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._store.getBalanceAsync(tokenAddress, userAddress)];
                    case 1:
                        balance = _a.sent();
                        this._store.setBalance(tokenAddress, userAddress, balance.minus(amountInBaseUnits));
                        return [2 /*return*/];
                }
            });
        });
    };
    return ExchangeTransferSimulator;
}());
exports.ExchangeTransferSimulator = ExchangeTransferSimulator;
var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=exchange_transfer_simulator.js.map