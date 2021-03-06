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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var json_schemas_1 = require("@0xproject/json-schemas");
var order_utils_1 = require("@0xproject/order-utils");
var types_1 = require("@0xproject/types");
var utils_1 = require("@0xproject/utils");
var _ = require("lodash");
var artifacts_1 = require("../artifacts");
var simple_balance_and_proxy_allowance_fetcher_1 = require("../fetchers/simple_balance_and_proxy_allowance_fetcher");
var simple_order_filled_cancelled_fetcher_1 = require("../fetchers/simple_order_filled_cancelled_fetcher");
var types_2 = require("../types");
var assert_1 = require("../utils/assert");
var decorators_1 = require("../utils/decorators");
var exchange_transfer_simulator_1 = require("../utils/exchange_transfer_simulator");
var order_validation_utils_1 = require("../utils/order_validation_utils");
var contract_wrapper_1 = require("./contract_wrapper");
var exchange_1 = require("./generated/exchange");
var SHOULD_VALIDATE_BY_DEFAULT = true;
/**
 * This class includes all the functionality related to calling methods and subscribing to
 * events of the 0x Exchange smart contract.
 */
var ExchangeWrapper = /** @class */ (function (_super) {
    __extends(ExchangeWrapper, _super);
    function ExchangeWrapper(web3Wrapper, networkId, tokenWrapper, contractAddressIfExists, zrxContractAddressIfExists) {
        var _this = _super.call(this, web3Wrapper, networkId) || this;
        _this._exchangeContractErrCodesToMsg = (_a = {},
            _a[types_2.ExchangeContractErrCodes.ERROR_FILL_EXPIRED] = types_1.ExchangeContractErrs.OrderFillExpired,
            _a[types_2.ExchangeContractErrCodes.ERROR_CANCEL_EXPIRED] = types_1.ExchangeContractErrs.OrderFillExpired,
            _a[types_2.ExchangeContractErrCodes.ERROR_FILL_NO_VALUE] = types_1.ExchangeContractErrs.OrderRemainingFillAmountZero,
            _a[types_2.ExchangeContractErrCodes.ERROR_CANCEL_NO_VALUE] = types_1.ExchangeContractErrs.OrderRemainingFillAmountZero,
            _a[types_2.ExchangeContractErrCodes.ERROR_FILL_TRUNCATION] = types_1.ExchangeContractErrs.OrderFillRoundingError,
            _a[types_2.ExchangeContractErrCodes.ERROR_FILL_BALANCE_ALLOWANCE] = types_1.ExchangeContractErrs.FillBalanceAllowanceError,
            _a);
        _this._tokenWrapper = tokenWrapper;
        _this._orderValidationUtils = new order_validation_utils_1.OrderValidationUtils(_this);
        _this._contractAddressIfExists = contractAddressIfExists;
        _this._zrxContractAddressIfExists = zrxContractAddressIfExists;
        return _this;
        var _a;
    }
    /**
     * Returns the unavailable takerAmount of an order. Unavailable amount is defined as the total
     * amount that has been filled or cancelled. The remaining takerAmount can be calculated by
     * subtracting the unavailable amount from the total order takerAmount.
     * @param   orderHash               The hex encoded orderHash for which you would like to retrieve the
     *                                  unavailable takerAmount.
     * @param   methodOpts              Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has either been filled or cancelled.
     */
    ExchangeWrapper.prototype.getUnavailableTakerAmountAsync = function (orderHash, methodOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeContract, defaultBlock, txData, unavailableTakerTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('orderHash', orderHash, json_schemas_1.schemas.orderHashSchema);
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 1:
                        exchangeContract = _a.sent();
                        defaultBlock = _.isUndefined(methodOpts) ? undefined : methodOpts.defaultBlock;
                        txData = {};
                        return [4 /*yield*/, exchangeContract.getUnavailableTakerTokenAmount.callAsync(orderHash, txData, defaultBlock)];
                    case 2:
                        unavailableTakerTokenAmount = _a.sent();
                        // Wrap BigNumbers returned from web3 with our own (later) version of BigNumber
                        unavailableTakerTokenAmount = new utils_1.BigNumber(unavailableTakerTokenAmount);
                        return [2 /*return*/, unavailableTakerTokenAmount];
                }
            });
        });
    };
    /**
     * Retrieve the takerAmount of an order that has already been filled.
     * @param   orderHash    The hex encoded orderHash for which you would like to retrieve the filled takerAmount.
     * @param   methodOpts   Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has already been filled.
     */
    ExchangeWrapper.prototype.getFilledTakerAmountAsync = function (orderHash, methodOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeContract, defaultBlock, txData, fillAmountInBaseUnits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('orderHash', orderHash, json_schemas_1.schemas.orderHashSchema);
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 1:
                        exchangeContract = _a.sent();
                        defaultBlock = _.isUndefined(methodOpts) ? undefined : methodOpts.defaultBlock;
                        txData = {};
                        return [4 /*yield*/, exchangeContract.filled.callAsync(orderHash, txData, defaultBlock)];
                    case 2:
                        fillAmountInBaseUnits = _a.sent();
                        // Wrap BigNumbers returned from web3 with our own (later) version of BigNumber
                        fillAmountInBaseUnits = new utils_1.BigNumber(fillAmountInBaseUnits);
                        return [2 /*return*/, fillAmountInBaseUnits];
                }
            });
        });
    };
    /**
     * Retrieve the takerAmount of an order that has been cancelled.
     * @param   orderHash    The hex encoded orderHash for which you would like to retrieve the
     *                       cancelled takerAmount.
     * @param   methodOpts   Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has been cancelled.
     */
    ExchangeWrapper.prototype.getCancelledTakerAmountAsync = function (orderHash, methodOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeContract, defaultBlock, txData, cancelledAmountInBaseUnits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('orderHash', orderHash, json_schemas_1.schemas.orderHashSchema);
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 1:
                        exchangeContract = _a.sent();
                        defaultBlock = _.isUndefined(methodOpts) ? undefined : methodOpts.defaultBlock;
                        txData = {};
                        return [4 /*yield*/, exchangeContract.cancelled.callAsync(orderHash, txData, defaultBlock)];
                    case 2:
                        cancelledAmountInBaseUnits = _a.sent();
                        // Wrap BigNumbers returned from web3 with our own (later) version of BigNumber
                        cancelledAmountInBaseUnits = new utils_1.BigNumber(cancelledAmountInBaseUnits);
                        return [2 /*return*/, cancelledAmountInBaseUnits];
                }
            });
        });
    };
    /**
     * Fills a signed order with an amount denominated in baseUnits of the taker token.
     * Since the order in which transactions are included in the next block is indeterminate, race-conditions
     * could arise where a users balance or allowance changes before the fillOrder executes. Because of this,
     * we allow you to specify `shouldThrowOnInsufficientBalanceOrAllowance`.
     * If false, the smart contract will not throw if the parties
     * do not have sufficient balances/allowances, preserving gas costs. Setting it to true forgoes this check
     * and causes the smart contract to throw (using all the gas supplied) instead.
     * @param   signedOrder                                 An object that conforms to the SignedOrder interface.
     * @param   fillTakerTokenAmount                        The amount of the order (in taker tokens baseUnits) that
     *                                                      you wish to fill.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance Whether or not you wish for the contract call to throw
     *                                                      if upon execution the tokens cannot be transferred.
     * @param   takerAddress                                The user Ethereum address who would like to fill this order.
     *                                                      Must be available via the supplied Provider
     *                                                      passed to 0x.js.
     * @param   orderTransactionOpts                        Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    ExchangeWrapper.prototype.fillOrderAsync = function (signedOrder, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, orderTransactionOpts) {
        if (orderTransactionOpts === void 0) { orderTransactionOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTakerAddress, exchangeInstance, shouldValidate, zrxTokenAddress, exchangeTradeEmulator, _a, orderAddresses, orderValues, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('signedOrder', signedOrder, json_schemas_1.schemas.signedOrderSchema);
                        assert_1.assert.isValidBaseUnitAmount('fillTakerTokenAmount', fillTakerTokenAmount);
                        assert_1.assert.isBoolean('shouldThrowOnInsufficientBalanceOrAllowance', shouldThrowOnInsufficientBalanceOrAllowance);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('takerAddress', takerAddress, this._web3Wrapper)];
                    case 1:
                        _b.sent();
                        normalizedTakerAddress = takerAddress.toLowerCase();
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 2:
                        exchangeInstance = _b.sent();
                        shouldValidate = _.isUndefined(orderTransactionOpts.shouldValidate)
                            ? SHOULD_VALIDATE_BY_DEFAULT
                            : orderTransactionOpts.shouldValidate;
                        if (!shouldValidate) return [3 /*break*/, 4];
                        zrxTokenAddress = this.getZRXTokenAddress();
                        exchangeTradeEmulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(this._tokenWrapper, types_1.BlockParamLiteral.Latest);
                        return [4 /*yield*/, this._orderValidationUtils.validateFillOrderThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, normalizedTakerAddress, zrxTokenAddress)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _a = order_utils_1.formatters.getOrderAddressesAndValues(signedOrder), orderAddresses = _a[0], orderValues = _a[1];
                        return [4 /*yield*/, exchangeInstance.fillOrder.sendTransactionAsync(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, signedOrder.ecSignature.v, signedOrder.ecSignature.r, signedOrder.ecSignature.s, {
                                from: normalizedTakerAddress,
                                gas: orderTransactionOpts.gasLimit,
                                gasPrice: orderTransactionOpts.gasPrice,
                            })];
                    case 5:
                        txHash = _b.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Sequentially and atomically fills signedOrders up to the specified takerTokenFillAmount.
     * If the fill amount is reached - it succeeds and does not fill the rest of the orders.
     * If fill amount is not reached - it fills as much of the fill amount as possible and succeeds.
     * @param   signedOrders                                The array of signedOrders that you would like to fill until
     *                                                      takerTokenFillAmount is reached.
     * @param   fillTakerTokenAmount                        The total amount of the takerTokens you would like to fill.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance Whether or not you wish for the contract call to throw if
     *                                                      upon execution any of the tokens cannot be transferred.
     *                                                      If set to false, the call will continue to fill subsequent
     *                                                      signedOrders even when some cannot be filled.
     * @param   takerAddress                                The user Ethereum address who would like to fill these
     *                                                      orders. Must be available via the supplied Provider
     *                                                      passed to 0x.js.
     * @param   orderTransactionOpts                        Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    ExchangeWrapper.prototype.fillOrdersUpToAsync = function (signedOrders, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, orderTransactionOpts) {
        if (orderTransactionOpts === void 0) { orderTransactionOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var takerTokenAddresses, exchangeContractAddresses, normalizedTakerAddress, shouldValidate, filledTakerTokenAmount, zrxTokenAddress, exchangeTradeEmulator, _i, signedOrders_1, signedOrder, singleFilledTakerTokenAmount, orderAddressesValuesAndSignatureArray, _a, orderAddressesArray, orderValuesArray, vArray, rArray, sArray, exchangeInstance, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('signedOrders', signedOrders, json_schemas_1.schemas.signedOrdersSchema);
                        takerTokenAddresses = _.map(signedOrders, function (signedOrder) { return signedOrder.takerTokenAddress; });
                        assert_1.assert.hasAtMostOneUniqueValue(takerTokenAddresses, types_1.ExchangeContractErrs.MultipleTakerTokensInFillUpToDisallowed);
                        exchangeContractAddresses = _.map(signedOrders, function (signedOrder) { return signedOrder.exchangeContractAddress; });
                        assert_1.assert.hasAtMostOneUniqueValue(exchangeContractAddresses, types_1.ExchangeContractErrs.BatchOrdersMustHaveSameExchangeAddress);
                        assert_1.assert.isValidBaseUnitAmount('fillTakerTokenAmount', fillTakerTokenAmount);
                        assert_1.assert.isBoolean('shouldThrowOnInsufficientBalanceOrAllowance', shouldThrowOnInsufficientBalanceOrAllowance);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('takerAddress', takerAddress, this._web3Wrapper)];
                    case 1:
                        _b.sent();
                        normalizedTakerAddress = takerAddress.toLowerCase();
                        shouldValidate = _.isUndefined(orderTransactionOpts.shouldValidate)
                            ? SHOULD_VALIDATE_BY_DEFAULT
                            : orderTransactionOpts.shouldValidate;
                        if (!shouldValidate) return [3 /*break*/, 5];
                        filledTakerTokenAmount = new utils_1.BigNumber(0);
                        zrxTokenAddress = this.getZRXTokenAddress();
                        exchangeTradeEmulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(this._tokenWrapper, types_1.BlockParamLiteral.Latest);
                        _i = 0, signedOrders_1 = signedOrders;
                        _b.label = 2;
                    case 2:
                        if (!(_i < signedOrders_1.length)) return [3 /*break*/, 5];
                        signedOrder = signedOrders_1[_i];
                        return [4 /*yield*/, this._orderValidationUtils.validateFillOrderThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, fillTakerTokenAmount.minus(filledTakerTokenAmount), normalizedTakerAddress, zrxTokenAddress)];
                    case 3:
                        singleFilledTakerTokenAmount = _b.sent();
                        filledTakerTokenAmount = filledTakerTokenAmount.plus(singleFilledTakerTokenAmount);
                        if (filledTakerTokenAmount.eq(fillTakerTokenAmount)) {
                            return [3 /*break*/, 5];
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (_.isEmpty(signedOrders)) {
                            throw new Error(types_1.ExchangeContractErrs.BatchOrdersMustHaveAtLeastOneItem);
                        }
                        orderAddressesValuesAndSignatureArray = _.map(signedOrders, function (signedOrder) {
                            return order_utils_1.formatters.getOrderAddressesAndValues(signedOrder).concat([
                                signedOrder.ecSignature.v,
                                signedOrder.ecSignature.r,
                                signedOrder.ecSignature.s,
                            ]);
                        });
                        _a = _.unzip(orderAddressesValuesAndSignatureArray), orderAddressesArray = _a[0], orderValuesArray = _a[1], vArray = _a[2], rArray = _a[3], sArray = _a[4];
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 6:
                        exchangeInstance = _b.sent();
                        return [4 /*yield*/, exchangeInstance.fillOrdersUpTo.sendTransactionAsync(orderAddressesArray, orderValuesArray, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, vArray, rArray, sArray, {
                                from: normalizedTakerAddress,
                                gas: orderTransactionOpts.gasLimit,
                                gasPrice: orderTransactionOpts.gasPrice,
                            })];
                    case 7:
                        txHash = _b.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Batch version of fillOrderAsync.
     * Executes multiple fills atomically in a single transaction.
     * If shouldThrowOnInsufficientBalanceOrAllowance is set to false, it will continue filling subsequent orders even
     * when earlier ones fail.
     * When shouldThrowOnInsufficientBalanceOrAllowance is set to true, if any fill fails, the entire batch fails.
     * @param   orderFillRequests                               An array of objects that conform to the
     *                                                          OrderFillRequest interface.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance     Whether or not you wish for the contract call to throw
     *                                                          if upon execution any of the tokens cannot be
     *                                                          transferred. If set to false, the call will continue to
     *                                                          fill subsequent signedOrders even when some
     *                                                          cannot be filled.
     * @param   takerAddress                                    The user Ethereum address who would like to fill
     *                                                          these orders. Must be available via the supplied
     *                                                          Provider passed to 0x.js.
     * @param   orderTransactionOpts                            Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    ExchangeWrapper.prototype.batchFillOrdersAsync = function (orderFillRequests, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, orderTransactionOpts) {
        if (orderTransactionOpts === void 0) { orderTransactionOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var exchangeContractAddresses, normalizedTakerAddress, shouldValidate, zrxTokenAddress, exchangeTradeEmulator, _i, orderFillRequests_1, orderFillRequest, orderAddressesValuesAmountsAndSignatureArray, _a, orderAddressesArray, orderValuesArray, fillTakerTokenAmounts, vArray, rArray, sArray, exchangeInstance, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('orderFillRequests', orderFillRequests, json_schemas_1.schemas.orderFillRequestsSchema);
                        exchangeContractAddresses = _.map(orderFillRequests, function (orderFillRequest) { return orderFillRequest.signedOrder.exchangeContractAddress; });
                        assert_1.assert.hasAtMostOneUniqueValue(exchangeContractAddresses, types_1.ExchangeContractErrs.BatchOrdersMustHaveSameExchangeAddress);
                        assert_1.assert.isBoolean('shouldThrowOnInsufficientBalanceOrAllowance', shouldThrowOnInsufficientBalanceOrAllowance);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('takerAddress', takerAddress, this._web3Wrapper)];
                    case 1:
                        _b.sent();
                        normalizedTakerAddress = takerAddress.toLowerCase();
                        shouldValidate = _.isUndefined(orderTransactionOpts.shouldValidate)
                            ? SHOULD_VALIDATE_BY_DEFAULT
                            : orderTransactionOpts.shouldValidate;
                        if (!shouldValidate) return [3 /*break*/, 5];
                        zrxTokenAddress = this.getZRXTokenAddress();
                        exchangeTradeEmulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(this._tokenWrapper, types_1.BlockParamLiteral.Latest);
                        _i = 0, orderFillRequests_1 = orderFillRequests;
                        _b.label = 2;
                    case 2:
                        if (!(_i < orderFillRequests_1.length)) return [3 /*break*/, 5];
                        orderFillRequest = orderFillRequests_1[_i];
                        return [4 /*yield*/, this._orderValidationUtils.validateFillOrderThrowIfInvalidAsync(exchangeTradeEmulator, orderFillRequest.signedOrder, orderFillRequest.takerTokenFillAmount, normalizedTakerAddress, zrxTokenAddress)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (_.isEmpty(orderFillRequests)) {
                            throw new Error(types_1.ExchangeContractErrs.BatchOrdersMustHaveAtLeastOneItem);
                        }
                        orderAddressesValuesAmountsAndSignatureArray = _.map(orderFillRequests, function (orderFillRequest) {
                            return order_utils_1.formatters.getOrderAddressesAndValues(orderFillRequest.signedOrder).concat([
                                orderFillRequest.takerTokenFillAmount,
                                orderFillRequest.signedOrder.ecSignature.v,
                                orderFillRequest.signedOrder.ecSignature.r,
                                orderFillRequest.signedOrder.ecSignature.s,
                            ]);
                        });
                        _a = _.unzip(orderAddressesValuesAmountsAndSignatureArray), orderAddressesArray = _a[0], orderValuesArray = _a[1], fillTakerTokenAmounts = _a[2], vArray = _a[3], rArray = _a[4], sArray = _a[5];
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 6:
                        exchangeInstance = _b.sent();
                        return [4 /*yield*/, exchangeInstance.batchFillOrders.sendTransactionAsync(orderAddressesArray, orderValuesArray, fillTakerTokenAmounts, shouldThrowOnInsufficientBalanceOrAllowance, vArray, rArray, sArray, {
                                from: normalizedTakerAddress,
                                gas: orderTransactionOpts.gasLimit,
                                gasPrice: orderTransactionOpts.gasPrice,
                            })];
                    case 7:
                        txHash = _b.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Attempts to fill a specific amount of an order. If the entire amount specified cannot be filled,
     * the fill order is abandoned.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Provider passed to 0x.js.
     * @param   orderTransactionOpts    Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    ExchangeWrapper.prototype.fillOrKillOrderAsync = function (signedOrder, fillTakerTokenAmount, takerAddress, orderTransactionOpts) {
        if (orderTransactionOpts === void 0) { orderTransactionOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTakerAddress, exchangeInstance, shouldValidate, zrxTokenAddress, exchangeTradeEmulator, _a, orderAddresses, orderValues, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('signedOrder', signedOrder, json_schemas_1.schemas.signedOrderSchema);
                        assert_1.assert.isValidBaseUnitAmount('fillTakerTokenAmount', fillTakerTokenAmount);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('takerAddress', takerAddress, this._web3Wrapper)];
                    case 1:
                        _b.sent();
                        normalizedTakerAddress = takerAddress.toLowerCase();
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 2:
                        exchangeInstance = _b.sent();
                        shouldValidate = _.isUndefined(orderTransactionOpts.shouldValidate)
                            ? SHOULD_VALIDATE_BY_DEFAULT
                            : orderTransactionOpts.shouldValidate;
                        if (!shouldValidate) return [3 /*break*/, 4];
                        zrxTokenAddress = this.getZRXTokenAddress();
                        exchangeTradeEmulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(this._tokenWrapper, types_1.BlockParamLiteral.Latest);
                        return [4 /*yield*/, this._orderValidationUtils.validateFillOrKillOrderThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, normalizedTakerAddress, zrxTokenAddress)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _a = order_utils_1.formatters.getOrderAddressesAndValues(signedOrder), orderAddresses = _a[0], orderValues = _a[1];
                        return [4 /*yield*/, exchangeInstance.fillOrKillOrder.sendTransactionAsync(orderAddresses, orderValues, fillTakerTokenAmount, signedOrder.ecSignature.v, signedOrder.ecSignature.r, signedOrder.ecSignature.s, {
                                from: normalizedTakerAddress,
                                gas: orderTransactionOpts.gasLimit,
                                gasPrice: orderTransactionOpts.gasPrice,
                            })];
                    case 5:
                        txHash = _b.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Batch version of fillOrKill. Allows a taker to specify a batch of orders that will either be atomically
     * filled (each to the specified fillAmount) or aborted.
     * @param   orderFillRequests           An array of objects that conform to the OrderFillRequest interface.
     * @param   takerAddress                The user Ethereum address who would like to fill there orders.
     *                                      Must be available via the supplied Provider passed to 0x.js.
     * @param   orderTransactionOpts        Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    ExchangeWrapper.prototype.batchFillOrKillAsync = function (orderFillRequests, takerAddress, orderTransactionOpts) {
        if (orderTransactionOpts === void 0) { orderTransactionOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var exchangeContractAddresses, normalizedTakerAddress, exchangeInstance, shouldValidate, zrxTokenAddress, exchangeTradeEmulator, _i, orderFillRequests_2, orderFillRequest, orderAddressesValuesAndTakerTokenFillAmounts, _a, orderAddresses, orderValues, fillTakerTokenAmounts, vParams, rParams, sParams, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('orderFillRequests', orderFillRequests, json_schemas_1.schemas.orderFillRequestsSchema);
                        exchangeContractAddresses = _.map(orderFillRequests, function (orderFillRequest) { return orderFillRequest.signedOrder.exchangeContractAddress; });
                        assert_1.assert.hasAtMostOneUniqueValue(exchangeContractAddresses, types_1.ExchangeContractErrs.BatchOrdersMustHaveSameExchangeAddress);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('takerAddress', takerAddress, this._web3Wrapper)];
                    case 1:
                        _b.sent();
                        normalizedTakerAddress = takerAddress.toLowerCase();
                        if (_.isEmpty(orderFillRequests)) {
                            throw new Error(types_1.ExchangeContractErrs.BatchOrdersMustHaveAtLeastOneItem);
                        }
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 2:
                        exchangeInstance = _b.sent();
                        shouldValidate = _.isUndefined(orderTransactionOpts.shouldValidate)
                            ? SHOULD_VALIDATE_BY_DEFAULT
                            : orderTransactionOpts.shouldValidate;
                        if (!shouldValidate) return [3 /*break*/, 6];
                        zrxTokenAddress = this.getZRXTokenAddress();
                        exchangeTradeEmulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(this._tokenWrapper, types_1.BlockParamLiteral.Latest);
                        _i = 0, orderFillRequests_2 = orderFillRequests;
                        _b.label = 3;
                    case 3:
                        if (!(_i < orderFillRequests_2.length)) return [3 /*break*/, 6];
                        orderFillRequest = orderFillRequests_2[_i];
                        return [4 /*yield*/, this._orderValidationUtils.validateFillOrKillOrderThrowIfInvalidAsync(exchangeTradeEmulator, orderFillRequest.signedOrder, orderFillRequest.takerTokenFillAmount, normalizedTakerAddress, zrxTokenAddress)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        orderAddressesValuesAndTakerTokenFillAmounts = _.map(orderFillRequests, function (request) {
                            return order_utils_1.formatters.getOrderAddressesAndValues(request.signedOrder).concat([
                                request.takerTokenFillAmount,
                                request.signedOrder.ecSignature.v,
                                request.signedOrder.ecSignature.r,
                                request.signedOrder.ecSignature.s,
                            ]);
                        });
                        _a = _.unzip(orderAddressesValuesAndTakerTokenFillAmounts), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmounts = _a[2], vParams = _a[3], rParams = _a[4], sParams = _a[5];
                        return [4 /*yield*/, exchangeInstance.batchFillOrKillOrders.sendTransactionAsync(orderAddresses, orderValues, fillTakerTokenAmounts, vParams, rParams, sParams, {
                                from: normalizedTakerAddress,
                                gas: orderTransactionOpts.gasLimit,
                                gasPrice: orderTransactionOpts.gasPrice,
                            })];
                    case 7:
                        txHash = _b.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Cancel a given fill amount of an order. Cancellations are cumulative.
     * @param   order                   An object that conforms to the Order or SignedOrder interface.
     *                                  The order you would like to cancel.
     * @param   cancelTakerTokenAmount  The amount (specified in taker tokens) that you would like to cancel.
     * @param   transactionOpts         Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    ExchangeWrapper.prototype.cancelOrderAsync = function (order, cancelTakerTokenAmount, orderTransactionOpts) {
        if (orderTransactionOpts === void 0) { orderTransactionOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedMakerAddress, exchangeInstance, shouldValidate, orderHash, unavailableTakerTokenAmount, _a, orderAddresses, orderValues, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema);
                        assert_1.assert.isValidBaseUnitAmount('takerTokenCancelAmount', cancelTakerTokenAmount);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('order.maker', order.maker, this._web3Wrapper)];
                    case 1:
                        _b.sent();
                        normalizedMakerAddress = order.maker.toLowerCase();
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 2:
                        exchangeInstance = _b.sent();
                        shouldValidate = _.isUndefined(orderTransactionOpts.shouldValidate)
                            ? SHOULD_VALIDATE_BY_DEFAULT
                            : orderTransactionOpts.shouldValidate;
                        if (!shouldValidate) return [3 /*break*/, 4];
                        orderHash = order_utils_1.getOrderHashHex(order);
                        return [4 /*yield*/, this.getUnavailableTakerAmountAsync(orderHash)];
                    case 3:
                        unavailableTakerTokenAmount = _b.sent();
                        order_validation_utils_1.OrderValidationUtils.validateCancelOrderThrowIfInvalid(order, cancelTakerTokenAmount, unavailableTakerTokenAmount);
                        _b.label = 4;
                    case 4:
                        _a = order_utils_1.formatters.getOrderAddressesAndValues(order), orderAddresses = _a[0], orderValues = _a[1];
                        return [4 /*yield*/, exchangeInstance.cancelOrder.sendTransactionAsync(orderAddresses, orderValues, cancelTakerTokenAmount, {
                                from: normalizedMakerAddress,
                                gas: orderTransactionOpts.gasLimit,
                                gasPrice: orderTransactionOpts.gasPrice,
                            })];
                    case 5:
                        txHash = _b.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Batch version of cancelOrderAsync. Atomically cancels multiple orders in a single transaction.
     * All orders must be from the same maker.
     * @param   orderCancellationRequests   An array of objects that conform to the OrderCancellationRequest
     *                                      interface.
     * @param   transactionOpts             Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    ExchangeWrapper.prototype.batchCancelOrdersAsync = function (orderCancellationRequests, orderTransactionOpts) {
        if (orderTransactionOpts === void 0) { orderTransactionOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var exchangeContractAddresses, makers, maker, normalizedMakerAddress, shouldValidate, _i, orderCancellationRequests_1, orderCancellationRequest, orderHash, unavailableTakerTokenAmount, exchangeInstance, orderAddressesValuesAndTakerTokenCancelAmounts, _a, orderAddresses, orderValues, cancelTakerTokenAmounts, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('orderCancellationRequests', orderCancellationRequests, json_schemas_1.schemas.orderCancellationRequestsSchema);
                        exchangeContractAddresses = _.map(orderCancellationRequests, function (orderCancellationRequest) { return orderCancellationRequest.order.exchangeContractAddress; });
                        assert_1.assert.hasAtMostOneUniqueValue(exchangeContractAddresses, types_1.ExchangeContractErrs.BatchOrdersMustHaveSameExchangeAddress);
                        makers = _.map(orderCancellationRequests, function (cancellationRequest) { return cancellationRequest.order.maker; });
                        assert_1.assert.hasAtMostOneUniqueValue(makers, types_1.ExchangeContractErrs.MultipleMakersInSingleCancelBatchDisallowed);
                        maker = makers[0];
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('maker', maker, this._web3Wrapper)];
                    case 1:
                        _b.sent();
                        normalizedMakerAddress = maker.toLowerCase();
                        shouldValidate = _.isUndefined(orderTransactionOpts.shouldValidate)
                            ? SHOULD_VALIDATE_BY_DEFAULT
                            : orderTransactionOpts.shouldValidate;
                        if (!shouldValidate) return [3 /*break*/, 5];
                        _i = 0, orderCancellationRequests_1 = orderCancellationRequests;
                        _b.label = 2;
                    case 2:
                        if (!(_i < orderCancellationRequests_1.length)) return [3 /*break*/, 5];
                        orderCancellationRequest = orderCancellationRequests_1[_i];
                        orderHash = order_utils_1.getOrderHashHex(orderCancellationRequest.order);
                        return [4 /*yield*/, this.getUnavailableTakerAmountAsync(orderHash)];
                    case 3:
                        unavailableTakerTokenAmount = _b.sent();
                        order_validation_utils_1.OrderValidationUtils.validateCancelOrderThrowIfInvalid(orderCancellationRequest.order, orderCancellationRequest.takerTokenCancelAmount, unavailableTakerTokenAmount);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (_.isEmpty(orderCancellationRequests)) {
                            throw new Error(types_1.ExchangeContractErrs.BatchOrdersMustHaveAtLeastOneItem);
                        }
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 6:
                        exchangeInstance = _b.sent();
                        orderAddressesValuesAndTakerTokenCancelAmounts = _.map(orderCancellationRequests, function (cancellationRequest) {
                            return order_utils_1.formatters.getOrderAddressesAndValues(cancellationRequest.order).concat([
                                cancellationRequest.takerTokenCancelAmount,
                            ]);
                        });
                        _a = _.unzip(orderAddressesValuesAndTakerTokenCancelAmounts), orderAddresses = _a[0], orderValues = _a[1], cancelTakerTokenAmounts = _a[2];
                        return [4 /*yield*/, exchangeInstance.batchCancelOrders.sendTransactionAsync(orderAddresses, orderValues, cancelTakerTokenAmounts, {
                                from: normalizedMakerAddress,
                                gas: orderTransactionOpts.gasLimit,
                                gasPrice: orderTransactionOpts.gasPrice,
                            })];
                    case 7:
                        txHash = _b.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Subscribe to an event type emitted by the Exchange contract.
     * @param   eventName           The exchange contract event you would like to subscribe to.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param   callback            Callback that gets called when a log is added/removed
     * @return Subscription token used later to unsubscribe
     */
    ExchangeWrapper.prototype.subscribe = function (eventName, indexFilterValues, callback) {
        assert_1.assert.doesBelongToStringEnum('eventName', eventName, exchange_1.ExchangeEvents);
        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
        assert_1.assert.isFunction('callback', callback);
        var exchangeContractAddress = this.getContractAddress();
        var subscriptionToken = this._subscribe(exchangeContractAddress, eventName, indexFilterValues, artifacts_1.artifacts.Exchange.abi, callback);
        return subscriptionToken;
    };
    /**
     * Cancel a subscription
     * @param   subscriptionToken Subscription token returned by `subscribe()`
     */
    ExchangeWrapper.prototype.unsubscribe = function (subscriptionToken) {
        this._unsubscribe(subscriptionToken);
    };
    /**
     * Cancels all existing subscriptions
     */
    ExchangeWrapper.prototype.unsubscribeAll = function () {
        _super.prototype._unsubscribeAll.call(this);
    };
    /**
     * Gets historical logs without creating a subscription
     * @param   eventName           The exchange contract event you would like to subscribe to.
     * @param   blockRange          Block range to get logs from.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return  Array of logs that match the parameters
     */
    ExchangeWrapper.prototype.getLogsAsync = function (eventName, blockRange, indexFilterValues) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeContractAddress, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesBelongToStringEnum('eventName', eventName, exchange_1.ExchangeEvents);
                        assert_1.assert.doesConformToSchema('blockRange', blockRange, json_schemas_1.schemas.blockRangeSchema);
                        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
                        exchangeContractAddress = this.getContractAddress();
                        return [4 /*yield*/, this._getLogsAsync(exchangeContractAddress, eventName, blockRange, indexFilterValues, artifacts_1.artifacts.Exchange.abi)];
                    case 1:
                        logs = _a.sent();
                        return [2 /*return*/, logs];
                }
            });
        });
    };
    /**
     * Retrieves the Ethereum address of the Exchange contract deployed on the network
     * that the user-passed web3 provider is connected to.
     * @returns The Ethereum address of the Exchange contract being used.
     */
    ExchangeWrapper.prototype.getContractAddress = function () {
        var contractAddress = this._getContractAddress(artifacts_1.artifacts.Exchange, this._contractAddressIfExists);
        return contractAddress;
    };
    /**
     * Checks if order is still fillable and throws an error otherwise. Useful for orderbook
     * pruning where you want to remove stale orders without knowing who the taker will be.
     * @param   signedOrder     An object that conforms to the SignedOrder interface. The
     *                          signedOrder you wish to validate.
     * @param   opts            An object that conforms to the ValidateOrderFillableOpts
     *                          interface. Allows specifying a specific fillTakerTokenAmount
     *                          to validate for.
     */
    ExchangeWrapper.prototype.validateOrderFillableOrThrowAsync = function (signedOrder, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var zrxTokenAddress, expectedFillTakerTokenAmount, exchangeTradeEmulator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('signedOrder', signedOrder, json_schemas_1.schemas.signedOrderSchema);
                        zrxTokenAddress = this.getZRXTokenAddress();
                        expectedFillTakerTokenAmount = !_.isUndefined(opts) ? opts.expectedFillTakerTokenAmount : undefined;
                        exchangeTradeEmulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(this._tokenWrapper, types_1.BlockParamLiteral.Latest);
                        return [4 /*yield*/, this._orderValidationUtils.validateOrderFillableOrThrowAsync(exchangeTradeEmulator, signedOrder, zrxTokenAddress, expectedFillTakerTokenAmount)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if order fill will succeed and throws an error otherwise.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Provider passed to 0x.js.
     */
    ExchangeWrapper.prototype.validateFillOrderThrowIfInvalidAsync = function (signedOrder, fillTakerTokenAmount, takerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTakerAddress, zrxTokenAddress, exchangeTradeEmulator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('signedOrder', signedOrder, json_schemas_1.schemas.signedOrderSchema);
                        assert_1.assert.isValidBaseUnitAmount('fillTakerTokenAmount', fillTakerTokenAmount);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('takerAddress', takerAddress, this._web3Wrapper)];
                    case 1:
                        _a.sent();
                        normalizedTakerAddress = takerAddress.toLowerCase();
                        zrxTokenAddress = this.getZRXTokenAddress();
                        exchangeTradeEmulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(this._tokenWrapper, types_1.BlockParamLiteral.Latest);
                        return [4 /*yield*/, this._orderValidationUtils.validateFillOrderThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, normalizedTakerAddress, zrxTokenAddress)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if cancelling a given order will succeed and throws an informative error if it won't.
     * @param   order                   An object that conforms to the Order or SignedOrder interface.
     *                                  The order you would like to cancel.
     * @param   cancelTakerTokenAmount  The amount (specified in taker tokens) that you would like to cancel.
     */
    ExchangeWrapper.prototype.validateCancelOrderThrowIfInvalidAsync = function (order, cancelTakerTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var orderHash, unavailableTakerTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema);
                        assert_1.assert.isValidBaseUnitAmount('cancelTakerTokenAmount', cancelTakerTokenAmount);
                        orderHash = order_utils_1.getOrderHashHex(order);
                        return [4 /*yield*/, this.getUnavailableTakerAmountAsync(orderHash)];
                    case 1:
                        unavailableTakerTokenAmount = _a.sent();
                        order_validation_utils_1.OrderValidationUtils.validateCancelOrderThrowIfInvalid(order, cancelTakerTokenAmount, unavailableTakerTokenAmount);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if calling fillOrKill on a given order will succeed and throws an informative error if it won't.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Provider passed to 0x.js.
     */
    ExchangeWrapper.prototype.validateFillOrKillOrderThrowIfInvalidAsync = function (signedOrder, fillTakerTokenAmount, takerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTakerAddress, zrxTokenAddress, exchangeTradeEmulator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('signedOrder', signedOrder, json_schemas_1.schemas.signedOrderSchema);
                        assert_1.assert.isValidBaseUnitAmount('fillTakerTokenAmount', fillTakerTokenAmount);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('takerAddress', takerAddress, this._web3Wrapper)];
                    case 1:
                        _a.sent();
                        normalizedTakerAddress = takerAddress.toLowerCase();
                        zrxTokenAddress = this.getZRXTokenAddress();
                        exchangeTradeEmulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(this._tokenWrapper, types_1.BlockParamLiteral.Latest);
                        return [4 /*yield*/, this._orderValidationUtils.validateFillOrKillOrderThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, fillTakerTokenAmount, normalizedTakerAddress, zrxTokenAddress)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if rounding error will be > 0.1% when computing makerTokenAmount by doing:
     * `(fillTakerTokenAmount * makerTokenAmount) / takerTokenAmount`.
     * 0x Protocol does not accept any trades that result in large rounding errors. This means that tokens with few or
     * no decimals can only be filled in quantities and ratios that avoid large rounding errors.
     * @param   fillTakerTokenAmount   The amount of the order (in taker tokens baseUnits) that you wish to fill.
     * @param   takerTokenAmount       The order size on the taker side
     * @param   makerTokenAmount       The order size on the maker side
     */
    ExchangeWrapper.prototype.isRoundingErrorAsync = function (fillTakerTokenAmount, takerTokenAmount, makerTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeInstance, isRoundingError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isValidBaseUnitAmount('fillTakerTokenAmount', fillTakerTokenAmount);
                        assert_1.assert.isValidBaseUnitAmount('takerTokenAmount', takerTokenAmount);
                        assert_1.assert.isValidBaseUnitAmount('makerTokenAmount', makerTokenAmount);
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 1:
                        exchangeInstance = _a.sent();
                        return [4 /*yield*/, exchangeInstance.isRoundingError.callAsync(fillTakerTokenAmount, takerTokenAmount, makerTokenAmount)];
                    case 2:
                        isRoundingError = _a.sent();
                        return [2 /*return*/, isRoundingError];
                }
            });
        });
    };
    /**
     * Checks if logs contain LogError, which is emitted by Exchange contract on transaction failure.
     * @param   logs   Transaction logs as returned by `zeroEx.awaitTransactionMinedAsync`
     */
    ExchangeWrapper.prototype.throwLogErrorsAsErrors = function (logs) {
        var errLog = _.find(logs, {
            event: exchange_1.ExchangeEvents.LogError,
        });
        if (!_.isUndefined(errLog)) {
            var logArgs = errLog.args;
            var errCode = logArgs.errorId;
            var errMessage = this._exchangeContractErrCodesToMsg[errCode];
            throw new Error(errMessage);
        }
    };
    /**
     * Gets the latest OrderState of a signedOrder
     * @param   signedOrder   The signedOrder
     * @param   stateLayer    Optional, desired blockchain state layer (defaults to latest).
     * @return  OrderState of the signedOrder
     */
    ExchangeWrapper.prototype.getOrderStateAsync = function (signedOrder, stateLayer) {
        if (stateLayer === void 0) { stateLayer = types_1.BlockParamLiteral.Latest; }
        return __awaiter(this, void 0, void 0, function () {
            var simpleBalanceAndProxyAllowanceFetcher, simpleOrderFilledCancelledFetcher, orderStateUtils, orderState;
            return __generator(this, function (_a) {
                simpleBalanceAndProxyAllowanceFetcher = new simple_balance_and_proxy_allowance_fetcher_1.SimpleBalanceAndProxyAllowanceFetcher(this._tokenWrapper, stateLayer);
                simpleOrderFilledCancelledFetcher = new simple_order_filled_cancelled_fetcher_1.SimpleOrderFilledCancelledFetcher(this, stateLayer);
                orderStateUtils = new order_utils_1.OrderStateUtils(simpleBalanceAndProxyAllowanceFetcher, simpleOrderFilledCancelledFetcher);
                orderState = orderStateUtils.getOrderStateAsync(signedOrder);
                return [2 /*return*/, orderState];
            });
        });
    };
    /**
     * Returns the ZRX token address used by the exchange contract.
     * @return Address of ZRX token
     */
    ExchangeWrapper.prototype.getZRXTokenAddress = function () {
        var contractAddress = this._getContractAddress(artifacts_1.artifacts.ZRX, this._zrxContractAddressIfExists);
        return contractAddress;
    };
    ExchangeWrapper.prototype._invalidateContractInstances = function () {
        this.unsubscribeAll();
        delete this._exchangeContractIfExists;
    };
    ExchangeWrapper.prototype._isValidSignatureUsingContractCallAsync = function (dataHex, ecSignature, signerAddressHex) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedSignerAddress, exchangeInstance, isValidSignature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isHexString('dataHex', dataHex);
                        assert_1.assert.doesConformToSchema('ecSignature', ecSignature, json_schemas_1.schemas.ecSignatureSchema);
                        assert_1.assert.isETHAddressHex('signerAddressHex', signerAddressHex);
                        normalizedSignerAddress = signerAddressHex.toLowerCase();
                        return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 1:
                        exchangeInstance = _a.sent();
                        return [4 /*yield*/, exchangeInstance.isValidSignature.callAsync(normalizedSignerAddress, dataHex, ecSignature.v, ecSignature.r, ecSignature.s)];
                    case 2:
                        isValidSignature = _a.sent();
                        return [2 /*return*/, isValidSignature];
                }
            });
        });
    };
    ExchangeWrapper.prototype._getOrderHashHexUsingContractCallAsync = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeInstance, _a, orderAddresses, orderValues, orderHashHex;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._getExchangeContractAsync()];
                    case 1:
                        exchangeInstance = _b.sent();
                        _a = order_utils_1.formatters.getOrderAddressesAndValues(order), orderAddresses = _a[0], orderValues = _a[1];
                        return [4 /*yield*/, exchangeInstance.getOrderHash.callAsync(orderAddresses, orderValues)];
                    case 2:
                        orderHashHex = _b.sent();
                        return [2 /*return*/, orderHashHex];
                }
            });
        });
    };
    ExchangeWrapper.prototype._getExchangeContractAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, abi, address, contractInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!_.isUndefined(this._exchangeContractIfExists)) {
                            return [2 /*return*/, this._exchangeContractIfExists];
                        }
                        return [4 /*yield*/, this._getContractAbiAndAddressFromArtifactsAsync(artifacts_1.artifacts.Exchange, this._contractAddressIfExists)];
                    case 1:
                        _a = _b.sent(), abi = _a[0], address = _a[1];
                        contractInstance = new exchange_1.ExchangeContract(abi, address, this._web3Wrapper.getProvider(), this._web3Wrapper.getContractDefaults());
                        this._exchangeContractIfExists = contractInstance;
                        return [2 /*return*/, this._exchangeContractIfExists];
                }
            });
        });
    };
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], ExchangeWrapper.prototype, "fillOrderAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], ExchangeWrapper.prototype, "fillOrdersUpToAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], ExchangeWrapper.prototype, "batchFillOrdersAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], ExchangeWrapper.prototype, "fillOrKillOrderAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], ExchangeWrapper.prototype, "batchFillOrKillAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], ExchangeWrapper.prototype, "cancelOrderAsync", null);
    __decorate([
        decorators_1.decorators.asyncZeroExErrorHandler
    ], ExchangeWrapper.prototype, "batchCancelOrdersAsync", null);
    return ExchangeWrapper;
}(contract_wrapper_1.ContractWrapper)); // tslint:disable:max-file-line-count
exports.ExchangeWrapper = ExchangeWrapper;
//# sourceMappingURL=exchange_wrapper.js.map