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
var TokenRegistryEvents;
(function (TokenRegistryEvents) {
    TokenRegistryEvents["LogAddToken"] = "LogAddToken";
    TokenRegistryEvents["LogRemoveToken"] = "LogRemoveToken";
    TokenRegistryEvents["LogTokenNameChange"] = "LogTokenNameChange";
    TokenRegistryEvents["LogTokenSymbolChange"] = "LogTokenSymbolChange";
    TokenRegistryEvents["LogTokenIpfsHashChange"] = "LogTokenIpfsHashChange";
    TokenRegistryEvents["LogTokenSwarmHashChange"] = "LogTokenSwarmHashChange";
})(TokenRegistryEvents = exports.TokenRegistryEvents || (exports.TokenRegistryEvents = {}));
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
var TokenRegistryContract = /** @class */ (function (_super) {
    __extends(TokenRegistryContract, _super);
    function TokenRegistryContract(abi, address, provider, txDefaults) {
        var _this = _super.call(this, 'TokenRegistry', abi, address, provider, txDefaults) || this;
        _this.removeToken = {
            sendTransactionAsync: function (_token, _index, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('removeToken(address,uint256)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _index], base_contract_1.BaseContract._bigNumberToString.bind(self)), _token = _a[0], _index = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('removeToken(address,uint256)')
                                    .functions.removeToken(_token, _index).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.removeToken.estimateGasAsync.bind(self, _token, _index))];
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
            estimateGasAsync: function (_token, _index, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('removeToken(address,uint256)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _index], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _index = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('removeToken(address,uint256)')
                                    .functions.removeToken(_token, _index).data;
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
            getABIEncodedTransactionData: function (_token, _index) {
                var self = this;
                var inputAbi = self._lookupAbi('removeToken(address,uint256)').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _index], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _index = _a[1];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('removeToken(address,uint256)')
                    .functions.removeToken(_token, _index).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.getTokenAddressByName = {
            callAsync: function (_name, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getTokenAddressByName(string)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _name = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_name], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getTokenAddressByName(_name);
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
                                outputAbi = _.find(self.abi, { name: 'getTokenAddressByName' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.getTokenAddressBySymbol = {
            callAsync: function (_symbol, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getTokenAddressBySymbol(string)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _symbol = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_symbol], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getTokenAddressBySymbol(_symbol);
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
                                outputAbi = _.find(self.abi, { name: 'getTokenAddressBySymbol' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.setTokenSwarmHash = {
            sendTransactionAsync: function (_token, _swarmHash, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('setTokenSwarmHash(address,bytes)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _swarmHash], base_contract_1.BaseContract._bigNumberToString.bind(self)), _token = _a[0], _swarmHash = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('setTokenSwarmHash(address,bytes)')
                                    .functions.setTokenSwarmHash(_token, _swarmHash).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.setTokenSwarmHash.estimateGasAsync.bind(self, _token, _swarmHash))];
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
            estimateGasAsync: function (_token, _swarmHash, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('setTokenSwarmHash(address,bytes)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _swarmHash], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _swarmHash = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('setTokenSwarmHash(address,bytes)')
                                    .functions.setTokenSwarmHash(_token, _swarmHash).data;
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
            getABIEncodedTransactionData: function (_token, _swarmHash) {
                var self = this;
                var inputAbi = self._lookupAbi('setTokenSwarmHash(address,bytes)').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _swarmHash], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _swarmHash = _a[1];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('setTokenSwarmHash(address,bytes)')
                    .functions.setTokenSwarmHash(_token, _swarmHash).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.getTokenMetaData = {
            callAsync: function (_token, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getTokenMetaData(address)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _token = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getTokenMetaData(_token);
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
                                outputAbi = _.find(self.abi, { name: 'getTokenMetaData' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray];
                        }
                    });
                });
            },
        };
        _this.owner = {
            callAsync: function (callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'owner()';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [], base_contract_1.BaseContract._bigNumberToString.bind(self));
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.owner();
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
                                outputAbi = _.find(self.abi, { name: 'owner' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.addToken = {
            sendTransactionAsync: function (_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('addToken(address,string,string,uint8,bytes,bytes)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash], base_contract_1.BaseContract._bigNumberToString.bind(self)), _token = _a[0], _name = _a[1], _symbol = _a[2], _decimals = _a[3], _ipfsHash = _a[4], _swarmHash = _a[5];
                                encodedData = self
                                    ._lookupEthersInterface('addToken(address,string,string,uint8,bytes,bytes)')
                                    .functions.addToken(_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.addToken.estimateGasAsync.bind(self, _token, _name, _symbol, _decimals, _ipfsHash, _swarmHash))];
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
            estimateGasAsync: function (_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('addToken(address,string,string,uint8,bytes,bytes)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _name = _a[1], _symbol = _a[2], _decimals = _a[3], _ipfsHash = _a[4], _swarmHash = _a[5];
                                encodedData = self
                                    ._lookupEthersInterface('addToken(address,string,string,uint8,bytes,bytes)')
                                    .functions.addToken(_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash).data;
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
            getABIEncodedTransactionData: function (_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash) {
                var self = this;
                var inputAbi = self._lookupAbi('addToken(address,string,string,uint8,bytes,bytes)').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _name = _a[1], _symbol = _a[2], _decimals = _a[3], _ipfsHash = _a[4], _swarmHash = _a[5];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('addToken(address,string,string,uint8,bytes,bytes)')
                    .functions.addToken(_token, _name, _symbol, _decimals, _ipfsHash, _swarmHash).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.setTokenName = {
            sendTransactionAsync: function (_token, _name, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('setTokenName(address,string)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _name], base_contract_1.BaseContract._bigNumberToString.bind(self)), _token = _a[0], _name = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('setTokenName(address,string)')
                                    .functions.setTokenName(_token, _name).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.setTokenName.estimateGasAsync.bind(self, _token, _name))];
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
            estimateGasAsync: function (_token, _name, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('setTokenName(address,string)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _name], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _name = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('setTokenName(address,string)')
                                    .functions.setTokenName(_token, _name).data;
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
            getABIEncodedTransactionData: function (_token, _name) {
                var self = this;
                var inputAbi = self._lookupAbi('setTokenName(address,string)').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _name], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _name = _a[1];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('setTokenName(address,string)')
                    .functions.setTokenName(_token, _name).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.tokens = {
            callAsync: function (index_0, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'tokens(address)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                index_0 = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [index_0], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.tokens(index_0);
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
                                outputAbi = _.find(self.abi, { name: 'tokens' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray];
                        }
                    });
                });
            },
        };
        _this.tokenAddresses = {
            callAsync: function (index_0, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'tokenAddresses(uint256)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                index_0 = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [index_0], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.tokenAddresses(index_0);
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
                                outputAbi = _.find(self.abi, { name: 'tokenAddresses' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.getTokenByName = {
            callAsync: function (_name, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getTokenByName(string)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _name = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_name], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getTokenByName(_name);
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
                                outputAbi = _.find(self.abi, { name: 'getTokenByName' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray];
                        }
                    });
                });
            },
        };
        _this.getTokenAddresses = {
            callAsync: function (callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getTokenAddresses()';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [], base_contract_1.BaseContract._bigNumberToString.bind(self));
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getTokenAddresses();
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
                                outputAbi = _.find(self.abi, { name: 'getTokenAddresses' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray[0]];
                        }
                    });
                });
            },
        };
        _this.setTokenIpfsHash = {
            sendTransactionAsync: function (_token, _ipfsHash, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('setTokenIpfsHash(address,bytes)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _ipfsHash], base_contract_1.BaseContract._bigNumberToString.bind(self)), _token = _a[0], _ipfsHash = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('setTokenIpfsHash(address,bytes)')
                                    .functions.setTokenIpfsHash(_token, _ipfsHash).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.setTokenIpfsHash.estimateGasAsync.bind(self, _token, _ipfsHash))];
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
            estimateGasAsync: function (_token, _ipfsHash, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('setTokenIpfsHash(address,bytes)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _ipfsHash], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _ipfsHash = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('setTokenIpfsHash(address,bytes)')
                                    .functions.setTokenIpfsHash(_token, _ipfsHash).data;
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
            getABIEncodedTransactionData: function (_token, _ipfsHash) {
                var self = this;
                var inputAbi = self._lookupAbi('setTokenIpfsHash(address,bytes)').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _ipfsHash], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _ipfsHash = _a[1];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('setTokenIpfsHash(address,bytes)')
                    .functions.setTokenIpfsHash(_token, _ipfsHash).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.getTokenBySymbol = {
            callAsync: function (_symbol, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, functionSignature, inputAbi, ethersFunction, encodedData, callDataWithDefaults, rawCallResult, resultArray, outputAbi;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                functionSignature = 'getTokenBySymbol(string)';
                                inputAbi = self._lookupAbi(functionSignature).inputs;
                                _symbol = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_symbol], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                ethersFunction = self
                                    ._lookupEthersInterface(functionSignature)
                                    .functions.getTokenBySymbol(_symbol);
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
                                outputAbi = _.find(self.abi, { name: 'getTokenBySymbol' }).outputs;
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._lowercaseAddress.bind(this));
                                resultArray = base_contract_1.BaseContract._formatABIDataItemList(outputAbi, resultArray, base_contract_1.BaseContract._bnToBigNumber.bind(this));
                                return [2 /*return*/, resultArray];
                        }
                    });
                });
            },
        };
        _this.setTokenSymbol = {
            sendTransactionAsync: function (_token, _symbol, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('setTokenSymbol(address,string)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _symbol], base_contract_1.BaseContract._bigNumberToString.bind(self)), _token = _a[0], _symbol = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('setTokenSymbol(address,string)')
                                    .functions.setTokenSymbol(_token, _symbol).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.setTokenSymbol.estimateGasAsync.bind(self, _token, _symbol))];
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
            estimateGasAsync: function (_token, _symbol, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('setTokenSymbol(address,string)').inputs;
                                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _symbol], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _symbol = _a[1];
                                encodedData = self
                                    ._lookupEthersInterface('setTokenSymbol(address,string)')
                                    .functions.setTokenSymbol(_token, _symbol).data;
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
            getABIEncodedTransactionData: function (_token, _symbol) {
                var self = this;
                var inputAbi = self._lookupAbi('setTokenSymbol(address,string)').inputs;
                _a = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [_token, _symbol], base_contract_1.BaseContract._bigNumberToString), _token = _a[0], _symbol = _a[1];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('setTokenSymbol(address,string)')
                    .functions.setTokenSymbol(_token, _symbol).data;
                return abiEncodedTransactionData;
                var _a;
            },
        };
        _this.transferOwnership = {
            sendTransactionAsync: function (newOwner, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('transferOwnership(address)').inputs;
                                newOwner = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [newOwner], base_contract_1.BaseContract._bigNumberToString.bind(self))[0];
                                encodedData = self
                                    ._lookupEthersInterface('transferOwnership(address)')
                                    .functions.transferOwnership(newOwner).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.transferOwnership.estimateGasAsync.bind(self, newOwner))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            estimateGasAsync: function (newOwner, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, inputAbi, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                inputAbi = self._lookupAbi('transferOwnership(address)').inputs;
                                newOwner = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [newOwner], base_contract_1.BaseContract._bigNumberToString)[0];
                                encodedData = self
                                    ._lookupEthersInterface('transferOwnership(address)')
                                    .functions.transferOwnership(newOwner).data;
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (newOwner) {
                var self = this;
                var inputAbi = self._lookupAbi('transferOwnership(address)').inputs;
                newOwner = base_contract_1.BaseContract._formatABIDataItemList(inputAbi, [newOwner], base_contract_1.BaseContract._bigNumberToString)[0];
                var abiEncodedTransactionData = self
                    ._lookupEthersInterface('transferOwnership(address)')
                    .functions.transferOwnership(newOwner).data;
                return abiEncodedTransactionData;
            },
        };
        utils_1.classUtils.bindAll(_this, ['_ethersInterfacesByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
        return _this;
    }
    TokenRegistryContract.deployFrom0xArtifactAsync = function (artifact, provider, txDefaults) {
        return __awaiter(this, void 0, void 0, function () {
            var bytecode, abi;
            return __generator(this, function (_a) {
                if (_.isUndefined(artifact.compilerOutput)) {
                    throw new Error('Compiler output not found in the artifact file');
                }
                bytecode = artifact.compilerOutput.evm.bytecode.object;
                abi = artifact.compilerOutput.abi;
                return [2 /*return*/, TokenRegistryContract.deployAsync(bytecode, abi, provider, txDefaults)];
            });
        });
    };
    TokenRegistryContract.deployAsync = function (bytecode, abi, provider, txDefaults) {
        return __awaiter(this, void 0, void 0, function () {
            var constructorAbi, txData, web3Wrapper, txDataWithDefaults, txHash, txReceipt, contractInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        constructorAbi = base_contract_1.BaseContract._lookupConstructorAbi(abi);
                        base_contract_1.BaseContract._formatABIDataItemList(constructorAbi.inputs, [], base_contract_1.BaseContract._bigNumberToString);
                        txData = ethers.Contract.getDeployTransaction(bytecode, abi);
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
                        return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(txData, txDefaults, web3Wrapper.estimateGasAsync.bind(web3Wrapper))];
                    case 1:
                        txDataWithDefaults = _a.sent();
                        return [4 /*yield*/, web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                    case 2:
                        txHash = _a.sent();
                        utils_1.logUtils.log("transactionHash: " + txHash);
                        return [4 /*yield*/, web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 3:
                        txReceipt = _a.sent();
                        utils_1.logUtils.log("TokenRegistry successfully deployed at " + txReceipt.contractAddress);
                        contractInstance = new TokenRegistryContract(abi, txReceipt.contractAddress, provider, txDefaults);
                        contractInstance.constructorArgs = [];
                        return [2 /*return*/, contractInstance];
                }
            });
        });
    };
    return TokenRegistryContract;
}(base_contract_1.BaseContract)); // tslint:disable:max-file-line-count
exports.TokenRegistryContract = TokenRegistryContract;
//# sourceMappingURL=token_registry.js.map