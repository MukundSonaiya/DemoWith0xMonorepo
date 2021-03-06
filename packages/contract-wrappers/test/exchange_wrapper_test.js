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
var web3_wrapper_1 = require("@0xproject/web3-wrapper");
var chai = require("chai");
require("make-promises-safe");
require("mocha");
var src_1 = require("../src");
var chai_setup_1 = require("./utils/chai_setup");
var constants_1 = require("./utils/constants");
var token_utils_1 = require("./utils/token_utils");
var web3_wrapper_2 = require("./utils/web3_wrapper");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(web3_wrapper_2.web3Wrapper);
var NON_EXISTENT_ORDER_HASH = '0x79370342234e7acd6bbeac335bd3bb1d368383294b64b8160a00f4060e4d3777';
describe('ExchangeWrapper', function () {
    var contractWrappers;
    var tokenUtils;
    var tokens;
    var userAddresses;
    var zrxTokenAddress;
    var fillScenarios;
    var exchangeContractAddress;
    var config = {
        networkId: constants_1.constants.TESTRPC_NETWORK_ID,
    };
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractWrappers = new src_1.ContractWrappers(web3_wrapper_2.provider, config);
                    exchangeContractAddress = contractWrappers.exchange.getContractAddress();
                    return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getAvailableAddressesAsync()];
                case 1:
                    userAddresses = _a.sent();
                    return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                case 2:
                    tokens = _a.sent();
                    tokenUtils = new token_utils_1.TokenUtils(tokens);
                    zrxTokenAddress = tokenUtils.getProtocolTokenOrThrow().address;
                    fillScenarios = new fill_scenarios_1.FillScenarios(web3_wrapper_2.provider, userAddresses, tokens, zrxTokenAddress, exchangeContractAddress);
                    return [4 /*yield*/, fillScenarios.initTokenBalancesAsync()];
                case 3:
                    _a.sent();
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
    describe('fillOrKill order(s)', function () {
        var makerTokenAddress;
        var takerTokenAddress;
        var coinbase;
        var makerAddress;
        var takerAddress;
        var feeRecipient;
        var takerTokenFillAmount = new utils_1.BigNumber(5);
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, makerToken, takerToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        coinbase = userAddresses[0], makerAddress = userAddresses[1], takerAddress = userAddresses[2], feeRecipient = userAddresses[3];
                        return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                    case 1:
                        tokens = _b.sent();
                        _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
                        makerTokenAddress = makerToken.address;
                        takerTokenAddress = takerToken.address;
                        return [2 /*return*/];
                }
            });
        }); });
        describe('#batchFillOrKillAsync', function () {
            it('successfully batch fillOrKill', function () { return __awaiter(_this, void 0, void 0, function () {
                var fillableAmount, partialFillTakerAmount, signedOrder, anotherSignedOrder, orderFillRequests;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fillableAmount = new utils_1.BigNumber(5);
                            partialFillTakerAmount = new utils_1.BigNumber(2);
                            return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                        case 1:
                            signedOrder = _a.sent();
                            return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                        case 2:
                            anotherSignedOrder = _a.sent();
                            orderFillRequests = [
                                {
                                    signedOrder: signedOrder,
                                    takerTokenFillAmount: partialFillTakerAmount,
                                },
                                {
                                    signedOrder: anotherSignedOrder,
                                    takerTokenFillAmount: partialFillTakerAmount,
                                },
                            ];
                            return [4 /*yield*/, contractWrappers.exchange.batchFillOrKillAsync(orderFillRequests, takerAddress)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('order transaction options', function () {
                var signedOrder;
                var orderFillRequests;
                var fillableAmount = new utils_1.BigNumber(5);
                beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                            case 1:
                                signedOrder = _a.sent();
                                orderFillRequests = [
                                    {
                                        signedOrder: signedOrder,
                                        takerTokenFillAmount: new utils_1.BigNumber(0),
                                    },
                                ];
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should validate when orderTransactionOptions are not present', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchFillOrKillAsync(orderFillRequests, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should validate when orderTransactionOptions specify to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchFillOrKillAsync(orderFillRequests, takerAddress, {
                                shouldValidate: true,
                            })).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should not validate when orderTransactionOptions specify not to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchFillOrKillAsync(orderFillRequests, takerAddress, {
                                shouldValidate: false,
                            })).to.not.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
            });
        });
        describe('#fillOrKillOrderAsync', function () {
            var signedOrder;
            var fillableAmount = new utils_1.BigNumber(5);
            beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                        case 1:
                            signedOrder = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('successful fills', function () {
                it('should fill a valid order', function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                _a = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, makerAddress)];
                            case 1:
                                _a.apply(void 0, [_j.sent()]).to.be.bignumber.equal(fillableAmount);
                                _b = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, makerAddress)];
                            case 2:
                                _b.apply(void 0, [_j.sent()]).to.be.bignumber.equal(0);
                                _c = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, takerAddress)];
                            case 3:
                                _c.apply(void 0, [_j.sent()]).to.be.bignumber.equal(0);
                                _d = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, takerAddress)];
                            case 4:
                                _d.apply(void 0, [_j.sent()]).to.be.bignumber.equal(fillableAmount);
                                return [4 /*yield*/, contractWrappers.exchange.fillOrKillOrderAsync(signedOrder, takerTokenFillAmount, takerAddress)];
                            case 5:
                                _j.sent();
                                _e = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, makerAddress)];
                            case 6:
                                _e.apply(void 0, [_j.sent()]).to.be.bignumber.equal(fillableAmount.minus(takerTokenFillAmount));
                                _f = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, makerAddress)];
                            case 7:
                                _f.apply(void 0, [_j.sent()]).to.be.bignumber.equal(takerTokenFillAmount);
                                _g = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, takerAddress)];
                            case 8:
                                _g.apply(void 0, [_j.sent()]).to.be.bignumber.equal(takerTokenFillAmount);
                                _h = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, takerAddress)];
                            case 9:
                                _h.apply(void 0, [_j.sent()]).to.be.bignumber.equal(fillableAmount.minus(takerTokenFillAmount));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should partially fill a valid order', function () { return __awaiter(_this, void 0, void 0, function () {
                    var partialFillAmount, _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                partialFillAmount = new utils_1.BigNumber(3);
                                return [4 /*yield*/, contractWrappers.exchange.fillOrKillOrderAsync(signedOrder, partialFillAmount, takerAddress)];
                            case 1:
                                _e.sent();
                                _a = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, makerAddress)];
                            case 2:
                                _a.apply(void 0, [_e.sent()]).to.be.bignumber.equal(fillableAmount.minus(partialFillAmount));
                                _b = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, makerAddress)];
                            case 3:
                                _b.apply(void 0, [_e.sent()]).to.be.bignumber.equal(partialFillAmount);
                                _c = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, takerAddress)];
                            case 4:
                                _c.apply(void 0, [_e.sent()]).to.be.bignumber.equal(partialFillAmount);
                                _d = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, takerAddress)];
                            case 5:
                                _d.apply(void 0, [_e.sent()]).to.be.bignumber.equal(fillableAmount.minus(partialFillAmount));
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('order transaction options', function () {
                var emptyFillableAmount = new utils_1.BigNumber(0);
                it('should validate when orderTransactionOptions are not present', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrKillOrderAsync(signedOrder, emptyFillableAmount, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should validate when orderTransactionOptions specify to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrKillOrderAsync(signedOrder, emptyFillableAmount, takerAddress, {
                                shouldValidate: true,
                            })).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should not validate when orderTransactionOptions specify not to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrKillOrderAsync(signedOrder, emptyFillableAmount, takerAddress, {
                                shouldValidate: false,
                            })).to.not.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
            });
        });
    });
    describe('fill order(s)', function () {
        var makerTokenAddress;
        var takerTokenAddress;
        var coinbase;
        var makerAddress;
        var takerAddress;
        var feeRecipient;
        var fillableAmount = new utils_1.BigNumber(5);
        var takerTokenFillAmount = new utils_1.BigNumber(5);
        var shouldThrowOnInsufficientBalanceOrAllowance = true;
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, makerToken, takerToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        coinbase = userAddresses[0], makerAddress = userAddresses[1], takerAddress = userAddresses[2], feeRecipient = userAddresses[3];
                        return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                    case 1:
                        tokens = _b.sent();
                        _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
                        makerTokenAddress = makerToken.address;
                        takerTokenAddress = takerToken.address;
                        return [2 /*return*/];
                }
            });
        }); });
        describe('#fillOrderAsync', function () {
            describe('successful fills', function () {
                it('should fill a valid order', function () { return __awaiter(_this, void 0, void 0, function () {
                    var signedOrder, _a, _b, _c, _d, txHash, _e, _f, _g, _h;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                            case 1:
                                signedOrder = _j.sent();
                                _a = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, makerAddress)];
                            case 2:
                                _a.apply(void 0, [_j.sent()]).to.be.bignumber.equal(fillableAmount);
                                _b = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, makerAddress)];
                            case 3:
                                _b.apply(void 0, [_j.sent()]).to.be.bignumber.equal(0);
                                _c = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, takerAddress)];
                            case 4:
                                _c.apply(void 0, [_j.sent()]).to.be.bignumber.equal(0);
                                _d = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, takerAddress)];
                            case 5:
                                _d.apply(void 0, [_j.sent()]).to.be.bignumber.equal(fillableAmount);
                                return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, takerTokenFillAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                            case 6:
                                txHash = _j.sent();
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                            case 7:
                                _j.sent();
                                _e = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, makerAddress)];
                            case 8:
                                _e.apply(void 0, [_j.sent()]).to.be.bignumber.equal(fillableAmount.minus(takerTokenFillAmount));
                                _f = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, makerAddress)];
                            case 9:
                                _f.apply(void 0, [_j.sent()]).to.be.bignumber.equal(takerTokenFillAmount);
                                _g = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, takerAddress)];
                            case 10:
                                _g.apply(void 0, [_j.sent()]).to.be.bignumber.equal(takerTokenFillAmount);
                                _h = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, takerAddress)];
                            case 11:
                                _h.apply(void 0, [_j.sent()]).to.be.bignumber.equal(fillableAmount.minus(takerTokenFillAmount));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should partially fill the valid order', function () { return __awaiter(_this, void 0, void 0, function () {
                    var signedOrder, partialFillAmount, txHash, _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                            case 1:
                                signedOrder = _e.sent();
                                partialFillAmount = new utils_1.BigNumber(3);
                                return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, partialFillAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                            case 2:
                                txHash = _e.sent();
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                            case 3:
                                _e.sent();
                                _a = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, makerAddress)];
                            case 4:
                                _a.apply(void 0, [_e.sent()]).to.be.bignumber.equal(fillableAmount.minus(partialFillAmount));
                                _b = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, makerAddress)];
                            case 5:
                                _b.apply(void 0, [_e.sent()]).to.be.bignumber.equal(partialFillAmount);
                                _c = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(makerTokenAddress, takerAddress)];
                            case 6:
                                _c.apply(void 0, [_e.sent()]).to.be.bignumber.equal(partialFillAmount);
                                _d = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(takerTokenAddress, takerAddress)];
                            case 7:
                                _d.apply(void 0, [_e.sent()]).to.be.bignumber.equal(fillableAmount.minus(partialFillAmount));
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should fill the valid orders with fees', function () { return __awaiter(_this, void 0, void 0, function () {
                    var makerFee, takerFee, signedOrder, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                makerFee = new utils_1.BigNumber(1);
                                takerFee = new utils_1.BigNumber(2);
                                return [4 /*yield*/, fillScenarios.createFillableSignedOrderWithFeesAsync(makerTokenAddress, takerTokenAddress, makerFee, takerFee, makerAddress, takerAddress, fillableAmount, feeRecipient)];
                            case 1:
                                signedOrder = _b.sent();
                                return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, takerTokenFillAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                            case 2:
                                txHash = _b.sent();
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                            case 3:
                                _b.sent();
                                _a = expect;
                                return [4 /*yield*/, contractWrappers.token.getBalanceAsync(zrxTokenAddress, feeRecipient)];
                            case 4:
                                _a.apply(void 0, [_b.sent()]).to.be.bignumber.equal(makerFee.plus(takerFee));
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('order transaction options', function () {
                var signedOrder;
                var emptyFillTakerAmount = new utils_1.BigNumber(0);
                beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                            case 1:
                                signedOrder = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should validate when orderTransactionOptions are not present', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrderAsync(signedOrder, emptyFillTakerAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should validate when orderTransactionOptions specify to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrderAsync(signedOrder, emptyFillTakerAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, {
                                shouldValidate: true,
                            })).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should not validate when orderTransactionOptions specify not to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrderAsync(signedOrder, emptyFillTakerAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, {
                                shouldValidate: false,
                            })).to.not.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
            });
            describe('negative fill amount', function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var signedOrder, negativeFillTakerAmount;
                return __generator(this, function (_a) {
                    negativeFillTakerAmount = new utils_1.BigNumber(-100);
                    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                                case 1:
                                    signedOrder = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should not allow the exchange wrapper to fill if amount is negative', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, expect(contractWrappers.exchange.fillOrderAsync(signedOrder, negativeFillTakerAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)).to.be.rejected()];
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('#batchFillOrdersAsync', function () {
            var signedOrder;
            var signedOrderHashHex;
            var anotherSignedOrder;
            var anotherOrderHashHex;
            var orderFillBatch;
            beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                        case 1:
                            signedOrder = _a.sent();
                            signedOrderHashHex = order_utils_1.getOrderHashHex(signedOrder);
                            return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                        case 2:
                            anotherSignedOrder = _a.sent();
                            anotherOrderHashHex = order_utils_1.getOrderHashHex(anotherSignedOrder);
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('successful batch fills', function () {
                beforeEach(function () {
                    orderFillBatch = [
                        {
                            signedOrder: signedOrder,
                            takerTokenFillAmount: takerTokenFillAmount,
                        },
                        {
                            signedOrder: anotherSignedOrder,
                            takerTokenFillAmount: takerTokenFillAmount,
                        },
                    ];
                });
                it('should throw if a batch is empty', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchFillOrdersAsync([], shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.BatchOrdersMustHaveAtLeastOneItem)];
                    });
                }); });
                it('should successfully fill multiple orders', function () { return __awaiter(_this, void 0, void 0, function () {
                    var txHash, filledAmount, anotherFilledAmount;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, contractWrappers.exchange.batchFillOrdersAsync(orderFillBatch, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                            case 1:
                                txHash = _a.sent();
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(signedOrderHashHex)];
                            case 3:
                                filledAmount = _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(anotherOrderHashHex)];
                            case 4:
                                anotherFilledAmount = _a.sent();
                                expect(filledAmount).to.be.bignumber.equal(takerTokenFillAmount);
                                expect(anotherFilledAmount).to.be.bignumber.equal(takerTokenFillAmount);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('order transaction options', function () {
                beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                    var emptyFillTakerAmount;
                    return __generator(this, function (_a) {
                        emptyFillTakerAmount = new utils_1.BigNumber(0);
                        orderFillBatch = [
                            {
                                signedOrder: signedOrder,
                                takerTokenFillAmount: emptyFillTakerAmount,
                            },
                            {
                                signedOrder: anotherSignedOrder,
                                takerTokenFillAmount: emptyFillTakerAmount,
                            },
                        ];
                        return [2 /*return*/];
                    });
                }); });
                it('should validate when orderTransactionOptions are not present', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchFillOrdersAsync(orderFillBatch, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should validate when orderTransactionOptions specify to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchFillOrdersAsync(orderFillBatch, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, {
                                shouldValidate: true,
                            })).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should not validate when orderTransactionOptions specify not to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchFillOrdersAsync(orderFillBatch, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, {
                                shouldValidate: false,
                            })).to.not.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
            });
            describe('negative batch fill amount', function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                        var negativeFillTakerAmount;
                        return __generator(this, function (_a) {
                            negativeFillTakerAmount = new utils_1.BigNumber(-100);
                            orderFillBatch = [
                                {
                                    signedOrder: signedOrder,
                                    takerTokenFillAmount: takerTokenFillAmount,
                                },
                                {
                                    signedOrder: anotherSignedOrder,
                                    takerTokenFillAmount: negativeFillTakerAmount,
                                },
                            ];
                            return [2 /*return*/];
                        });
                    }); });
                    it('should not allow the exchange wrapper to batch fill if any amount is negative', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, expect(contractWrappers.exchange.batchFillOrdersAsync(orderFillBatch, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)).to.be.rejected()];
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('#fillOrdersUpTo', function () {
            var signedOrder;
            var signedOrderHashHex;
            var anotherSignedOrder;
            var anotherOrderHashHex;
            var signedOrders;
            var fillUpToAmount = fillableAmount.plus(fillableAmount).minus(1);
            beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                        case 1:
                            signedOrder = _a.sent();
                            signedOrderHashHex = order_utils_1.getOrderHashHex(signedOrder);
                            return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                        case 2:
                            anotherSignedOrder = _a.sent();
                            anotherOrderHashHex = order_utils_1.getOrderHashHex(anotherSignedOrder);
                            signedOrders = [signedOrder, anotherSignedOrder];
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('successful batch fills', function () {
                it('should throw if a batch is empty', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrdersUpToAsync([], fillUpToAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.BatchOrdersMustHaveAtLeastOneItem)];
                    });
                }); });
                it('should successfully fill up to specified amount when all orders are fully funded', function () { return __awaiter(_this, void 0, void 0, function () {
                    var txHash, filledAmount, anotherFilledAmount, remainingFillAmount;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, contractWrappers.exchange.fillOrdersUpToAsync(signedOrders, fillUpToAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                            case 1:
                                txHash = _a.sent();
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(signedOrderHashHex)];
                            case 3:
                                filledAmount = _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(anotherOrderHashHex)];
                            case 4:
                                anotherFilledAmount = _a.sent();
                                expect(filledAmount).to.be.bignumber.equal(fillableAmount);
                                remainingFillAmount = fillableAmount.minus(1);
                                expect(anotherFilledAmount).to.be.bignumber.equal(remainingFillAmount);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should successfully fill up to specified amount and leave the rest of the orders untouched', function () { return __awaiter(_this, void 0, void 0, function () {
                    var txHash, filledAmount, zeroAmount;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, contractWrappers.exchange.fillOrdersUpToAsync(signedOrders, fillableAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                            case 1:
                                txHash = _a.sent();
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(signedOrderHashHex)];
                            case 3:
                                filledAmount = _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(anotherOrderHashHex)];
                            case 4:
                                zeroAmount = _a.sent();
                                expect(filledAmount).to.be.bignumber.equal(fillableAmount);
                                expect(zeroAmount).to.be.bignumber.equal(0);
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should successfully fill up to specified amount even if filling all orders would fail', function () { return __awaiter(_this, void 0, void 0, function () {
                    var missingBalance, txHash, filledAmount, anotherFilledAmount, remainingFillAmount;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                missingBalance = new utils_1.BigNumber(1);
                                // but won't have 10 to fully fill all orders in a batch.
                                return [4 /*yield*/, contractWrappers.token.transferAsync(makerTokenAddress, makerAddress, coinbase, missingBalance)];
                            case 1:
                                // but won't have 10 to fully fill all orders in a batch.
                                _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.fillOrdersUpToAsync(signedOrders, fillUpToAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                            case 2:
                                txHash = _a.sent();
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(signedOrderHashHex)];
                            case 4:
                                filledAmount = _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(anotherOrderHashHex)];
                            case 5:
                                anotherFilledAmount = _a.sent();
                                expect(filledAmount).to.be.bignumber.equal(fillableAmount);
                                remainingFillAmount = fillableAmount.minus(1);
                                expect(anotherFilledAmount).to.be.bignumber.equal(remainingFillAmount);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('failed batch fills', function () {
                it("should fail validation if user doesn't have enough balance without fill up to", function () { return __awaiter(_this, void 0, void 0, function () {
                    var missingBalance;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                missingBalance = new utils_1.BigNumber(2);
                                return [4 /*yield*/, contractWrappers.token.transferAsync(makerTokenAddress, makerAddress, coinbase, missingBalance)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, expect(contractWrappers.exchange.fillOrdersUpToAsync(signedOrders, fillUpToAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.InsufficientMakerBalance)];
                        }
                    });
                }); });
            });
            describe('order transaction options', function () {
                var emptyFillUpToAmount = new utils_1.BigNumber(0);
                it('should validate when orderTransactionOptions are not present', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrdersUpToAsync(signedOrders, emptyFillUpToAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should validate when orderTransactionOptions specify to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrdersUpToAsync(signedOrders, emptyFillUpToAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, {
                                shouldValidate: true,
                            })).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
                it('should not validate when orderTransactionOptions specify not to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.fillOrdersUpToAsync(signedOrders, emptyFillUpToAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress, {
                                shouldValidate: false,
                            })).to.not.be.rejectedWith(src_1.ExchangeContractErrs.OrderFillAmountZero)];
                    });
                }); });
            });
        });
    });
    describe('cancel order(s)', function () {
        var makerTokenAddress;
        var takerTokenAddress;
        var coinbase;
        var makerAddress;
        var takerAddress;
        var fillableAmount = new utils_1.BigNumber(5);
        var signedOrder;
        var orderHashHex;
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
                        orderHashHex = order_utils_1.getOrderHashHex(signedOrder);
                        return [2 /*return*/];
                }
            });
        }); });
        describe('#cancelOrderAsync', function () {
            describe('successful cancels', function () {
                it('should cancel an order', function () { return __awaiter(_this, void 0, void 0, function () {
                    var txHash, cancelledAmount;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, contractWrappers.exchange.cancelOrderAsync(signedOrder, cancelAmount)];
                            case 1:
                                txHash = _a.sent();
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getCancelledTakerAmountAsync(orderHashHex)];
                            case 3:
                                cancelledAmount = _a.sent();
                                expect(cancelledAmount).to.be.bignumber.equal(cancelAmount);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('order transaction options', function () {
                var emptyCancelTakerTokenAmount = new utils_1.BigNumber(0);
                it('should validate when orderTransactionOptions are not present', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.cancelOrderAsync(signedOrder, emptyCancelTakerTokenAmount)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderCancelAmountZero)];
                    });
                }); });
                it('should validate when orderTransactionOptions specify to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.cancelOrderAsync(signedOrder, emptyCancelTakerTokenAmount, {
                                shouldValidate: true,
                            })).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderCancelAmountZero)];
                    });
                }); });
                it('should not validate when orderTransactionOptions specify not to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.cancelOrderAsync(signedOrder, emptyCancelTakerTokenAmount, {
                                shouldValidate: false,
                            })).to.not.be.rejectedWith(src_1.ExchangeContractErrs.OrderCancelAmountZero)];
                    });
                }); });
            });
        });
        describe('#batchCancelOrdersAsync', function () {
            var anotherSignedOrder;
            var anotherOrderHashHex;
            var cancelBatch;
            beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                        case 1:
                            anotherSignedOrder = _a.sent();
                            anotherOrderHashHex = order_utils_1.getOrderHashHex(anotherSignedOrder);
                            cancelBatch = [
                                {
                                    order: signedOrder,
                                    takerTokenCancelAmount: cancelAmount,
                                },
                                {
                                    order: anotherSignedOrder,
                                    takerTokenCancelAmount: cancelAmount,
                                },
                            ];
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('failed batch cancels', function () {
                it('should throw when orders have different makers', function () { return __awaiter(_this, void 0, void 0, function () {
                    var signedOrderWithDifferentMaker;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, takerAddress, takerAddress, fillableAmount)];
                            case 1:
                                signedOrderWithDifferentMaker = _a.sent();
                                return [2 /*return*/, expect(contractWrappers.exchange.batchCancelOrdersAsync([
                                        cancelBatch[0],
                                        {
                                            order: signedOrderWithDifferentMaker,
                                            takerTokenCancelAmount: cancelAmount,
                                        },
                                    ])).to.be.rejectedWith(src_1.ExchangeContractErrs.MultipleMakersInSingleCancelBatchDisallowed)];
                        }
                    });
                }); });
            });
            describe('successful batch cancels', function () {
                it('should cancel a batch of orders', function () { return __awaiter(_this, void 0, void 0, function () {
                    var cancelledAmount, anotherCancelledAmount;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, contractWrappers.exchange.batchCancelOrdersAsync(cancelBatch)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getCancelledTakerAmountAsync(orderHashHex)];
                            case 2:
                                cancelledAmount = _a.sent();
                                return [4 /*yield*/, contractWrappers.exchange.getCancelledTakerAmountAsync(anotherOrderHashHex)];
                            case 3:
                                anotherCancelledAmount = _a.sent();
                                expect(cancelledAmount).to.be.bignumber.equal(cancelAmount);
                                expect(anotherCancelledAmount).to.be.bignumber.equal(cancelAmount);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('order transaction options', function () {
                beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                    var emptyTakerTokenCancelAmount;
                    return __generator(this, function (_a) {
                        emptyTakerTokenCancelAmount = new utils_1.BigNumber(0);
                        cancelBatch = [
                            {
                                order: signedOrder,
                                takerTokenCancelAmount: emptyTakerTokenCancelAmount,
                            },
                            {
                                order: anotherSignedOrder,
                                takerTokenCancelAmount: emptyTakerTokenCancelAmount,
                            },
                        ];
                        return [2 /*return*/];
                    });
                }); });
                it('should validate when orderTransactionOptions are not present', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchCancelOrdersAsync(cancelBatch)).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderCancelAmountZero)];
                    });
                }); });
                it('should validate when orderTransactionOptions specify to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchCancelOrdersAsync(cancelBatch, {
                                shouldValidate: true,
                            })).to.be.rejectedWith(src_1.ExchangeContractErrs.OrderCancelAmountZero)];
                    });
                }); });
                it('should not validate when orderTransactionOptions specify not to validate', function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, expect(contractWrappers.exchange.batchCancelOrdersAsync(cancelBatch, {
                                shouldValidate: false,
                            })).to.not.be.rejectedWith(src_1.ExchangeContractErrs.OrderCancelAmountZero)];
                    });
                }); });
            });
        });
    });
    describe('tests that require partially filled order', function () {
        var makerTokenAddress;
        var takerTokenAddress;
        var takerAddress;
        var fillableAmount;
        var partialFillAmount;
        var signedOrder;
        var orderHash;
        before(function () {
            takerAddress = userAddresses[1];
            tokenUtils = new token_utils_1.TokenUtils(tokens);
            var _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
            makerTokenAddress = makerToken.address;
            takerTokenAddress = takerToken.address;
        });
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fillableAmount = new utils_1.BigNumber(5);
                        partialFillAmount = new utils_1.BigNumber(2);
                        return [4 /*yield*/, fillScenarios.createPartiallyFilledSignedOrderAsync(makerTokenAddress, takerTokenAddress, takerAddress, fillableAmount, partialFillAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        orderHash = order_utils_1.getOrderHashHex(signedOrder);
                        return [2 /*return*/];
                }
            });
        }); });
        describe('#getUnavailableTakerAmountAsync', function () {
            it('should throw if passed an invalid orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var invalidOrderHashHex;
                return __generator(this, function (_a) {
                    invalidOrderHashHex = '0x123';
                    return [2 /*return*/, expect(contractWrappers.exchange.getUnavailableTakerAmountAsync(invalidOrderHashHex)).to.be.rejected()];
                });
            }); });
            it('should return zero if passed a valid but non-existent orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var unavailableValueT;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, contractWrappers.exchange.getUnavailableTakerAmountAsync(NON_EXISTENT_ORDER_HASH)];
                        case 1:
                            unavailableValueT = _a.sent();
                            expect(unavailableValueT).to.be.bignumber.equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return the unavailableValueT for a valid and partially filled orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var unavailableValueT;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, contractWrappers.exchange.getUnavailableTakerAmountAsync(orderHash)];
                        case 1:
                            unavailableValueT = _a.sent();
                            expect(unavailableValueT).to.be.bignumber.equal(partialFillAmount);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('#getFilledTakerAmountAsync', function () {
            it('should throw if passed an invalid orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var invalidOrderHashHex;
                return __generator(this, function (_a) {
                    invalidOrderHashHex = '0x123';
                    return [2 /*return*/, expect(contractWrappers.exchange.getFilledTakerAmountAsync(invalidOrderHashHex)).to.be.rejected()];
                });
            }); });
            it('should return zero if passed a valid but non-existent orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var filledValueT;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(NON_EXISTENT_ORDER_HASH)];
                        case 1:
                            filledValueT = _a.sent();
                            expect(filledValueT).to.be.bignumber.equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return the filledValueT for a valid and partially filled orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var filledValueT;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, contractWrappers.exchange.getFilledTakerAmountAsync(orderHash)];
                        case 1:
                            filledValueT = _a.sent();
                            expect(filledValueT).to.be.bignumber.equal(partialFillAmount);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('#getCancelledTakerAmountAsync', function () {
            it('should throw if passed an invalid orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var invalidOrderHashHex;
                return __generator(this, function (_a) {
                    invalidOrderHashHex = '0x123';
                    return [2 /*return*/, expect(contractWrappers.exchange.getCancelledTakerAmountAsync(invalidOrderHashHex)).to.be.rejected()];
                });
            }); });
            it('should return zero if passed a valid but non-existent orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var cancelledValueT;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, contractWrappers.exchange.getCancelledTakerAmountAsync(NON_EXISTENT_ORDER_HASH)];
                        case 1:
                            cancelledValueT = _a.sent();
                            expect(cancelledValueT).to.be.bignumber.equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return the cancelledValueT for a valid and partially filled orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var cancelledValueT;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, contractWrappers.exchange.getCancelledTakerAmountAsync(orderHash)];
                        case 1:
                            cancelledValueT = _a.sent();
                            expect(cancelledValueT).to.be.bignumber.equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return the cancelledValueT for a valid and cancelled orderHash', function () { return __awaiter(_this, void 0, void 0, function () {
                var cancelAmount, cancelledValueT;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cancelAmount = fillableAmount.minus(partialFillAmount);
                            return [4 /*yield*/, contractWrappers.exchange.cancelOrderAsync(signedOrder, cancelAmount)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, contractWrappers.exchange.getCancelledTakerAmountAsync(orderHash)];
                        case 2:
                            cancelledValueT = _a.sent();
                            expect(cancelledValueT).to.be.bignumber.equal(cancelAmount);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('#subscribe', function () {
        var indexFilterValues = {};
        var shouldThrowOnInsufficientBalanceOrAllowance = true;
        var makerTokenAddress;
        var takerTokenAddress;
        var coinbase;
        var takerAddress;
        var makerAddress;
        var fillableAmount;
        var signedOrder;
        var takerTokenFillAmountInBaseUnits = new utils_1.BigNumber(1);
        var cancelTakerAmountInBaseUnits = new utils_1.BigNumber(1);
        before(function () {
            coinbase = userAddresses[0], makerAddress = userAddresses[1], takerAddress = userAddresses[2];
            var _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
            makerTokenAddress = makerToken.address;
            takerTokenAddress = takerToken.address;
        });
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fillableAmount = new utils_1.BigNumber(5);
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                contractWrappers.exchange.unsubscribeAll();
                return [2 /*return*/];
            });
        }); });
        // Hack: Mocha does not allow a test to be both async and have a `done` callback
        // Since we need to await the receipt of the event in the `subscribe` callback,
        // we do need both. A hack is to make the top-level a sync fn w/ a done callback and then
        // wrap the rest of the test in an async block
        // Source: https://github.com/mochajs/mocha/issues/2407
        it('Should receive the LogFill event when an order is filled', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callback = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                expect(logEvent.log.event).to.be.equal(src_1.ExchangeEvents.LogFill);
                            });
                            contractWrappers.exchange.subscribe(src_1.ExchangeEvents.LogFill, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, takerTokenFillAmountInBaseUnits, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('Should receive the LogCancel event when an order is cancelled', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callback = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                expect(logEvent.log.event).to.be.equal(src_1.ExchangeEvents.LogCancel);
                            });
                            contractWrappers.exchange.subscribe(src_1.ExchangeEvents.LogCancel, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.exchange.cancelOrderAsync(signedOrder, cancelTakerAmountInBaseUnits)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('Outstanding subscriptions are cancelled when contractWrappers.setProvider called', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callbackNeverToBeCalled, callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callbackNeverToBeCalled = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                done(new Error('Expected this subscription to have been cancelled'));
                            });
                            contractWrappers.exchange.subscribe(src_1.ExchangeEvents.LogFill, indexFilterValues, callbackNeverToBeCalled);
                            contractWrappers.setProvider(web3_wrapper_2.provider, constants_1.constants.TESTRPC_NETWORK_ID);
                            callback = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                expect(logEvent.log.event).to.be.equal(src_1.ExchangeEvents.LogFill);
                            });
                            contractWrappers.exchange.subscribe(src_1.ExchangeEvents.LogFill, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, takerTokenFillAmountInBaseUnits, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('Should cancel subscription when unsubscribe called', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callbackNeverToBeCalled, subscriptionToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callbackNeverToBeCalled = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                done(new Error('Expected this subscription to have been cancelled'));
                            });
                            subscriptionToken = contractWrappers.exchange.subscribe(src_1.ExchangeEvents.LogFill, indexFilterValues, callbackNeverToBeCalled);
                            contractWrappers.exchange.unsubscribe(subscriptionToken);
                            return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, takerTokenFillAmountInBaseUnits, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                        case 1:
                            _a.sent();
                            done();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
    });
    describe('#getOrderHashHexUsingContractCallAsync', function () {
        var makerTokenAddress;
        var takerTokenAddress;
        var makerAddress;
        var takerAddress;
        var fillableAmount = new utils_1.BigNumber(5);
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, makerToken, takerToken;
            return __generator(this, function (_b) {
                makerAddress = userAddresses[1], takerAddress = userAddresses[2];
                _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
                makerTokenAddress = makerToken.address;
                takerTokenAddress = takerToken.address;
                return [2 /*return*/];
            });
        }); });
        it("get's the same hash as the local function", function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder, orderHash, orderHashFromContract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        orderHash = order_utils_1.getOrderHashHex(signedOrder);
                        return [4 /*yield*/, contractWrappers.exchange._getOrderHashHexUsingContractCallAsync(signedOrder)];
                    case 2:
                        orderHashFromContract = _a.sent();
                        expect(orderHash).to.equal(orderHashFromContract);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getZRXTokenAddressAsync', function () {
        it('gets the same token as is in token registry', function () {
            var zrxAddress = contractWrappers.exchange.getZRXTokenAddress();
            var zrxToken = tokenUtils.getProtocolTokenOrThrow();
            expect(zrxAddress).to.equal(zrxToken.address);
        });
    });
    describe('#getLogsAsync', function () {
        var makerTokenAddress;
        var takerTokenAddress;
        var makerAddress;
        var takerAddress;
        var fillableAmount = new utils_1.BigNumber(5);
        var shouldThrowOnInsufficientBalanceOrAllowance = true;
        var blockRange = {
            fromBlock: 0,
            toBlock: types_1.BlockParamLiteral.Latest,
        };
        var txHash;
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, makerToken, takerToken;
            return __generator(this, function (_b) {
                makerAddress = userAddresses[1], takerAddress = userAddresses[2];
                _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
                makerTokenAddress = makerToken.address;
                takerTokenAddress = takerToken.address;
                return [2 /*return*/];
            });
        }); });
        it('should get logs with decoded args emitted by LogFill', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder, eventName, indexFilterValues, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, fillableAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                    case 2:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 3:
                        _a.sent();
                        eventName = src_1.ExchangeEvents.LogFill;
                        indexFilterValues = {};
                        return [4 /*yield*/, contractWrappers.exchange.getLogsAsync(eventName, blockRange, indexFilterValues)];
                    case 4:
                        logs = _a.sent();
                        expect(logs).to.have.length(1);
                        expect(logs[0].event).to.be.equal(eventName);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should only get the logs with the correct event name', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder, differentEventName, indexFilterValues, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, fillableAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                    case 2:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 3:
                        _a.sent();
                        differentEventName = src_1.ExchangeEvents.LogCancel;
                        indexFilterValues = {};
                        return [4 /*yield*/, contractWrappers.exchange.getLogsAsync(differentEventName, blockRange, indexFilterValues)];
                    case 4:
                        logs = _a.sent();
                        expect(logs).to.have.length(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should only get the logs with the correct indexed fields', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedOrder, differentMakerAddress, anotherSignedOrder, eventName, indexFilterValues, logs, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, makerAddress, takerAddress, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, fillableAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                    case 2:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 3:
                        _a.sent();
                        differentMakerAddress = userAddresses[2];
                        return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerTokenAddress, takerTokenAddress, differentMakerAddress, takerAddress, fillableAmount)];
                    case 4:
                        anotherSignedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(anotherSignedOrder, fillableAmount, shouldThrowOnInsufficientBalanceOrAllowance, takerAddress)];
                    case 5:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 6:
                        _a.sent();
                        eventName = src_1.ExchangeEvents.LogFill;
                        indexFilterValues = {
                            maker: differentMakerAddress,
                        };
                        return [4 /*yield*/, contractWrappers.exchange.getLogsAsync(eventName, blockRange, indexFilterValues)];
                    case 7:
                        logs = _a.sent();
                        expect(logs).to.have.length(1);
                        args = logs[0].args;
                        expect(args.maker).to.be.equal(differentMakerAddress);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getOrderStateAsync', function () {
        var maker;
        var taker;
        var makerToken;
        var takerToken;
        var signedOrder;
        var orderState;
        var fillableAmount = web3_wrapper_1.Web3Wrapper.toBaseUnitAmount(new utils_1.BigNumber(5), constants_1.constants.ZRX_DECIMALS);
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        maker = userAddresses[1], taker = userAddresses[2];
                        return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                    case 1:
                        tokens = _b.sent();
                        _a = tokenUtils.getDummyTokens(), makerToken = _a[0], takerToken = _a[1];
                        return [2 /*return*/];
                }
            });
        }); });
        it('should report orderStateValid when order is fillable', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerToken.address, takerToken.address, maker, taker, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.getOrderStateAsync(signedOrder)];
                    case 2:
                        orderState = _a.sent();
                        expect(orderState.isValid).to.be.true();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should report orderStateInvalid when maker allowance set to 0', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fillScenarios.createFillableSignedOrderAsync(makerToken.address, takerToken.address, maker, taker, fillableAmount)];
                    case 1:
                        signedOrder = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.setProxyAllowanceAsync(makerToken.address, maker, new utils_1.BigNumber(0))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.exchange.getOrderStateAsync(signedOrder)];
                    case 3:
                        orderState = _a.sent();
                        expect(orderState.isValid).to.be.false();
                        return [2 /*return*/];
                }
            });
        }); });
    });
}); // tslint:disable:max-file-line-count
//# sourceMappingURL=exchange_wrapper_test.js.map