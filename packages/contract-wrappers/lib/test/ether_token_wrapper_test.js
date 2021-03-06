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
// Since the address depositing/withdrawing ETH/WETH also needs to pay gas costs for the transaction,
// a small amount of ETH will be used to pay this gas cost. We therefore check that the difference between
// the expected balance and actual balance (given the amount of ETH deposited), only deviates by the amount
// required to pay gas costs.
var MAX_REASONABLE_GAS_COST_IN_WEI = 62517;
describe('EtherTokenWrapper', function () {
    var contractWrappers;
    var tokens;
    var userAddresses;
    var addressWithETH;
    var wethContractAddress;
    var depositWeiAmount;
    var decimalPlaces = 7;
    var addressWithoutFunds;
    var gasPrice = new utils_1.BigNumber(1);
    var zeroExConfig = {
        gasPrice: gasPrice,
        networkId: constants_1.constants.TESTRPC_NETWORK_ID,
    };
    var transferAmount = new utils_1.BigNumber(42);
    var allowanceAmount = new utils_1.BigNumber(42);
    var depositAmount = new utils_1.BigNumber(42);
    var withdrawalAmount = new utils_1.BigNumber(42);
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractWrappers = new src_1.ContractWrappers(web3_wrapper_2.provider, zeroExConfig);
                    return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                case 1:
                    tokens = _a.sent();
                    return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getAvailableAddressesAsync()];
                case 2:
                    userAddresses = _a.sent();
                    addressWithETH = userAddresses[0];
                    wethContractAddress = contractWrappers.etherToken.getContractAddressIfExists();
                    depositWeiAmount = web3_wrapper_1.Web3Wrapper.toWei(new utils_1.BigNumber(5));
                    addressWithoutFunds = userAddresses[1];
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
    describe('#getContractAddressIfExists', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            it('should return contract address if connected to a known network', function () {
                var contractAddressIfExists = contractWrappers.etherToken.getContractAddressIfExists();
                expect(contractAddressIfExists).to.not.be.undefined();
            });
            it('should throw if connected to a private network and contract addresses are not specified', function () {
                var UNKNOWN_NETWORK_NETWORK_ID = 10;
                expect(function () {
                    return new src_1.ContractWrappers(web3_wrapper_2.provider, {
                        networkId: UNKNOWN_NETWORK_NETWORK_ID,
                    });
                }).to.throw();
            });
            return [2 /*return*/];
        });
    }); });
    describe('#depositAsync', function () {
        it('should successfully deposit ETH and issue Wrapped ETH tokens', function () { return __awaiter(_this, void 0, void 0, function () {
            var preETHBalance, preWETHBalance, txHash, postETHBalanceInWei, postWETHBalanceInBaseUnits, remainingETHInWei, gasCost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getBalanceInWeiAsync(addressWithETH)];
                    case 1:
                        preETHBalance = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(wethContractAddress, addressWithETH)];
                    case 2:
                        preWETHBalance = _a.sent();
                        expect(preETHBalance).to.be.bignumber.gt(0);
                        expect(preWETHBalance).to.be.bignumber.equal(0);
                        return [4 /*yield*/, contractWrappers.etherToken.depositAsync(wethContractAddress, depositWeiAmount, addressWithETH)];
                    case 3:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getBalanceInWeiAsync(addressWithETH)];
                    case 5:
                        postETHBalanceInWei = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(wethContractAddress, addressWithETH)];
                    case 6:
                        postWETHBalanceInBaseUnits = _a.sent();
                        expect(postWETHBalanceInBaseUnits).to.be.bignumber.equal(depositWeiAmount);
                        remainingETHInWei = preETHBalance.minus(depositWeiAmount);
                        gasCost = remainingETHInWei.minus(postETHBalanceInWei);
                        expect(gasCost).to.be.bignumber.lte(MAX_REASONABLE_GAS_COST_IN_WEI);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw if user has insufficient ETH balance for deposit', function () { return __awaiter(_this, void 0, void 0, function () {
            var preETHBalance, extraETHBalance, overETHBalanceinWei;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getBalanceInWeiAsync(addressWithETH)];
                    case 1:
                        preETHBalance = _a.sent();
                        extraETHBalance = web3_wrapper_1.Web3Wrapper.toWei(new utils_1.BigNumber(5));
                        overETHBalanceinWei = preETHBalance.add(extraETHBalance);
                        return [2 /*return*/, expect(contractWrappers.etherToken.depositAsync(wethContractAddress, overETHBalanceinWei, addressWithETH)).to.be.rejectedWith(src_1.ContractWrappersError.InsufficientEthBalanceForDeposit)];
                }
            });
        }); });
    });
    describe('#withdrawAsync', function () {
        it('should successfully withdraw ETH in return for Wrapped ETH tokens', function () { return __awaiter(_this, void 0, void 0, function () {
            var ETHBalanceInWei, expectedPreETHBalance, preETHBalance, preWETHBalance, gasCost, txHash, postETHBalance, postWETHBalanceInBaseUnits, expectedETHBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getBalanceInWeiAsync(addressWithETH)];
                    case 1:
                        ETHBalanceInWei = _a.sent();
                        return [4 /*yield*/, contractWrappers.etherToken.depositAsync(wethContractAddress, depositWeiAmount, addressWithETH)];
                    case 2:
                        _a.sent();
                        expectedPreETHBalance = ETHBalanceInWei.minus(depositWeiAmount);
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getBalanceInWeiAsync(addressWithETH)];
                    case 3:
                        preETHBalance = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(wethContractAddress, addressWithETH)];
                    case 4:
                        preWETHBalance = _a.sent();
                        gasCost = expectedPreETHBalance.minus(preETHBalance);
                        expect(gasCost).to.be.bignumber.lte(MAX_REASONABLE_GAS_COST_IN_WEI);
                        expect(preWETHBalance).to.be.bignumber.equal(depositWeiAmount);
                        return [4 /*yield*/, contractWrappers.etherToken.withdrawAsync(wethContractAddress, depositWeiAmount, addressWithETH)];
                    case 5:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getBalanceInWeiAsync(addressWithETH)];
                    case 7:
                        postETHBalance = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(wethContractAddress, addressWithETH)];
                    case 8:
                        postWETHBalanceInBaseUnits = _a.sent();
                        expect(postWETHBalanceInBaseUnits).to.be.bignumber.equal(0);
                        expectedETHBalance = preETHBalance.add(depositWeiAmount).round(decimalPlaces);
                        gasCost = expectedETHBalance.minus(postETHBalance);
                        expect(gasCost).to.be.bignumber.lte(MAX_REASONABLE_GAS_COST_IN_WEI);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw if user has insufficient WETH balance for withdrawal', function () { return __awaiter(_this, void 0, void 0, function () {
            var preWETHBalance, overWETHBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.getBalanceAsync(wethContractAddress, addressWithETH)];
                    case 1:
                        preWETHBalance = _a.sent();
                        expect(preWETHBalance).to.be.bignumber.equal(0);
                        overWETHBalance = preWETHBalance.add(999999999);
                        return [2 /*return*/, expect(contractWrappers.etherToken.withdrawAsync(wethContractAddress, overWETHBalance, addressWithETH)).to.be.rejectedWith(src_1.ContractWrappersError.InsufficientWEthBalanceForWithdrawal)];
                }
            });
        }); });
    });
    describe('#subscribe', function () {
        var indexFilterValues = {};
        var etherTokenAddress;
        before(function () {
            var tokenUtils = new token_utils_1.TokenUtils(tokens);
            var etherToken = tokenUtils.getWethTokenOrThrow();
            etherTokenAddress = etherToken.address;
        });
        afterEach(function () {
            contractWrappers.etherToken.unsubscribeAll();
        });
        // Hack: Mocha does not allow a test to be both async and have a `done` callback
        // Since we need to await the receipt of the event in the `subscribe` callback,
        // we do need both. A hack is to make the top-level async fn w/ a done callback and then
        // wrap the rest of the test in an async block
        // Source: https://github.com/mochajs/mocha/issues/2407
        it('Should receive the Transfer event when tokens are transfered', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callback = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                expect(logEvent).to.not.be.undefined();
                                expect(logEvent.isRemoved).to.be.false();
                                expect(logEvent.log.logIndex).to.be.equal(0);
                                expect(logEvent.log.transactionIndex).to.be.equal(0);
                                expect(logEvent.log.blockNumber).to.be.a('number');
                                var args = logEvent.log.args;
                                expect(args._from).to.be.equal(addressWithETH);
                                expect(args._to).to.be.equal(addressWithoutFunds);
                                expect(args._value).to.be.bignumber.equal(transferAmount);
                            });
                            return [4 /*yield*/, contractWrappers.etherToken.depositAsync(etherTokenAddress, transferAmount, addressWithETH)];
                        case 1:
                            _a.sent();
                            contractWrappers.etherToken.subscribe(etherTokenAddress, src_1.EtherTokenEvents.Transfer, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.token.transferAsync(etherTokenAddress, addressWithETH, addressWithoutFunds, transferAmount)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('Should receive the Approval event when allowance is being set', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callback = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                expect(logEvent).to.not.be.undefined();
                                expect(logEvent.isRemoved).to.be.false();
                                var args = logEvent.log.args;
                                expect(args._owner).to.be.equal(addressWithETH);
                                expect(args._spender).to.be.equal(addressWithoutFunds);
                                expect(args._value).to.be.bignumber.equal(allowanceAmount);
                            });
                            contractWrappers.etherToken.subscribe(etherTokenAddress, src_1.EtherTokenEvents.Approval, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(etherTokenAddress, addressWithETH, addressWithoutFunds, allowanceAmount)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('Should receive the Deposit event when ether is being deposited', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callback = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                expect(logEvent).to.not.be.undefined();
                                expect(logEvent.isRemoved).to.be.false();
                                var args = logEvent.log.args;
                                expect(args._owner).to.be.equal(addressWithETH);
                                expect(args._value).to.be.bignumber.equal(depositAmount);
                            });
                            contractWrappers.etherToken.subscribe(etherTokenAddress, src_1.EtherTokenEvents.Deposit, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.etherToken.depositAsync(etherTokenAddress, depositAmount, addressWithETH)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('Should receive the Withdrawal event when ether is being withdrawn', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callback = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                expect(logEvent).to.not.be.undefined();
                                expect(logEvent.isRemoved).to.be.false();
                                var args = logEvent.log.args;
                                expect(args._owner).to.be.equal(addressWithETH);
                                expect(args._value).to.be.bignumber.equal(depositAmount);
                            });
                            return [4 /*yield*/, contractWrappers.etherToken.depositAsync(etherTokenAddress, depositAmount, addressWithETH)];
                        case 1:
                            _a.sent();
                            contractWrappers.etherToken.subscribe(etherTokenAddress, src_1.EtherTokenEvents.Withdrawal, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.etherToken.withdrawAsync(etherTokenAddress, withdrawalAmount, addressWithETH)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('should cancel outstanding subscriptions when ZeroEx.setProvider is called', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callbackNeverToBeCalled, callbackToBeCalled;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callbackNeverToBeCalled = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                done(new Error('Expected this subscription to have been cancelled'));
                            });
                            contractWrappers.etherToken.subscribe(etherTokenAddress, src_1.EtherTokenEvents.Transfer, indexFilterValues, callbackNeverToBeCalled);
                            callbackToBeCalled = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)();
                            contractWrappers.setProvider(web3_wrapper_2.provider, constants_1.constants.TESTRPC_NETWORK_ID);
                            return [4 /*yield*/, contractWrappers.etherToken.depositAsync(etherTokenAddress, transferAmount, addressWithETH)];
                        case 1:
                            _a.sent();
                            contractWrappers.etherToken.subscribe(etherTokenAddress, src_1.EtherTokenEvents.Transfer, indexFilterValues, callbackToBeCalled);
                            return [4 /*yield*/, contractWrappers.token.transferAsync(etherTokenAddress, addressWithETH, addressWithoutFunds, transferAmount)];
                        case 2:
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
                            return [4 /*yield*/, contractWrappers.etherToken.depositAsync(etherTokenAddress, transferAmount, addressWithETH)];
                        case 1:
                            _a.sent();
                            subscriptionToken = contractWrappers.etherToken.subscribe(etherTokenAddress, src_1.EtherTokenEvents.Transfer, indexFilterValues, callbackNeverToBeCalled);
                            contractWrappers.etherToken.unsubscribe(subscriptionToken);
                            return [4 /*yield*/, contractWrappers.token.transferAsync(etherTokenAddress, addressWithETH, addressWithoutFunds, transferAmount)];
                        case 2:
                            _a.sent();
                            done();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
    });
    describe('#getLogsAsync', function () {
        var etherTokenAddress;
        var tokenTransferProxyAddress;
        var blockRange = {
            fromBlock: 0,
            toBlock: src_1.BlockParamLiteral.Latest,
        };
        var txHash;
        before(function () {
            addressWithETH = userAddresses[0];
            var tokenUtils = new token_utils_1.TokenUtils(tokens);
            var etherToken = tokenUtils.getWethTokenOrThrow();
            etherTokenAddress = etherToken.address;
            tokenTransferProxyAddress = contractWrappers.proxy.getContractAddress();
        });
        it('should get logs with decoded args emitted by Approval', function () { return __awaiter(_this, void 0, void 0, function () {
            var eventName, indexFilterValues, logs, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(etherTokenAddress, addressWithETH)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        eventName = src_1.EtherTokenEvents.Approval;
                        indexFilterValues = {};
                        return [4 /*yield*/, contractWrappers.etherToken.getLogsAsync(etherTokenAddress, eventName, blockRange, indexFilterValues)];
                    case 3:
                        logs = _a.sent();
                        expect(logs).to.have.length(1);
                        args = logs[0].args;
                        expect(logs[0].event).to.be.equal(eventName);
                        expect(args._owner).to.be.equal(addressWithETH);
                        expect(args._spender).to.be.equal(tokenTransferProxyAddress);
                        expect(args._value).to.be.bignumber.equal(contractWrappers.token.UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get logs with decoded args emitted by Deposit', function () { return __awaiter(_this, void 0, void 0, function () {
            var eventName, indexFilterValues, logs, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.etherToken.depositAsync(etherTokenAddress, depositAmount, addressWithETH)];
                    case 1:
                        _a.sent();
                        eventName = src_1.EtherTokenEvents.Deposit;
                        indexFilterValues = {};
                        return [4 /*yield*/, contractWrappers.etherToken.getLogsAsync(etherTokenAddress, eventName, blockRange, indexFilterValues)];
                    case 2:
                        logs = _a.sent();
                        expect(logs).to.have.length(1);
                        args = logs[0].args;
                        expect(logs[0].event).to.be.equal(eventName);
                        expect(args._owner).to.be.equal(addressWithETH);
                        expect(args._value).to.be.bignumber.equal(depositAmount);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should only get the logs with the correct event name', function () { return __awaiter(_this, void 0, void 0, function () {
            var differentEventName, indexFilterValues, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(etherTokenAddress, addressWithETH)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        differentEventName = src_1.EtherTokenEvents.Transfer;
                        indexFilterValues = {};
                        return [4 /*yield*/, contractWrappers.etherToken.getLogsAsync(etherTokenAddress, differentEventName, blockRange, indexFilterValues)];
                    case 3:
                        logs = _a.sent();
                        expect(logs).to.have.length(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should only get the logs with the correct indexed fields', function () { return __awaiter(_this, void 0, void 0, function () {
            var eventName, indexFilterValues, logs, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(etherTokenAddress, addressWithETH)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(etherTokenAddress, addressWithoutFunds)];
                    case 3:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 4:
                        _a.sent();
                        eventName = src_1.EtherTokenEvents.Approval;
                        indexFilterValues = {
                            _owner: addressWithETH,
                        };
                        return [4 /*yield*/, contractWrappers.etherToken.getLogsAsync(etherTokenAddress, eventName, blockRange, indexFilterValues)];
                    case 5:
                        logs = _a.sent();
                        expect(logs).to.have.length(1);
                        args = logs[0].args;
                        expect(args._owner).to.be.equal(addressWithETH);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=ether_token_wrapper_test.js.map