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
var subproviders_1 = require("@0xproject/subproviders");
var utils_1 = require("@0xproject/utils");
var chai = require("chai");
require("make-promises-safe");
require("mocha");
var Web3ProviderEngine = require("web3-provider-engine");
var src_1 = require("../src");
var chai_setup_1 = require("./utils/chai_setup");
var constants_1 = require("./utils/constants");
var token_utils_1 = require("./utils/token_utils");
var web3_wrapper_1 = require("./utils/web3_wrapper");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(web3_wrapper_1.web3Wrapper);
describe('TokenWrapper', function () {
    var contractWrappers;
    var userAddresses;
    var tokens;
    var tokenUtils;
    var coinbase;
    var addressWithoutFunds;
    var config = {
        networkId: constants_1.constants.TESTRPC_NETWORK_ID,
    };
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractWrappers = new src_1.ContractWrappers(web3_wrapper_1.provider, config);
                    return [4 /*yield*/, web3_wrapper_1.web3Wrapper.getAvailableAddressesAsync()];
                case 1:
                    userAddresses = _a.sent();
                    return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                case 2:
                    tokens = _a.sent();
                    tokenUtils = new token_utils_1.TokenUtils(tokens);
                    coinbase = userAddresses[0];
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
    describe('#transferAsync', function () {
        var token;
        var transferAmount;
        before(function () {
            token = tokens[0];
            transferAmount = new utils_1.BigNumber(42);
        });
        it('should successfully transfer tokens', function () { return __awaiter(_this, void 0, void 0, function () {
            var fromAddress, toAddress, preBalance, postBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromAddress = coinbase;
                        toAddress = addressWithoutFunds;
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(token.address, toAddress)];
                    case 1:
                        preBalance = _a.sent();
                        expect(preBalance).to.be.bignumber.equal(0);
                        return [4 /*yield*/, contractWrappers.token.transferAsync(token.address, fromAddress, toAddress, transferAmount)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(token.address, toAddress)];
                    case 3:
                        postBalance = _a.sent();
                        return [2 /*return*/, expect(postBalance).to.be.bignumber.equal(transferAmount)];
                }
            });
        }); });
        it('should fail to transfer tokens if fromAddress has an insufficient balance', function () { return __awaiter(_this, void 0, void 0, function () {
            var fromAddress, toAddress;
            return __generator(this, function (_a) {
                fromAddress = addressWithoutFunds;
                toAddress = coinbase;
                return [2 /*return*/, expect(contractWrappers.token.transferAsync(token.address, fromAddress, toAddress, transferAmount)).to.be.rejectedWith(src_1.ContractWrappersError.InsufficientBalanceForTransfer)];
            });
        }); });
        it('should throw a CONTRACT_DOES_NOT_EXIST error for a non-existent token contract', function () { return __awaiter(_this, void 0, void 0, function () {
            var nonExistentTokenAddress, fromAddress, toAddress;
            return __generator(this, function (_a) {
                nonExistentTokenAddress = '0x9dd402f14d67e001d8efbe6583e51bf9706aa065';
                fromAddress = coinbase;
                toAddress = coinbase;
                return [2 /*return*/, expect(contractWrappers.token.transferAsync(nonExistentTokenAddress, fromAddress, toAddress, transferAmount)).to.be.rejectedWith(src_1.ContractWrappersError.TokenContractDoesNotExist)];
            });
        }); });
    });
    describe('#transferFromAsync', function () {
        var token;
        var toAddress;
        var senderAddress;
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                token = tokens[0];
                toAddress = addressWithoutFunds;
                senderAddress = userAddresses[2];
                return [2 /*return*/];
            });
        }); });
        it('should fail to transfer tokens if fromAddress has insufficient allowance set', function () { return __awaiter(_this, void 0, void 0, function () {
            var fromAddress, transferAmount, fromAddressBalance, fromAddressAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromAddress = coinbase;
                        transferAmount = new utils_1.BigNumber(42);
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(token.address, fromAddress)];
                    case 1:
                        fromAddressBalance = _a.sent();
                        expect(fromAddressBalance).to.be.bignumber.greaterThan(transferAmount);
                        return [4 /*yield*/, contractWrappers.token.getAllowanceAsync(token.address, fromAddress, toAddress)];
                    case 2:
                        fromAddressAllowance = _a.sent();
                        expect(fromAddressAllowance).to.be.bignumber.equal(0);
                        return [2 /*return*/, expect(contractWrappers.token.transferFromAsync(token.address, fromAddress, toAddress, senderAddress, transferAmount)).to.be.rejectedWith(src_1.ContractWrappersError.InsufficientAllowanceForTransfer)];
                }
            });
        }); });
        it('[regression] should fail to transfer tokens if set allowance for toAddress instead of senderAddress', function () { return __awaiter(_this, void 0, void 0, function () {
            var fromAddress, transferAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromAddress = coinbase;
                        transferAmount = new utils_1.BigNumber(42);
                        return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(token.address, fromAddress, toAddress, transferAmount)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, expect(contractWrappers.token.transferFromAsync(token.address, fromAddress, toAddress, senderAddress, transferAmount)).to.be.rejectedWith(src_1.ContractWrappersError.InsufficientAllowanceForTransfer)];
                }
            });
        }); });
        it('should fail to transfer tokens if fromAddress has insufficient balance', function () { return __awaiter(_this, void 0, void 0, function () {
            var fromAddress, transferAmount, fromAddressBalance, fromAddressAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromAddress = addressWithoutFunds;
                        transferAmount = new utils_1.BigNumber(42);
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(token.address, fromAddress)];
                    case 1:
                        fromAddressBalance = _a.sent();
                        expect(fromAddressBalance).to.be.bignumber.equal(0);
                        return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(token.address, fromAddress, senderAddress, transferAmount)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getAllowanceAsync(token.address, fromAddress, senderAddress)];
                    case 3:
                        fromAddressAllowance = _a.sent();
                        expect(fromAddressAllowance).to.be.bignumber.equal(transferAmount);
                        return [2 /*return*/, expect(contractWrappers.token.transferFromAsync(token.address, fromAddress, toAddress, senderAddress, transferAmount)).to.be.rejectedWith(src_1.ContractWrappersError.InsufficientBalanceForTransfer)];
                }
            });
        }); });
        it('should successfully transfer tokens', function () { return __awaiter(_this, void 0, void 0, function () {
            var fromAddress, preBalance, transferAmount, postBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromAddress = coinbase;
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(token.address, toAddress)];
                    case 1:
                        preBalance = _a.sent();
                        expect(preBalance).to.be.bignumber.equal(0);
                        transferAmount = new utils_1.BigNumber(42);
                        return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(token.address, fromAddress, senderAddress, transferAmount)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.transferFromAsync(token.address, fromAddress, toAddress, senderAddress, transferAmount)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getBalanceAsync(token.address, toAddress)];
                    case 4:
                        postBalance = _a.sent();
                        return [2 /*return*/, expect(postBalance).to.be.bignumber.equal(transferAmount)];
                }
            });
        }); });
        it('should throw a CONTRACT_DOES_NOT_EXIST error for a non-existent token contract', function () { return __awaiter(_this, void 0, void 0, function () {
            var fromAddress, nonExistentTokenAddress;
            return __generator(this, function (_a) {
                fromAddress = coinbase;
                nonExistentTokenAddress = '0x9dd402f14d67e001d8efbe6583e51bf9706aa065';
                return [2 /*return*/, expect(contractWrappers.token.transferFromAsync(nonExistentTokenAddress, fromAddress, toAddress, senderAddress, new utils_1.BigNumber(42))).to.be.rejectedWith(src_1.ContractWrappersError.TokenContractDoesNotExist)];
            });
        }); });
    });
    describe('#getBalanceAsync', function () {
        describe('With provider with accounts', function () {
            it('should return the balance for an existing ERC20 token', function () { return __awaiter(_this, void 0, void 0, function () {
                var token, ownerAddress, balance, expectedBalance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = tokens[0];
                            ownerAddress = coinbase;
                            return [4 /*yield*/, contractWrappers.token.getBalanceAsync(token.address, ownerAddress)];
                        case 1:
                            balance = _a.sent();
                            expectedBalance = new utils_1.BigNumber('1000000000000000000000000000');
                            return [2 /*return*/, expect(balance).to.be.bignumber.equal(expectedBalance)];
                    }
                });
            }); });
            it('should throw a CONTRACT_DOES_NOT_EXIST error for a non-existent token contract', function () { return __awaiter(_this, void 0, void 0, function () {
                var nonExistentTokenAddress, ownerAddress;
                return __generator(this, function (_a) {
                    nonExistentTokenAddress = '0x9dd402f14d67e001d8efbe6583e51bf9706aa065';
                    ownerAddress = coinbase;
                    return [2 /*return*/, expect(contractWrappers.token.getBalanceAsync(nonExistentTokenAddress, ownerAddress)).to.be.rejectedWith(src_1.ContractWrappersError.TokenContractDoesNotExist)];
                });
            }); });
            it('should return a balance of 0 for a non-existent owner address', function () { return __awaiter(_this, void 0, void 0, function () {
                var token, nonExistentOwner, balance, expectedBalance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = tokens[0];
                            nonExistentOwner = '0x198c6ad858f213fb31b6fe809e25040e6b964593';
                            return [4 /*yield*/, contractWrappers.token.getBalanceAsync(token.address, nonExistentOwner)];
                        case 1:
                            balance = _a.sent();
                            expectedBalance = new utils_1.BigNumber(0);
                            return [2 /*return*/, expect(balance).to.be.bignumber.equal(expectedBalance)];
                    }
                });
            }); });
        });
        describe('With provider without accounts', function () {
            var zeroExContractWithoutAccounts;
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                var hasAddresses, emptyWalletProvider;
                return __generator(this, function (_a) {
                    hasAddresses = false;
                    emptyWalletProvider = addEmptyWalletSubprovider(web3_wrapper_1.provider);
                    zeroExContractWithoutAccounts = new src_1.ContractWrappers(emptyWalletProvider, config);
                    return [2 /*return*/];
                });
            }); });
            it('should return balance even when called with provider instance without addresses', function () { return __awaiter(_this, void 0, void 0, function () {
                var token, ownerAddress, balance, expectedBalance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = tokens[0];
                            ownerAddress = coinbase;
                            return [4 /*yield*/, zeroExContractWithoutAccounts.token.getBalanceAsync(token.address, ownerAddress)];
                        case 1:
                            balance = _a.sent();
                            expectedBalance = new utils_1.BigNumber('1000000000000000000000000000');
                            return [2 /*return*/, expect(balance).to.be.bignumber.equal(expectedBalance)];
                    }
                });
            }); });
        });
    });
    describe('#setAllowanceAsync', function () {
        it("should set the spender's allowance", function () { return __awaiter(_this, void 0, void 0, function () {
            var token, ownerAddress, spenderAddress, allowanceBeforeSet, expectedAllowanceBeforeAllowanceSet, amountInBaseUnits, allowanceAfterSet, expectedAllowanceAfterAllowanceSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = tokens[0];
                        ownerAddress = coinbase;
                        spenderAddress = addressWithoutFunds;
                        return [4 /*yield*/, contractWrappers.token.getAllowanceAsync(token.address, ownerAddress, spenderAddress)];
                    case 1:
                        allowanceBeforeSet = _a.sent();
                        expectedAllowanceBeforeAllowanceSet = new utils_1.BigNumber(0);
                        expect(allowanceBeforeSet).to.be.bignumber.equal(expectedAllowanceBeforeAllowanceSet);
                        amountInBaseUnits = new utils_1.BigNumber(50);
                        return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(token.address, ownerAddress, spenderAddress, amountInBaseUnits)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getAllowanceAsync(token.address, ownerAddress, spenderAddress)];
                    case 3:
                        allowanceAfterSet = _a.sent();
                        expectedAllowanceAfterAllowanceSet = amountInBaseUnits;
                        return [2 /*return*/, expect(allowanceAfterSet).to.be.bignumber.equal(expectedAllowanceAfterAllowanceSet)];
                }
            });
        }); });
    });
    describe('#setUnlimitedAllowanceAsync', function () {
        it("should set the unlimited spender's allowance", function () { return __awaiter(_this, void 0, void 0, function () {
            var token, ownerAddress, spenderAddress, allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = tokens[0];
                        ownerAddress = coinbase;
                        spenderAddress = addressWithoutFunds;
                        return [4 /*yield*/, contractWrappers.token.setUnlimitedAllowanceAsync(token.address, ownerAddress, spenderAddress)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getAllowanceAsync(token.address, ownerAddress, spenderAddress)];
                    case 2:
                        allowance = _a.sent();
                        return [2 /*return*/, expect(allowance).to.be.bignumber.equal(contractWrappers.token.UNLIMITED_ALLOWANCE_IN_BASE_UNITS)];
                }
            });
        }); });
        it('should reduce the gas cost for transfers including tokens with unlimited allowance support', function () { return __awaiter(_this, void 0, void 0, function () {
            var transferAmount, zrx, userWithNormalAllowance, userWithUnlimitedAllowance, initBalanceWithNormalAllowance, initBalanceWithUnlimitedAllowance, finalBalanceWithNormalAllowance, finalBalanceWithUnlimitedAllowance, normalGasCost, unlimitedGasCost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transferAmount = new utils_1.BigNumber(5);
                        zrx = tokenUtils.getProtocolTokenOrThrow();
                        userWithNormalAllowance = userAddresses[1], userWithUnlimitedAllowance = userAddresses[2];
                        return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(zrx.address, coinbase, userWithNormalAllowance, transferAmount)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.setUnlimitedAllowanceAsync(zrx.address, coinbase, userWithUnlimitedAllowance)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.getBalanceInWeiAsync(userWithNormalAllowance)];
                    case 3:
                        initBalanceWithNormalAllowance = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.getBalanceInWeiAsync(userWithUnlimitedAllowance)];
                    case 4:
                        initBalanceWithUnlimitedAllowance = _a.sent();
                        return [4 /*yield*/, contractWrappers.token.transferFromAsync(zrx.address, coinbase, userWithNormalAllowance, userWithNormalAllowance, transferAmount)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.transferFromAsync(zrx.address, coinbase, userWithUnlimitedAllowance, userWithUnlimitedAllowance, transferAmount)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.getBalanceInWeiAsync(userWithNormalAllowance)];
                    case 7:
                        finalBalanceWithNormalAllowance = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.getBalanceInWeiAsync(userWithUnlimitedAllowance)];
                    case 8:
                        finalBalanceWithUnlimitedAllowance = _a.sent();
                        normalGasCost = initBalanceWithNormalAllowance.minus(finalBalanceWithNormalAllowance);
                        unlimitedGasCost = initBalanceWithUnlimitedAllowance.minus(finalBalanceWithUnlimitedAllowance);
                        // In theory the gas cost with unlimited allowance should be smaller, but with testrpc it's actually bigger.
                        // This needs to be investigated in ethereumjs-vm. This test is essentially a repro.
                        // TODO: Make this test pass with inverted assertion.
                        expect(unlimitedGasCost.toNumber()).to.be.gt(normalGasCost.toNumber());
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getAllowanceAsync', function () {
        describe('With provider with accounts', function () {
            it('should get the proxy allowance', function () { return __awaiter(_this, void 0, void 0, function () {
                var token, ownerAddress, spenderAddress, amountInBaseUnits, allowance, expectedAllowance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = tokens[0];
                            ownerAddress = coinbase;
                            spenderAddress = addressWithoutFunds;
                            amountInBaseUnits = new utils_1.BigNumber(50);
                            return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(token.address, ownerAddress, spenderAddress, amountInBaseUnits)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, contractWrappers.token.getAllowanceAsync(token.address, ownerAddress, spenderAddress)];
                        case 2:
                            allowance = _a.sent();
                            expectedAllowance = amountInBaseUnits;
                            return [2 /*return*/, expect(allowance).to.be.bignumber.equal(expectedAllowance)];
                    }
                });
            }); });
            it('should return 0 if no allowance set yet', function () { return __awaiter(_this, void 0, void 0, function () {
                var token, ownerAddress, spenderAddress, allowance, expectedAllowance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = tokens[0];
                            ownerAddress = coinbase;
                            spenderAddress = addressWithoutFunds;
                            return [4 /*yield*/, contractWrappers.token.getAllowanceAsync(token.address, ownerAddress, spenderAddress)];
                        case 1:
                            allowance = _a.sent();
                            expectedAllowance = new utils_1.BigNumber(0);
                            return [2 /*return*/, expect(allowance).to.be.bignumber.equal(expectedAllowance)];
                    }
                });
            }); });
        });
        describe('With provider without accounts', function () {
            var zeroExContractWithoutAccounts;
            before(function () { return __awaiter(_this, void 0, void 0, function () {
                var hasAddresses, emptyWalletProvider;
                return __generator(this, function (_a) {
                    hasAddresses = false;
                    emptyWalletProvider = addEmptyWalletSubprovider(web3_wrapper_1.provider);
                    zeroExContractWithoutAccounts = new src_1.ContractWrappers(emptyWalletProvider, config);
                    return [2 /*return*/];
                });
            }); });
            it('should get the proxy allowance', function () { return __awaiter(_this, void 0, void 0, function () {
                var token, ownerAddress, spenderAddress, amountInBaseUnits, allowance, expectedAllowance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = tokens[0];
                            ownerAddress = coinbase;
                            spenderAddress = addressWithoutFunds;
                            amountInBaseUnits = new utils_1.BigNumber(50);
                            return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(token.address, ownerAddress, spenderAddress, amountInBaseUnits)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, zeroExContractWithoutAccounts.token.getAllowanceAsync(token.address, ownerAddress, spenderAddress)];
                        case 2:
                            allowance = _a.sent();
                            expectedAllowance = amountInBaseUnits;
                            return [2 /*return*/, expect(allowance).to.be.bignumber.equal(expectedAllowance)];
                    }
                });
            }); });
        });
    });
    describe('#getProxyAllowanceAsync', function () {
        it('should get the proxy allowance', function () { return __awaiter(_this, void 0, void 0, function () {
            var token, ownerAddress, amountInBaseUnits, allowance, expectedAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = tokens[0];
                        ownerAddress = coinbase;
                        amountInBaseUnits = new utils_1.BigNumber(50);
                        return [4 /*yield*/, contractWrappers.token.setProxyAllowanceAsync(token.address, ownerAddress, amountInBaseUnits)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getProxyAllowanceAsync(token.address, ownerAddress)];
                    case 2:
                        allowance = _a.sent();
                        expectedAllowance = amountInBaseUnits;
                        return [2 /*return*/, expect(allowance).to.be.bignumber.equal(expectedAllowance)];
                }
            });
        }); });
    });
    describe('#setProxyAllowanceAsync', function () {
        it('should set the proxy allowance', function () { return __awaiter(_this, void 0, void 0, function () {
            var token, ownerAddress, allowanceBeforeSet, expectedAllowanceBeforeAllowanceSet, amountInBaseUnits, allowanceAfterSet, expectedAllowanceAfterAllowanceSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = tokens[0];
                        ownerAddress = coinbase;
                        return [4 /*yield*/, contractWrappers.token.getProxyAllowanceAsync(token.address, ownerAddress)];
                    case 1:
                        allowanceBeforeSet = _a.sent();
                        expectedAllowanceBeforeAllowanceSet = new utils_1.BigNumber(0);
                        expect(allowanceBeforeSet).to.be.bignumber.equal(expectedAllowanceBeforeAllowanceSet);
                        amountInBaseUnits = new utils_1.BigNumber(50);
                        return [4 /*yield*/, contractWrappers.token.setProxyAllowanceAsync(token.address, ownerAddress, amountInBaseUnits)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getProxyAllowanceAsync(token.address, ownerAddress)];
                    case 3:
                        allowanceAfterSet = _a.sent();
                        expectedAllowanceAfterAllowanceSet = amountInBaseUnits;
                        return [2 /*return*/, expect(allowanceAfterSet).to.be.bignumber.equal(expectedAllowanceAfterAllowanceSet)];
                }
            });
        }); });
    });
    describe('#setUnlimitedProxyAllowanceAsync', function () {
        it('should set the unlimited proxy allowance', function () { return __awaiter(_this, void 0, void 0, function () {
            var token, ownerAddress, allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = tokens[0];
                        ownerAddress = coinbase;
                        return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(token.address, ownerAddress)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.getProxyAllowanceAsync(token.address, ownerAddress)];
                    case 2:
                        allowance = _a.sent();
                        return [2 /*return*/, expect(allowance).to.be.bignumber.equal(contractWrappers.token.UNLIMITED_ALLOWANCE_IN_BASE_UNITS)];
                }
            });
        }); });
    });
    describe('#subscribe', function () {
        var indexFilterValues = {};
        var tokenAddress;
        var transferAmount = new utils_1.BigNumber(42);
        var allowanceAmount = new utils_1.BigNumber(42);
        before(function () {
            var token = tokens[0];
            tokenAddress = token.address;
        });
        afterEach(function () {
            contractWrappers.token.unsubscribeAll();
        });
        // Hack: Mocha does not allow a test to be both async and have a `done` callback
        // Since we need to await the receipt of the event in the `subscribe` callback,
        // we do need both. A hack is to make the top-level a sync fn w/ a done callback and then
        // wrap the rest of the test in an async block
        // Source: https://github.com/mochajs/mocha/issues/2407
        it('Should receive the Transfer event when tokens are transfered', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callback;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callback = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                expect(logEvent.isRemoved).to.be.false();
                                expect(logEvent.log.logIndex).to.be.equal(0);
                                expect(logEvent.log.transactionIndex).to.be.equal(0);
                                expect(logEvent.log.blockNumber).to.be.a('number');
                                var args = logEvent.log.args;
                                expect(args._from).to.be.equal(coinbase);
                                expect(args._to).to.be.equal(addressWithoutFunds);
                                expect(args._value).to.be.bignumber.equal(transferAmount);
                            });
                            contractWrappers.token.subscribe(tokenAddress, src_1.TokenEvents.Transfer, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.token.transferAsync(tokenAddress, coinbase, addressWithoutFunds, transferAmount)];
                        case 1:
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
                                expect(args._owner).to.be.equal(coinbase);
                                expect(args._spender).to.be.equal(addressWithoutFunds);
                                expect(args._value).to.be.bignumber.equal(allowanceAmount);
                            });
                            contractWrappers.token.subscribe(tokenAddress, src_1.TokenEvents.Approval, indexFilterValues, callback);
                            return [4 /*yield*/, contractWrappers.token.setAllowanceAsync(tokenAddress, coinbase, addressWithoutFunds, allowanceAmount)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
        it('Outstanding subscriptions are cancelled when contractWrappers.setProvider called', function (done) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var callbackNeverToBeCalled, callbackToBeCalled;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callbackNeverToBeCalled = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)(function (logEvent) {
                                done(new Error('Expected this subscription to have been cancelled'));
                            });
                            contractWrappers.token.subscribe(tokenAddress, src_1.TokenEvents.Transfer, indexFilterValues, callbackNeverToBeCalled);
                            callbackToBeCalled = dev_utils_1.callbackErrorReporter.reportNodeCallbackErrors(done)();
                            contractWrappers.setProvider(web3_wrapper_1.provider, constants_1.constants.TESTRPC_NETWORK_ID);
                            contractWrappers.token.subscribe(tokenAddress, src_1.TokenEvents.Transfer, indexFilterValues, callbackToBeCalled);
                            return [4 /*yield*/, contractWrappers.token.transferAsync(tokenAddress, coinbase, addressWithoutFunds, transferAmount)];
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
                            subscriptionToken = contractWrappers.token.subscribe(tokenAddress, src_1.TokenEvents.Transfer, indexFilterValues, callbackNeverToBeCalled);
                            contractWrappers.token.unsubscribe(subscriptionToken);
                            return [4 /*yield*/, contractWrappers.token.transferAsync(tokenAddress, coinbase, addressWithoutFunds, transferAmount)];
                        case 1:
                            _a.sent();
                            done();
                            return [2 /*return*/];
                    }
                });
            }); })().catch(done);
        });
    });
    describe('#getLogsAsync', function () {
        var tokenAddress;
        var tokenTransferProxyAddress;
        var blockRange = {
            fromBlock: 0,
            toBlock: src_1.BlockParamLiteral.Latest,
        };
        var txHash;
        before(function () {
            var token = tokens[0];
            tokenAddress = token.address;
            tokenTransferProxyAddress = contractWrappers.proxy.getContractAddress();
        });
        it('should get logs with decoded args emitted by Approval', function () { return __awaiter(_this, void 0, void 0, function () {
            var eventName, indexFilterValues, logs, args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(tokenAddress, coinbase)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        eventName = src_1.TokenEvents.Approval;
                        indexFilterValues = {};
                        return [4 /*yield*/, contractWrappers.token.getLogsAsync(tokenAddress, eventName, blockRange, indexFilterValues)];
                    case 3:
                        logs = _a.sent();
                        expect(logs).to.have.length(1);
                        args = logs[0].args;
                        expect(logs[0].event).to.be.equal(eventName);
                        expect(args._owner).to.be.equal(coinbase);
                        expect(args._spender).to.be.equal(tokenTransferProxyAddress);
                        expect(args._value).to.be.bignumber.equal(contractWrappers.token.UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should only get the logs with the correct event name', function () { return __awaiter(_this, void 0, void 0, function () {
            var differentEventName, indexFilterValues, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(tokenAddress, coinbase)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        differentEventName = src_1.TokenEvents.Transfer;
                        indexFilterValues = {};
                        return [4 /*yield*/, contractWrappers.token.getLogsAsync(tokenAddress, differentEventName, blockRange, indexFilterValues)];
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
                    case 0: return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(tokenAddress, coinbase)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(tokenAddress, addressWithoutFunds)];
                    case 3:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 4:
                        _a.sent();
                        eventName = src_1.TokenEvents.Approval;
                        indexFilterValues = {
                            _owner: coinbase,
                        };
                        return [4 /*yield*/, contractWrappers.token.getLogsAsync(tokenAddress, eventName, blockRange, indexFilterValues)];
                    case 5:
                        logs = _a.sent();
                        expect(logs).to.have.length(1);
                        args = logs[0].args;
                        expect(args._owner).to.be.equal(coinbase);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
// tslint:disable:max-file-line-count
function addEmptyWalletSubprovider(p) {
    var providerEngine = new Web3ProviderEngine();
    providerEngine.addProvider(new subproviders_1.EmptyWalletSubprovider());
    var currentSubproviders = p._providers;
    for (var _i = 0, currentSubproviders_1 = currentSubproviders; _i < currentSubproviders_1.length; _i++) {
        var subprovider = currentSubproviders_1[_i];
        providerEngine.addProvider(subprovider);
    }
    providerEngine.start();
    return providerEngine;
}
//# sourceMappingURL=token_wrapper_test.js.map