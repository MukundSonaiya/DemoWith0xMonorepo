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
var order_utils_1 = require("@0xproject/order-utils");
var types_1 = require("@0xproject/types");
var _ = require("lodash");
var types_2 = require("../types");
var constants_1 = require("../utils/constants");
var utils_1 = require("../utils/utils");
var OrderValidationUtils = /** @class */ (function () {
    function OrderValidationUtils(exchangeWrapper) {
        this._exchangeWrapper = exchangeWrapper;
    }
    OrderValidationUtils.validateCancelOrderThrowIfInvalid = function (order, cancelTakerTokenAmount, unavailableTakerTokenAmount) {
        if (cancelTakerTokenAmount.eq(0)) {
            throw new Error(types_1.ExchangeContractErrs.OrderCancelAmountZero);
        }
        if (order.takerTokenAmount.eq(unavailableTakerTokenAmount)) {
            throw new Error(types_1.ExchangeContractErrs.OrderAlreadyCancelledOrFilled);
        }
        var currentUnixTimestampSec = utils_1.utils.getCurrentUnixTimestampSec();
        if (order.expirationUnixTimestampSec.lessThan(currentUnixTimestampSec)) {
            throw new Error(types_1.ExchangeContractErrs.OrderCancelExpired);
        }
    };
    OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync = function (exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, senderAddress, zrxTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var fillMakerTokenAmount, makerFeeAmount, takerFeeAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fillMakerTokenAmount = OrderValidationUtils._getPartialAmount(fillTakerTokenAmount, signedOrder.takerTokenAmount, signedOrder.makerTokenAmount);
                        return [4 /*yield*/, exchangeTradeEmulator.transferFromAsync(signedOrder.makerTokenAddress, signedOrder.maker, senderAddress, fillMakerTokenAmount, types_2.TradeSide.Maker, types_2.TransferType.Trade)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, exchangeTradeEmulator.transferFromAsync(signedOrder.takerTokenAddress, senderAddress, signedOrder.maker, fillTakerTokenAmount, types_2.TradeSide.Taker, types_2.TransferType.Trade)];
                    case 2:
                        _a.sent();
                        makerFeeAmount = OrderValidationUtils._getPartialAmount(fillTakerTokenAmount, signedOrder.takerTokenAmount, signedOrder.makerFee);
                        return [4 /*yield*/, exchangeTradeEmulator.transferFromAsync(zrxTokenAddress, signedOrder.maker, signedOrder.feeRecipient, makerFeeAmount, types_2.TradeSide.Maker, types_2.TransferType.Fee)];
                    case 3:
                        _a.sent();
                        takerFeeAmount = OrderValidationUtils._getPartialAmount(fillTakerTokenAmount, signedOrder.takerTokenAmount, signedOrder.takerFee);
                        return [4 /*yield*/, exchangeTradeEmulator.transferFromAsync(zrxTokenAddress, senderAddress, signedOrder.feeRecipient, takerFeeAmount, types_2.TradeSide.Taker, types_2.TransferType.Fee)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderValidationUtils._validateRemainingFillAmountNotZeroOrThrow = function (takerTokenAmount, unavailableTakerTokenAmount) {
        if (takerTokenAmount.eq(unavailableTakerTokenAmount)) {
            throw new Error(types_1.ExchangeContractErrs.OrderRemainingFillAmountZero);
        }
    };
    OrderValidationUtils._validateOrderNotExpiredOrThrow = function (expirationUnixTimestampSec) {
        var currentUnixTimestampSec = utils_1.utils.getCurrentUnixTimestampSec();
        if (expirationUnixTimestampSec.lessThan(currentUnixTimestampSec)) {
            throw new Error(types_1.ExchangeContractErrs.OrderFillExpired);
        }
    };
    OrderValidationUtils._getPartialAmount = function (numerator, denominator, target) {
        var fillMakerTokenAmount = numerator
            .mul(target)
            .div(denominator)
            .round(0);
        return fillMakerTokenAmount;
    };
    OrderValidationUtils.prototype.validateOrderFillableOrThrowAsync = function (exchangeTradeEmulator, signedOrder, zrxTokenAddress, expectedFillTakerTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var orderHash, unavailableTakerTokenAmount, fillTakerTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderHash = order_utils_1.getOrderHashHex(signedOrder);
                        return [4 /*yield*/, this._exchangeWrapper.getUnavailableTakerAmountAsync(orderHash)];
                    case 1:
                        unavailableTakerTokenAmount = _a.sent();
                        OrderValidationUtils._validateRemainingFillAmountNotZeroOrThrow(signedOrder.takerTokenAmount, unavailableTakerTokenAmount);
                        OrderValidationUtils._validateOrderNotExpiredOrThrow(signedOrder.expirationUnixTimestampSec);
                        fillTakerTokenAmount = signedOrder.takerTokenAmount.minus(unavailableTakerTokenAmount);
                        if (!_.isUndefined(expectedFillTakerTokenAmount)) {
                            fillTakerTokenAmount = expectedFillTakerTokenAmount;
                        }
                        return [4 /*yield*/, OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, signedOrder.taker, zrxTokenAddress)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderValidationUtils.prototype.validateFillOrderThrowIfInvalidAsync = function (exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, takerAddress, zrxTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var orderHash, unavailableTakerTokenAmount, remainingTakerTokenAmount, filledTakerTokenAmount, wouldRoundingErrorOccur;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (fillTakerTokenAmount.eq(0)) {
                            throw new Error(types_1.ExchangeContractErrs.OrderFillAmountZero);
                        }
                        orderHash = order_utils_1.getOrderHashHex(signedOrder);
                        if (!order_utils_1.isValidSignature(orderHash, signedOrder.ecSignature, signedOrder.maker)) {
                            throw new Error(order_utils_1.OrderError.InvalidSignature);
                        }
                        return [4 /*yield*/, this._exchangeWrapper.getUnavailableTakerAmountAsync(orderHash)];
                    case 1:
                        unavailableTakerTokenAmount = _a.sent();
                        OrderValidationUtils._validateRemainingFillAmountNotZeroOrThrow(signedOrder.takerTokenAmount, unavailableTakerTokenAmount);
                        if (signedOrder.taker !== constants_1.constants.NULL_ADDRESS && signedOrder.taker !== takerAddress) {
                            throw new Error(types_1.ExchangeContractErrs.TransactionSenderIsNotFillOrderTaker);
                        }
                        OrderValidationUtils._validateOrderNotExpiredOrThrow(signedOrder.expirationUnixTimestampSec);
                        remainingTakerTokenAmount = signedOrder.takerTokenAmount.minus(unavailableTakerTokenAmount);
                        filledTakerTokenAmount = remainingTakerTokenAmount.lessThan(fillTakerTokenAmount)
                            ? remainingTakerTokenAmount
                            : fillTakerTokenAmount;
                        return [4 /*yield*/, OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, filledTakerTokenAmount, takerAddress, zrxTokenAddress)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._exchangeWrapper.isRoundingErrorAsync(filledTakerTokenAmount, signedOrder.takerTokenAmount, signedOrder.makerTokenAmount)];
                    case 3:
                        wouldRoundingErrorOccur = _a.sent();
                        if (wouldRoundingErrorOccur) {
                            throw new Error(types_1.ExchangeContractErrs.OrderFillRoundingError);
                        }
                        return [2 /*return*/, filledTakerTokenAmount];
                }
            });
        });
    };
    OrderValidationUtils.prototype.validateFillOrKillOrderThrowIfInvalidAsync = function (exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, takerAddress, zrxTokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var filledTakerTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateFillOrderThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, takerAddress, zrxTokenAddress)];
                    case 1:
                        filledTakerTokenAmount = _a.sent();
                        if (filledTakerTokenAmount !== fillTakerTokenAmount) {
                            throw new Error(types_1.ExchangeContractErrs.InsufficientRemainingFillAmount);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrderValidationUtils;
}());
exports.OrderValidationUtils = OrderValidationUtils;
//# sourceMappingURL=order_validation_utils.js.map