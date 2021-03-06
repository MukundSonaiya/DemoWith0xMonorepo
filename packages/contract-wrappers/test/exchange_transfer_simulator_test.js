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
var types_1 = require("@0xproject/types");
var utils_1 = require("@0xproject/utils");
var chai = require("chai");
require("make-promises-safe");
var src_1 = require("../src");
var types_2 = require("../src/types");
var exchange_transfer_simulator_1 = require("../src/utils/exchange_transfer_simulator");
var chai_setup_1 = require("./utils/chai_setup");
var constants_1 = require("./utils/constants");
var web3_wrapper_1 = require("./utils/web3_wrapper");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(web3_wrapper_1.web3Wrapper);
describe('ExchangeTransferSimulator', function () {
    var config = {
        networkId: constants_1.constants.TESTRPC_NETWORK_ID,
    };
    var contractWrappers = new src_1.ContractWrappers(web3_wrapper_1.provider, config);
    var transferAmount = new utils_1.BigNumber(5);
    var userAddresses;
    var tokens;
    var coinbase;
    var sender;
    var recipient;
    var exampleTokenAddress;
    var exchangeTransferSimulator;
    var txHash;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3_wrapper_1.web3Wrapper.getAvailableAddressesAsync()];
                case 1:
                    userAddresses = _a.sent();
                    coinbase = userAddresses[0], sender = userAddresses[1], recipient = userAddresses[2];
                    return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                case 2:
                    tokens = _a.sent();
                    exampleTokenAddress = tokens[0].address;
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
    describe('#transferFromAsync', function () {
        beforeEach(function () {
            exchangeTransferSimulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(contractWrappers.token, types_1.BlockParamLiteral.Latest);
        });
        it("throws if the user doesn't have enough allowance", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, expect(exchangeTransferSimulator.transferFromAsync(exampleTokenAddress, sender, recipient, transferAmount, types_2.TradeSide.Taker, types_2.TransferType.Trade)).to.be.rejectedWith(src_1.ExchangeContractErrs.InsufficientTakerAllowance)];
            });
        }); });
        it("throws if the user doesn't have enough balance", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.setProxyAllowanceAsync(exampleTokenAddress, sender, transferAmount)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, expect(exchangeTransferSimulator.transferFromAsync(exampleTokenAddress, sender, recipient, transferAmount, types_2.TradeSide.Maker, types_2.TransferType.Trade)).to.be.rejectedWith(src_1.ExchangeContractErrs.InsufficientMakerBalance)];
                }
            });
        }); });
        it('updates balances and proxyAllowance after transfer', function () { return __awaiter(_this, void 0, void 0, function () {
            var store, senderBalance, recipientBalance, senderProxyAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.transferAsync(exampleTokenAddress, coinbase, sender, transferAmount)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.setProxyAllowanceAsync(exampleTokenAddress, sender, transferAmount)];
                    case 3:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, exchangeTransferSimulator.transferFromAsync(exampleTokenAddress, sender, recipient, transferAmount, types_2.TradeSide.Taker, types_2.TransferType.Trade)];
                    case 5:
                        _a.sent();
                        store = exchangeTransferSimulator._store;
                        return [4 /*yield*/, store.getBalanceAsync(exampleTokenAddress, sender)];
                    case 6:
                        senderBalance = _a.sent();
                        return [4 /*yield*/, store.getBalanceAsync(exampleTokenAddress, recipient)];
                    case 7:
                        recipientBalance = _a.sent();
                        return [4 /*yield*/, store.getProxyAllowanceAsync(exampleTokenAddress, sender)];
                    case 8:
                        senderProxyAllowance = _a.sent();
                        expect(senderBalance).to.be.bignumber.equal(0);
                        expect(recipientBalance).to.be.bignumber.equal(transferAmount);
                        expect(senderProxyAllowance).to.be.bignumber.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("doesn't update proxyAllowance after transfer if unlimited", function () { return __awaiter(_this, void 0, void 0, function () {
            var store, senderBalance, recipientBalance, senderProxyAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.token.transferAsync(exampleTokenAddress, coinbase, sender, transferAmount)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, contractWrappers.token.setUnlimitedProxyAllowanceAsync(exampleTokenAddress, sender)];
                    case 3:
                        txHash = _a.sent();
                        return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, exchangeTransferSimulator.transferFromAsync(exampleTokenAddress, sender, recipient, transferAmount, types_2.TradeSide.Taker, types_2.TransferType.Trade)];
                    case 5:
                        _a.sent();
                        store = exchangeTransferSimulator._store;
                        return [4 /*yield*/, store.getBalanceAsync(exampleTokenAddress, sender)];
                    case 6:
                        senderBalance = _a.sent();
                        return [4 /*yield*/, store.getBalanceAsync(exampleTokenAddress, recipient)];
                    case 7:
                        recipientBalance = _a.sent();
                        return [4 /*yield*/, store.getProxyAllowanceAsync(exampleTokenAddress, sender)];
                    case 8:
                        senderProxyAllowance = _a.sent();
                        expect(senderBalance).to.be.bignumber.equal(0);
                        expect(recipientBalance).to.be.bignumber.equal(transferAmount);
                        expect(senderProxyAllowance).to.be.bignumber.equal(contractWrappers.token.UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=exchange_transfer_simulator_test.js.map