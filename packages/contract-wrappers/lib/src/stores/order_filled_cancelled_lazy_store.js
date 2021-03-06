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
var _ = require("lodash");
/**
 * Copy on read store for filled/cancelled taker amounts
 */
var OrderFilledCancelledLazyStore = /** @class */ (function () {
    function OrderFilledCancelledLazyStore(exchange, defaultBlock) {
        this._exchangeWrapper = exchange;
        this._defaultBlock = defaultBlock;
        this._filledTakerAmount = {};
        this._cancelledTakerAmount = {};
    }
    OrderFilledCancelledLazyStore.prototype.getFilledTakerAmountAsync = function (orderHash) {
        return __awaiter(this, void 0, void 0, function () {
            var methodOpts, filledTakerAmount, cachedFilled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_.isUndefined(this._filledTakerAmount[orderHash])) return [3 /*break*/, 2];
                        methodOpts = {
                            defaultBlock: this._defaultBlock,
                        };
                        return [4 /*yield*/, this._exchangeWrapper.getFilledTakerAmountAsync(orderHash, methodOpts)];
                    case 1:
                        filledTakerAmount = _a.sent();
                        this.setFilledTakerAmount(orderHash, filledTakerAmount);
                        _a.label = 2;
                    case 2:
                        cachedFilled = this._filledTakerAmount[orderHash];
                        return [2 /*return*/, cachedFilled];
                }
            });
        });
    };
    OrderFilledCancelledLazyStore.prototype.setFilledTakerAmount = function (orderHash, filledTakerAmount) {
        this._filledTakerAmount[orderHash] = filledTakerAmount;
    };
    OrderFilledCancelledLazyStore.prototype.deleteFilledTakerAmount = function (orderHash) {
        delete this._filledTakerAmount[orderHash];
    };
    OrderFilledCancelledLazyStore.prototype.getCancelledTakerAmountAsync = function (orderHash) {
        return __awaiter(this, void 0, void 0, function () {
            var methodOpts, cancelledTakerAmount, cachedCancelled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_.isUndefined(this._cancelledTakerAmount[orderHash])) return [3 /*break*/, 2];
                        methodOpts = {
                            defaultBlock: this._defaultBlock,
                        };
                        return [4 /*yield*/, this._exchangeWrapper.getCancelledTakerAmountAsync(orderHash, methodOpts)];
                    case 1:
                        cancelledTakerAmount = _a.sent();
                        this.setCancelledTakerAmount(orderHash, cancelledTakerAmount);
                        _a.label = 2;
                    case 2:
                        cachedCancelled = this._cancelledTakerAmount[orderHash];
                        return [2 /*return*/, cachedCancelled];
                }
            });
        });
    };
    OrderFilledCancelledLazyStore.prototype.setCancelledTakerAmount = function (orderHash, cancelledTakerAmount) {
        this._cancelledTakerAmount[orderHash] = cancelledTakerAmount;
    };
    OrderFilledCancelledLazyStore.prototype.deleteCancelledTakerAmount = function (orderHash) {
        delete this._cancelledTakerAmount[orderHash];
    };
    OrderFilledCancelledLazyStore.prototype.deleteAll = function () {
        this._filledTakerAmount = {};
        this._cancelledTakerAmount = {};
    };
    OrderFilledCancelledLazyStore.prototype.getUnavailableTakerAmountAsync = function (orderHash) {
        return __awaiter(this, void 0, void 0, function () {
            var unavailableTakerAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._exchangeWrapper.getUnavailableTakerAmountAsync(orderHash)];
                    case 1:
                        unavailableTakerAmount = _a.sent();
                        return [2 /*return*/, unavailableTakerAmount];
                }
            });
        });
    };
    OrderFilledCancelledLazyStore.prototype.getZRXTokenAddress = function () {
        var zrxToken = this._exchangeWrapper.getZRXTokenAddress();
        return zrxToken;
    };
    return OrderFilledCancelledLazyStore;
}());
exports.OrderFilledCancelledLazyStore = OrderFilledCancelledLazyStore;
//# sourceMappingURL=order_filled_cancelled_lazy_store.js.map