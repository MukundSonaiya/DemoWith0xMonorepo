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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x-monorepo/tree/development/packages/contract_templates.
 */
// tslint:disable:no-consecutive-blank-lines ordered-imports
// tslint:disable-next-line:no-unused-variable
var base_contract_1 = require("@0xproject/base-contract");
var utils_1 = require("@0xproject/utils");
var web3_wrapper_1 = require("@0xproject/web3-wrapper");
var ethers = require("ethers");
var _ = require("lodash");
var ExchangeEvents;
(function (ExchangeEvents) {
    ExchangeEvents["LogFill"] = "LogFill";
    ExchangeEvents["LogCancel"] = "LogCancel";
    ExchangeEvents["LogError"] = "LogError";
})(ExchangeEvents = exports.ExchangeEvents || (exports.ExchangeEvents = {}));
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
var ExchangeContract = /** @class */ (function (_super) {
    __extends(ExchangeContract, _super);
    function ExchangeContract(abi, address, provider, txDefaults) {
        var _this = _super.call(this, 'Exchange', abi, address, provider, txDefaults) || this;
        _this.isRoundingError = {
            callAsync: function (numerator, denominator, target, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                functionSignature = 'isRoundingError(uint256,uint256,uint256)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [numerator, denominator, target], base_contract_1.BaseContract._bigNumberToString.bind(self)), numerator = _a[0], denominator = _a[1], target = _a[2];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.isRoundingError(numerator, denominator, target);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _b.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'isRoundingError' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.filled = {
            callAsync: function (index_0, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'filled(bytes32)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                index_0 = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [index_0], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.filled(index_0);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'filled' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.cancelled = {
            callAsync: function (index_0, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'cancelled(bytes32)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                index_0 = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [index_0], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.cancelled(index_0);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'cancelled' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.fillOrdersUpTo = {
            sendTransactionAsync: function (orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('fillOrdersUpTo(address[5][],uint256[6][],uint256,bool,uint8[],bytes32[],bytes32[])').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                                    orderAddresses,
                                    orderValues,
                                    fillTakerTokenAmount,
                                    shouldThrowOnInsufficientBalanceOrAllowance,
                                    v,
                                    r,
                                    s,
                                ], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                                encodedData = self
                                    ._lookupEthersInterface('fillOrdersUpTo(address[5][],uint256[6][],uint256,bool,uint8[],bytes32[],bytes32[])')
                                    .functions.fillOrdersUpTo(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.fillOrdersUpTo.estimateGasAsync.bind(self, orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s))];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _b.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('fillOrdersUpTo(address[5][],uint256[6][],uint256,bool,uint8[],bytes32[],bytes32[])').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                                    orderAddresses,
                                    orderValues,
                                    fillTakerTokenAmount,
                                    shouldThrowOnInsufficientBalanceOrAllowance,
                                    v,
                                    r,
                                    s,
                                ], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                                encodedData = self
                                    ._lookupEthersInterface('fillOrdersUpTo(address[5][],uint256[6][],uint256,bool,uint8[],bytes32[],bytes32[])')
                                    .functions.fillOrdersUpTo(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _b.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s) {
                var self = this;
                var inputAbi = self._lookupAbi('fillOrdersUpTo(address[5][],uint256[6][],uint256,bool,uint8[],bytes32[],bytes32[])').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                    orderAddresses,
                    orderValues,
                    fillTakerTokenAmount,
                    shouldThrowOnInsufficientBalanceOrAllowance,
                    v,
                    r,
                    s,
                ], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('fillOrdersUpTo(address[5][],uint256[6][],uint256,bool,uint8[],bytes32[],bytes32[])')
                    .functions.fillOrdersUpTo(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                return abiEncodedTransactionData;
                var _a;
            },
            callAsync: function (orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                functionSignature = 'fillOrdersUpTo(address[5][],uint256[6][],uint256,bool,uint8[],bytes32[],bytes32[])';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                                    orderAddresses,
                                    orderValues,
                                    fillTakerTokenAmount,
                                    shouldThrowOnInsufficientBalanceOrAllowance,
                                    v,
                                    r,
                                    s,
                                ], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.fillOrdersUpTo(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _b.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'fillOrdersUpTo' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.cancelOrder = {
            sendTransactionAsync: function (orderAddresses, orderValues, cancelTakerTokenAmount, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('cancelOrder(address[5],uint256[6],uint256)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, cancelTakerTokenAmount], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], cancelTakerTokenAmount = _a[2];
                                encodedData = self
                                    ._lookupEthersInterface('cancelOrder(address[5],uint256[6],uint256)')
                                    .functions.cancelOrder(orderAddresses, orderValues, cancelTakerTokenAmount).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.cancelOrder.estimateGasAsync.bind(self, orderAddresses, orderValues, cancelTakerTokenAmount))];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _b.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (orderAddresses, orderValues, cancelTakerTokenAmount, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('cancelOrder(address[5],uint256[6],uint256)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, cancelTakerTokenAmount], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], cancelTakerTokenAmount = _a[2];
                                encodedData = self
                                    ._lookupEthersInterface('cancelOrder(address[5],uint256[6],uint256)')
                                    .functions.cancelOrder(orderAddresses, orderValues, cancelTakerTokenAmount).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _b.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orderAddresses, orderValues, cancelTakerTokenAmount) {
                var self = this;
                var inputAbi = self._lookupAbi('cancelOrder(address[5],uint256[6],uint256)').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, cancelTakerTokenAmount], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], cancelTakerTokenAmount = _a[2];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('cancelOrder(address[5],uint256[6],uint256)')
                    .functions.cancelOrder(orderAddresses, orderValues, cancelTakerTokenAmount).data;
                return abiEncodedTransactionData;
                var _a;
            },
            callAsync: function (orderAddresses, orderValues, cancelTakerTokenAmount, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                functionSignature = 'cancelOrder(address[5],uint256[6],uint256)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, cancelTakerTokenAmount], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], cancelTakerTokenAmount = _a[2];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.cancelOrder(orderAddresses, orderValues, cancelTakerTokenAmount);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _b.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'cancelOrder' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.ZRX_TOKEN_CONTRACT = {
            callAsync: function (callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'ZRX_TOKEN_CONTRACT()';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [], base_contract_1.BaseContract._bigNumberToString.bind(self));
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.ZRX_TOKEN_CONTRACT();
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'ZRX_TOKEN_CONTRACT' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.batchFillOrKillOrders = {
            sendTransactionAsync: function (orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('batchFillOrKillOrders(address[5][],uint256[6][],uint256[],uint8[],bytes32[],bytes32[])').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmounts = _a[2], v = _a[3], r = _a[4], s = _a[5];
                                encodedData = self
                                    ._lookupEthersInterface('batchFillOrKillOrders(address[5][],uint256[6][],uint256[],uint8[],bytes32[],bytes32[])')
                                    .functions.batchFillOrKillOrders(orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.batchFillOrKillOrders.estimateGasAsync.bind(self, orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s))];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _b.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('batchFillOrKillOrders(address[5][],uint256[6][],uint256[],uint8[],bytes32[],bytes32[])').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmounts = _a[2], v = _a[3], r = _a[4], s = _a[5];
                                encodedData = self
                                    ._lookupEthersInterface('batchFillOrKillOrders(address[5][],uint256[6][],uint256[],uint8[],bytes32[],bytes32[])')
                                    .functions.batchFillOrKillOrders(orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _b.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s) {
                var self = this;
                var inputAbi = self._lookupAbi('batchFillOrKillOrders(address[5][],uint256[6][],uint256[],uint8[],bytes32[],bytes32[])').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmounts = _a[2], v = _a[3], r = _a[4], s = _a[5];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('batchFillOrKillOrders(address[5][],uint256[6][],uint256[],uint8[],bytes32[],bytes32[])')
                    .functions.batchFillOrKillOrders(orderAddresses, orderValues, fillTakerTokenAmounts, v, r, s).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.fillOrKillOrder = {
            sendTransactionAsync: function (orderAddresses, orderValues, fillTakerTokenAmount, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('fillOrKillOrder(address[5],uint256[6],uint256,uint8,bytes32,bytes32)')
                                    .inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, fillTakerTokenAmount, v, r, s], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], v = _a[3], r = _a[4], s = _a[5];
                                encodedData = self
                                    ._lookupEthersInterface('fillOrKillOrder(address[5],uint256[6],uint256,uint8,bytes32,bytes32)')
                                    .functions.fillOrKillOrder(orderAddresses, orderValues, fillTakerTokenAmount, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.fillOrKillOrder.estimateGasAsync.bind(self, orderAddresses, orderValues, fillTakerTokenAmount, v, r, s))];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _b.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (orderAddresses, orderValues, fillTakerTokenAmount, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('fillOrKillOrder(address[5],uint256[6],uint256,uint8,bytes32,bytes32)')
                                    .inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, fillTakerTokenAmount, v, r, s], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], v = _a[3], r = _a[4], s = _a[5];
                                encodedData = self
                                    ._lookupEthersInterface('fillOrKillOrder(address[5],uint256[6],uint256,uint8,bytes32,bytes32)')
                                    .functions.fillOrKillOrder(orderAddresses, orderValues, fillTakerTokenAmount, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _b.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orderAddresses, orderValues, fillTakerTokenAmount, v, r, s) {
                var self = this;
                var inputAbi = self._lookupAbi('fillOrKillOrder(address[5],uint256[6],uint256,uint8,bytes32,bytes32)')
                    .inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, fillTakerTokenAmount, v, r, s], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], v = _a[3], r = _a[4], s = _a[5];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('fillOrKillOrder(address[5],uint256[6],uint256,uint8,bytes32,bytes32)')
                    .functions.fillOrKillOrder(orderAddresses, orderValues, fillTakerTokenAmount, v, r, s).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.getUnavailableTakerTokenAmount = {
            callAsync: function (orderHash, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getUnavailableTakerTokenAmount(bytes32)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                orderHash = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderHash], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getUnavailableTakerTokenAmount(orderHash);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'getUnavailableTakerTokenAmount' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.isValidSignature = {
            callAsync: function (signer, hash, v, r, s, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                functionSignature = 'isValidSignature(address,bytes32,uint8,bytes32,bytes32)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [signer, hash, v, r, s], base_contract_1.BaseContract._bigNumberToString.bind(self)), signer = _a[0], hash = _a[1], v = _a[2], r = _a[3], s = _a[4];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.isValidSignature(signer, hash, v, r, s);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _b.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'isValidSignature' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.getPartialAmount = {
            callAsync: function (numerator, denominator, target, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getPartialAmount(uint256,uint256,uint256)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [numerator, denominator, target], base_contract_1.BaseContract._bigNumberToString.bind(self)), numerator = _a[0], denominator = _a[1], target = _a[2];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getPartialAmount(numerator, denominator, target);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _b.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'getPartialAmount' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.TOKEN_TRANSFER_PROXY_CONTRACT = {
            callAsync: function (callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'TOKEN_TRANSFER_PROXY_CONTRACT()';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [], base_contract_1.BaseContract._bigNumberToString.bind(self));
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.TOKEN_TRANSFER_PROXY_CONTRACT();
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'TOKEN_TRANSFER_PROXY_CONTRACT' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.batchFillOrders = {
            sendTransactionAsync: function (orderAddresses, orderValues, fillTakerTokenAmounts, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('batchFillOrders(address[5][],uint256[6][],uint256[],bool,uint8[],bytes32[],bytes32[])').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                                    orderAddresses,
                                    orderValues,
                                    fillTakerTokenAmounts,
                                    shouldThrowOnInsufficientBalanceOrAllowance,
                                    v,
                                    r,
                                    s,
                                ], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmounts = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                                encodedData = self
                                    ._lookupEthersInterface('batchFillOrders(address[5][],uint256[6][],uint256[],bool,uint8[],bytes32[],bytes32[])')
                                    .functions.batchFillOrders(orderAddresses, orderValues, fillTakerTokenAmounts, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.batchFillOrders.estimateGasAsync.bind(self, orderAddresses, orderValues, fillTakerTokenAmounts, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s))];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _b.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (orderAddresses, orderValues, fillTakerTokenAmounts, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('batchFillOrders(address[5][],uint256[6][],uint256[],bool,uint8[],bytes32[],bytes32[])').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                                    orderAddresses,
                                    orderValues,
                                    fillTakerTokenAmounts,
                                    shouldThrowOnInsufficientBalanceOrAllowance,
                                    v,
                                    r,
                                    s,
                                ], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmounts = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                                encodedData = self
                                    ._lookupEthersInterface('batchFillOrders(address[5][],uint256[6][],uint256[],bool,uint8[],bytes32[],bytes32[])')
                                    .functions.batchFillOrders(orderAddresses, orderValues, fillTakerTokenAmounts, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _b.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orderAddresses, orderValues, fillTakerTokenAmounts, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s) {
                var self = this;
                var inputAbi = self._lookupAbi('batchFillOrders(address[5][],uint256[6][],uint256[],bool,uint8[],bytes32[],bytes32[])').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                    orderAddresses,
                    orderValues,
                    fillTakerTokenAmounts,
                    shouldThrowOnInsufficientBalanceOrAllowance,
                    v,
                    r,
                    s,
                ], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmounts = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('batchFillOrders(address[5][],uint256[6][],uint256[],bool,uint8[],bytes32[],bytes32[])')
                    .functions.batchFillOrders(orderAddresses, orderValues, fillTakerTokenAmounts, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.batchCancelOrders = {
            sendTransactionAsync: function (orderAddresses, orderValues, cancelTakerTokenAmounts, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('batchCancelOrders(address[5][],uint256[6][],uint256[])').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, cancelTakerTokenAmounts], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], cancelTakerTokenAmounts = _a[2];
                                encodedData = self
                                    ._lookupEthersInterface('batchCancelOrders(address[5][],uint256[6][],uint256[])')
                                    .functions.batchCancelOrders(orderAddresses, orderValues, cancelTakerTokenAmounts).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.batchCancelOrders.estimateGasAsync.bind(self, orderAddresses, orderValues, cancelTakerTokenAmounts))];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _b.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (orderAddresses, orderValues, cancelTakerTokenAmounts, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('batchCancelOrders(address[5][],uint256[6][],uint256[])').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, cancelTakerTokenAmounts], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], cancelTakerTokenAmounts = _a[2];
                                encodedData = self
                                    ._lookupEthersInterface('batchCancelOrders(address[5][],uint256[6][],uint256[])')
                                    .functions.batchCancelOrders(orderAddresses, orderValues, cancelTakerTokenAmounts).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _b.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orderAddresses, orderValues, cancelTakerTokenAmounts) {
                var self = this;
                var inputAbi = self._lookupAbi('batchCancelOrders(address[5][],uint256[6][],uint256[])').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues, cancelTakerTokenAmounts], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], cancelTakerTokenAmounts = _a[2];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('batchCancelOrders(address[5][],uint256[6][],uint256[])')
                    .functions.batchCancelOrders(orderAddresses, orderValues, cancelTakerTokenAmounts).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.fillOrder = {
            sendTransactionAsync: function (orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('fillOrder(address[5],uint256[6],uint256,bool,uint8,bytes32,bytes32)')
                                    .inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                                    orderAddresses,
                                    orderValues,
                                    fillTakerTokenAmount,
                                    shouldThrowOnInsufficientBalanceOrAllowance,
                                    v,
                                    r,
                                    s,
                                ], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                                encodedData = self
                                    ._lookupEthersInterface('fillOrder(address[5],uint256[6],uint256,bool,uint8,bytes32,bytes32)')
                                    .functions.fillOrder(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.fillOrder.estimateGasAsync.bind(self, orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s))];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _b.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('fillOrder(address[5],uint256[6],uint256,bool,uint8,bytes32,bytes32)')
                                    .inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                                    orderAddresses,
                                    orderValues,
                                    fillTakerTokenAmount,
                                    shouldThrowOnInsufficientBalanceOrAllowance,
                                    v,
                                    r,
                                    s,
                                ], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                                encodedData = self
                                    ._lookupEthersInterface('fillOrder(address[5],uint256[6],uint256,bool,uint8,bytes32,bytes32)')
                                    .functions.fillOrder(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _b.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s) {
                var self = this;
                var inputAbi = self._lookupAbi('fillOrder(address[5],uint256[6],uint256,bool,uint8,bytes32,bytes32)')
                    .inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                    orderAddresses,
                    orderValues,
                    fillTakerTokenAmount,
                    shouldThrowOnInsufficientBalanceOrAllowance,
                    v,
                    r,
                    s,
                ], base_contract_1.BaseContract._bigNumberToString), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('fillOrder(address[5],uint256[6],uint256,bool,uint8,bytes32,bytes32)')
                    .functions.fillOrder(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s).data;
                return abiEncodedTransactionData;
                var _a;
            },
            callAsync: function (orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                functionSignature = 'fillOrder(address[5],uint256[6],uint256,bool,uint8,bytes32,bytes32)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [
                                    orderAddresses,
                                    orderValues,
                                    fillTakerTokenAmount,
                                    shouldThrowOnInsufficientBalanceOrAllowance,
                                    v,
                                    r,
                                    s,
                                ], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1], fillTakerTokenAmount = _a[2], shouldThrowOnInsufficientBalanceOrAllowance = _a[3], v = _a[4], r = _a[5], s = _a[6];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.fillOrder(orderAddresses, orderValues, fillTakerTokenAmount, shouldThrowOnInsufficientBalanceOrAllowance, v, r, s);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _b.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'fillOrder' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.getOrderHash = {
            callAsync: function (orderAddresses, orderValues, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getOrderHash(address[5],uint256[6])';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [orderAddresses, orderValues], base_contract_1.BaseContract._bigNumberToString.bind(self)), orderAddresses = _a[0], orderValues = _a[1];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getOrderHash(orderAddresses, orderValues);
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _b.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _b.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'getOrderHash' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.EXTERNAL_QUERY_GAS_LIMIT = {
            callAsync: function (callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'EXTERNAL_QUERY_GAS_LIMIT()';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [], base_contract_1.BaseContract._bigNumberToString.bind(self));
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.EXTERNAL_QUERY_GAS_LIMIT();
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'EXTERNAL_QUERY_GAS_LIMIT' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.VERSION = {
            callAsync: function (callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'VERSION()';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [], base_contract_1.BaseContract._bigNumberToString.bind(self));
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.VERSION();
                                encodedData = ethersFunction.data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({
                                        to: self.address,
                                        data: encodedData,
                                    }, self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                resultArray = ethersFunction.parse(rawCallResult);
                                outputAbi = _.find(self.abi, { name: 'VERSION' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        utils_1.classUtils.bindAll(_this, ['_ethersInterfacesByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
        return _this;
    }
    ExchangeContract.deployFrom0xArtifactAsync = function (artifact, provider, txDefaults, _zrxToken, _tokenTransferProxy) {
        return __awaiter(this, void 0, void 0, function () {
            var bytecode, abi;
            return __generator(this, function (_a) {
                if (_.isUndefined(artifact.compilerOutput)) {
                    throw new Error('Compiler output not found in the artifact file');
                }
                bytecode = artifact.compilerOutput.evm.bytecode.object;
                abi = artifact.compilerOutput.abi;
                return [2 /*return*/, ExchangeContract.deployAsync(bytecode, abi, provider, txDefaults, _zrxToken, _tokenTransferProxy)];
            });
        });
    };
    ExchangeContract.deployAsync = function (bytecode, abi, provider, txDefaults, _zrxToken, _tokenTransferProxy) {
        return __awaiter(this, void 0, void 0, function () {
            var constructorAbi, txData, web3Wrapper, txDataWithDefaults, txHash, txReceipt, contractInstance, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        constructorAbi = base_contract_1.BaseContract._lookupConstructorAbi(abi);
                        _a = base_contract_1.BaseContract._formatABIDataItemList(constructorAbi.inputs, [_zrxToken, _tokenTransferProxy], base_contract_1.BaseContract._bigNumberToString), _zrxToken = _a[0], _tokenTransferProxy = _a[1];
                        txData = ethers.Contract.getDeployTransaction(bytecode, abi, _zrxToken, _tokenTransferProxy);
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
                        return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(txData, txDefaults, web3Wrapper.estimateGasAsync.bind(web3Wrapper))];
                    case 1:
                        txDataWithDefaults = _b.sent();
                        return [4 /*yield*/, web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                    case 2:
                        txHash = _b.sent();
                        utils_1.logUtils.log("transactionHash: " + txHash);
                        return [4 /*yield*/, web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 3:
                        txReceipt = _b.sent();
                        utils_1.logUtils.log("Exchange successfully deployed at " + txReceipt.contractAddress);
                        contractInstance = new ExchangeContract(abi, txReceipt.contractAddress, provider, txDefaults);
                        contractInstance.constructorArgs = [_zrxToken, _tokenTransferProxy];
                        return [2 /*return*/, contractInstance];
                }
            });
        });
    };
    return ExchangeContract;
}(base_contract_1.BaseContract)); // tslint:disable:max-file-line-count
exports.ExchangeContract = ExchangeContract;
//# sourceMappingURL=exchange.js.map