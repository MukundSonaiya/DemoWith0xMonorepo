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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var dev_utils_1 = require("@0xproject/dev-utils");
var fill_scenarios_1 = require("@0xproject/fill-scenarios");
var order_utils_1 = require("@0xproject/order-utils");
var types_1 = require("@0xproject/types");
var utils_1 = require("@0xproject/utils");
var chai = require("chai");
require("make-promises-safe");
var Sinon = require("sinon");
var src_1 = require("../src");
var types_2 = require("../src/types");
var exchange_transfer_simulator_1 = require("../src/utils/exchange_transfer_simulator");
var order_validation_utils_1 = require("../src/utils/order_validation_utils");
var chai_setup_1 = require("./utils/chai_setup");
var constants_1 = require("./utils/constants");
var token_utils_1 = require("./utils/token_utils");
var web3_wrapper_1 = require("./utils/web3_wrapper");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(web3_wrapper_1.web3Wrapper);
describe('OrderValidation', function () {
    var contractWrappers;
    var userAddresses;
    var tokens;
    var tokenUtils;
    var exchangeContractAddress;
    var zrxTokenAddress;
    var fillScenarios;
    var makerTokenAddress;
    var takerTokenAddress;
    var coinbase;
    var makerAddress;
    var takerAddress;
    var feeRecipient;
    var fillableAmount = new utils_1.BigNumber(5);
    var fillTakerAmount = new utils_1.BigNumber(5);
    var config = {
        networkId: constants_1.constants.TESTRPC_NETWORK_ID,
    };
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, makerToken, takerToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contractWrappers = new src_1.ContractWrappers(web3_wrapper_1.provider, config);
                    exchangeContractAddress = contractWrappers.exchange.getContractAddress();
                    return [4 /*yield*/, web3_wrapper_1.web3Wrapper.getAvailableAddressesAsync()];
                case 1:
                    userAddresses = _b.sent();
                    coinbase = userAddresses[0], makerAddress = userAddresses[1], takerAddress = userAddresses[2], feeRecipient = userAddresses[3];
                    return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                case 2:
                    tokens = _b.sent();
                    tokenUtils = new token_utils_1.TokenUtils(tokens);
                    zrxTokenAddress = tokenUtils.getProtocolTokenOrThrow().address;
                    fillScenarios = new fill_scenarios_1.FillScenarios(web3_wrapper_1.provider, userAddresses, tokens, zrxTokenAddress, exchangeContractAddress);
                    _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
                    makerTokenAddress = makerToken.address;
                    takerTokenAddress = takerToken.address;
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blockchainLifecycle.startAsync()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blockchainLifecycle.revertAsync()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('validateOrderFillableOrThrowAsync', function () {
        it('should succeed if the order is fillable', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should succeed if the maker is buying ZRX and has no ZRX balance', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerFee, takerFee, signedOrder, zrxMakerBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makerFee = new utils_1.BigNumber(2);
                        takerFee = new utils_1.BigNumber(2);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderWithFeesAsync(makerTokenAddress, zrxTokenAddress, makerFee, takerFee, makerAddress, takerAddress, fillableAmount, feeRecipient)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(zrxTokenAddress, makerAddress)];
                    case 2:
                        zrxMakerBalance = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.transferAsync(zrxTokenAddress, makerAddress, takerAddress, zrxMakerBalance)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should succeed if the maker is buying ZRX and has no ZRX balance and there is no specified taker', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerFee, takerFee, signedOrder, zrxMakerBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makerFee = new utils_1.BigNumber(2);
                        takerFee = new utils_1.BigNumber(2);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderWithFeesAsync(makerTokenAddress, zrxTokenAddress, makerFee, takerFee, makerAddress, constants_1.constants.NULL_ADDRESS, fillableAmount, feeRecipient)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(zrxTokenAddress, makerAddress)];
                    case 2:
                        zrxMakerBalance = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.transferAsync(zrxTokenAddress, makerAddress, takerAddress, zrxMakerBalance)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should succeed if the order is asymmetric and fillable', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerFillableAmount, takerFillableAmount, signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makerFillableAmount = fillableAmount;
                        takerFillableAmount = fillableAmount.minus(4);
                        return [4 /*yield*/, fillScenarios.createAsymmetricFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, makerFillableAmount, takerFillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw when the order is fully filled or cancelled', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.cancelOrderAsync(signedOrder, fillableAmount)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, expect(contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderRemainingFillAmountZero)];
                }
            });
        }); });
        it('should throw when order is expired', function () { return __awaiter(_this, void 0, void 0, function () {
            var expirationInPast, signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expirationInPast = new utils_1.BigNumber(1496826058);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount, expirationInPast)];
                    case 1:
                        signedOrder = _a.sent();
                        return [2 /*return*/, expect(contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillExpired)];
                }
            });
        }); });
    });
    describe('validateFillOrderAndThrowIfInvalidAsync', function () {
        it('should throw when the fill amount is zero', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder, zeroFillAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        zeroFillAmount = new utils_1.BigNumber(0);
                        return [2 /*return*/, expect(contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(signedOrder, zeroFillAmount, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                }
            });
        }); });
        it('should throw when the signature is invalid', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        // 27 <--> 28
                        // tslint:disable-next-line:custom-no-magic-numbers
                        signedOrder.ecSignature.v = 28 - signedOrder.ecSignature.v + 27;
                        return [2 /*return*/, expect(contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(signedOrder, fillableAmount, takerAddress)).to.be.rejectedWith(order_utils_1.OrderError.InvalidSignature)];
                }
            });
        }); });
        it('should throw when the order is fully filled or cancelled', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.cancelOrderAsync(signedOrder, fillableAmount)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, expect(contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(signedOrder, fillableAmount, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderRemainingFillAmountZero)];
                }
            });
        }); });
        it('should throw when sender is not a taker', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder, nonTakerAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        nonTakerAddress = userAddresses[6];
                        return [2 /*return*/, expect(contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(signedOrder, fillTakerAmount, nonTakerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.TransactionSenderIsNotFillOrderTaker)];
                }
            });
        }); });
        it('should throw when order is expired', function () { return __awaiter(_this, void 0, void 0, function () {
            var expirationInPast, signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expirationInPast = new utils_1.BigNumber(1496826058);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount, expirationInPast)];
                    case 1:
                        signedOrder = _a.sent();
                        return [2 /*return*/, expect(contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(signedOrder, fillTakerAmount, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillExpired)];
                }
            });
        }); });
        it('should throw when there a rounding error would have occurred', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerAmount, takerAmount, signedOrder, fillTakerAmountThatCausesRoundingError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makerAmount = new utils_1.BigNumber(3);
                        takerAmount = new utils_1.BigNumber(5);
                        return [4 /*yield*/, fillScenarios.createAsymmetricFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, makerAmount, takerAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        fillTakerAmountThatCausesRoundingError = new utils_1.BigNumber(3);
                        return [2 /*return*/, expect(contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(signedOrder, fillTakerAmountThatCausesRoundingError, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillRoundingError)];
                }
            });
        }); });
    });
    describe('#validateFillOrKillOrderAndThrowIfInvalidAsync', function () {
        it('should throw if remaining fillAmount is less then the desired fillAmount', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder, tooLargeFillAmount, fillAmountDifference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        tooLargeFillAmount = new utils_1.BigNumber(7);
                        fillAmountDifference = tooLargeFillAmount.minus(fillableAmount);
                        return [4 /*yield*/, contractWrappers.token.transferAsync(takerTokenAddress, coinbase, takerAddress, fillAmountDifference)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.setProxyAllowanceAsync(takerTokenAddress, takerAddress, tooLargeFillAmount)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.transferAsync(makerTokenAddress, coinbase, makerAddress, fillAmountDifference)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.setProxyAllowanceAsync(makerTokenAddress, makerAddress, tooLargeFillAmount)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, expect(contractWrappers.exchange.validateFillOrKillOrderThrowIfInvalidAsync(signedOrder, tooLargeFillAmount, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.InsufficientRemainingFillAmount)];
                }
            });
        }); });
    });
    describe('validateCancelOrderAndThrowIfInvalidAsync', function () {
        var signedOrder;
        var cancelAmount = new utils_1.BigNumber(3);
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, makerToken, takerToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        coinbase = userAddresses[0], makerAddress = userAddresses[1], takerAddress = userAddresses[2];
                        _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
                        makerTokenAddress = makerToken.address;
                        takerTokenAddress = takerToken.address;
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw when cancel amount is zero', function () { return __awaiter(_this, void 0, void 0, function () {
            var zeroCancelAmount;
            return __generator(this, function (_a) {
                zeroCancelAmount = new utils_1.BigNumber(0);
                return [2 /*return*/, expect(contractWrappers.exchange.validateCancelOrderThrowIfInvalidAsync(signedOrder, zeroCancelAmount)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderCancelAmountZero)];
            });
        }); });
        it('should throw when order is expired', function () { return __awaiter(_this, void 0, void 0, function () {
            var expirationInPast, expiredSignedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expirationInPast = new utils_1.BigNumber(1496826058);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount, expirationInPast)];
                    case 1:
                        expiredSignedOrder = _a.sent();
                        return [2 /*return*/, expect(contractWrappers.exchange.validateCancelOrderThrowIfInvalidAsync(expiredSignedOrder, cancelAmount)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderCancelExpired)];
                }
            });
        }); });
        it('should throw when order is already cancelled or filled', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.exchange.cancelOrderAsync(signedOrder, fillableAmount)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, expect(contractWrappers.exchange.validateCancelOrderThrowIfInvalidAsync(signedOrder, fillableAmount)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderAlreadyCancelledOrFilled)];
                }
            });
        }); });
    });
    describe('#validateFillOrderBalancesAllowancesThrowIfInvalidAsync', function () {
        var exchangeTransferSimulator;
        var transferFromAsync;
        var bigNumberMatch = function (expected) {
            return Sinon.match(function (value) { return value.eq(expected); });
        };
        beforeEach('create exchangeTransferSimulator', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                exchangeTransferSimulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(contractWrappers.token, types_1.BlockParamLiteral.Latest);
                transferFromAsync = Sinon.spy();
                exchangeTransferSimulator.transferFromAsync = transferFromAsync;
                return [2 /*return*/];
            });
        }); });
        it('should call exchangeTransferSimulator.transferFrom in a correct order', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerFee, takerFee, signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makerFee = new utils_1.BigNumber(2);
                        takerFee = new utils_1.BigNumber(2);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderWithFeesAsync(makerTokenAddress, takerTokenAddress, makerFee, takerFee, makerAddress, takerAddress, fillableAmount, feeRecipient)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, order_validation_utils_1.OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTransferSimulator, signedOrder, fillableAmount, takerAddress, zrxTokenAddress)];
                    case 2:
                        _a.sent();
                        // tslint:disable-next-line:custom-no-magic-numbers
                        expect(transferFromAsync.callCount).to.be.equal(4);
                        expect(transferFromAsync
                            .getCall(0)
                            .calledWith(makerTokenAddress, makerAddress, takerAddress, bigNumberMatch(fillableAmount), types_2.TradeSide.Maker, types_2.TransferType.Trade)).to.be.true();
                        expect(transferFromAsync
                            .getCall(1)
                            .calledWith(takerTokenAddress, takerAddress, makerAddress, bigNumberMatch(fillableAmount), types_2.TradeSide.Taker, types_2.TransferType.Trade)).to.be.true();
                        expect(transferFromAsync
                            .getCall(2)
                            .calledWith(zrxTokenAddress, makerAddress, feeRecipient, bigNumberMatch(makerFee), types_2.TradeSide.Maker, types_2.TransferType.Fee)).to.be.true();
                        expect(transferFromAsync
                            .getCall(3)
                            .calledWith(zrxTokenAddress, takerAddress, feeRecipient, bigNumberMatch(takerFee), types_2.TradeSide.Taker, types_2.TransferType.Fee)).to.be.true();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call exchangeTransferSimulator.transferFrom with correct values for an open order', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerFee, takerFee, signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makerFee = new utils_1.BigNumber(2);
                        takerFee = new utils_1.BigNumber(2);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderWithFeesAsync(makerTokenAddress, takerTokenAddress, makerFee, takerFee, makerAddress, constants_1.constants.NULL_ADDRESS, fillableAmount, feeRecipient)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, order_validation_utils_1.OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTransferSimulator, signedOrder, fillableAmount, takerAddress, zrxTokenAddress)];
                    case 2:
                        _a.sent();
                        // tslint:disable-next-line:custom-no-magic-numbers
                        expect(transferFromAsync.callCount).to.be.equal(4);
                        expect(transferFromAsync
                            .getCall(0)
                            .calledWith(makerTokenAddress, makerAddress, takerAddress, bigNumberMatch(fillableAmount), types_2.TradeSide.Maker, types_2.TransferType.Trade)).to.be.true();
                        expect(transferFromAsync
                            .getCall(1)
                            .calledWith(takerTokenAddress, takerAddress, makerAddress, bigNumberMatch(fillableAmount), types_2.TradeSide.Taker, types_2.TransferType.Trade)).to.be.true();
                        expect(transferFromAsync
                            .getCall(2)
                            .calledWith(zrxTokenAddress, makerAddress, feeRecipient, bigNumberMatch(makerFee), types_2.TradeSide.Maker, types_2.TransferType.Fee)).to.be.true();
                        expect(transferFromAsync
                            .getCall(3)
                            .calledWith(zrxTokenAddress, takerAddress, feeRecipient, bigNumberMatch(takerFee), types_2.TradeSide.Taker, types_2.TransferType.Fee)).to.be.true();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should correctly round the fillMakerTokenAmount', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerTokenAmount, takerTokenAmount, signedOrder, makerFillAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makerTokenAmount = new utils_1.BigNumber(3);
                        takerTokenAmount = new utils_1.BigNumber(1);
                        return [4 /*yield*/, fillScenarios.createAsymmetricFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, makerTokenAmount, takerTokenAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, order_validation_utils_1.OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTransferSimulator, signedOrder, takerTokenAmount, takerAddress, zrxTokenAddress)];
                    case 2:
                        _a.sent();
                        // tslint:disable-next-line:custom-no-magic-numbers
                        expect(transferFromAsync.callCount).to.be.equal(4);
                        makerFillAmount = transferFromAsync.getCall(0).args[3];
                        expect(makerFillAmount).to.be.bignumber.equal(makerTokenAmount);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should correctly round the makerFeeAmount', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerFee, takerFee, signedOrder, fillTakerTokenAmount, makerPartialFee, takerPartialFee, partialMakerFee, partialTakerFee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makerFee = new utils_1.BigNumber(2);
                        takerFee = new utils_1.BigNumber(4);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderWithFeesAsync(makerTokenAddress, takerTokenAddress, makerFee, takerFee, makerAddress, takerAddress, fillableAmount, constants_1.constants.NULL_ADDRESS)];
                    case 1:
                        signedOrder = _a.sent();
                        fillTakerTokenAmount = fillableAmount.div(2).round(0);
                        return [4 /*yield*/, order_validation_utils_1.OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTransferSimulator, signedOrder, fillTakerTokenAmount, takerAddress, zrxTokenAddress)];
                    case 2:
                        _a.sent();
                        makerPartialFee = makerFee.div(2);
                        takerPartialFee = takerFee.div(2);
                        // tslint:disable-next-line:custom-no-magic-numbers
                        expect(transferFromAsync.callCount).to.be.equal(4);
                        partialMakerFee = transferFromAsync.getCall(2).args[3];
                        expect(partialMakerFee).to.be.bignumber.equal(makerPartialFee);
                        partialTakerFee = transferFromAsync.getCall(3).args[3];
                        expect(partialTakerFee).to.be.bignumber.equal(takerPartialFee);
                        return [2 /*return*/];
                }
            });
        }); });
    });
}); // tslint:disable-line:max-file-line-count
//# sourceMappingURL=order_validation_test.js.map