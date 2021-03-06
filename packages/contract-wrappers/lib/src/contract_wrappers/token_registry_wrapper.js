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
var artifacts_1 = require("../artifacts");
var assert_1 = require("../utils/assert");
var constants_1 = require("../utils/constants");
var contract_wrapper_1 = require("./contract_wrapper");
var token_registry_1 = require("./generated/token_registry");
/**
 * This class includes all the functionality related to interacting with the 0x Token Registry smart contract.
 */
var TokenRegistryWrapper = /** @class */ (function (_super) {
    __extends(TokenRegistryWrapper, _super);
    function TokenRegistryWrapper(web3Wrapper, networkId, contractAddressIfExists) {
        var _this = _super.call(this, web3Wrapper, networkId) || this;
        _this._contractAddressIfExists = contractAddressIfExists;
        return _this;
    }
    TokenRegistryWrapper._createTokenFromMetadata = function (metadata) {
        if (metadata[0] === constants_1.constants.NULL_ADDRESS) {
            return undefined;
        }
        var token = {
            address: metadata[0],
            name: metadata[1],
            symbol: metadata[2],
            decimals: metadata[3],
        };
        return token;
    };
    /**
     * Retrieves all the tokens currently listed in the Token Registry smart contract
     * @return  An array of objects that conform to the Token interface.
     */
    TokenRegistryWrapper.prototype.getTokensAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var addresses, tokenPromises, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTokenAddressesAsync()];
                    case 1:
                        addresses = _a.sent();
                        tokenPromises = _.map(addresses, function (address) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.getTokenIfExistsAsync(address)];
                        }); }); });
                        return [4 /*yield*/, Promise.all(tokenPromises)];
                    case 2:
                        tokens = _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    /**
     * Retrieves all the addresses of the tokens currently listed in the Token Registry smart contract
     * @return  An array of token addresses.
     */
    TokenRegistryWrapper.prototype.getTokenAddressesAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRegistryContract, addresses, lowerCaseAddresses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getTokenRegistryContractAsync()];
                    case 1:
                        tokenRegistryContract = _a.sent();
                        return [4 /*yield*/, tokenRegistryContract.getTokenAddresses.callAsync()];
                    case 2:
                        addresses = _a.sent();
                        lowerCaseAddresses = _.map(addresses, function (address) { return address.toLowerCase(); });
                        return [2 /*return*/, lowerCaseAddresses];
                }
            });
        });
    };
    /**
     * Retrieves a token by address currently listed in the Token Registry smart contract
     * @return  An object that conforms to the Token interface or undefined if token not found.
     */
    TokenRegistryWrapper.prototype.getTokenIfExistsAsync = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedAddress, tokenRegistryContract, metadata, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('address', address);
                        normalizedAddress = address.toLowerCase();
                        return [4 /*yield*/, this._getTokenRegistryContractAsync()];
                    case 1:
                        tokenRegistryContract = _a.sent();
                        return [4 /*yield*/, tokenRegistryContract.getTokenMetaData.callAsync(normalizedAddress)];
                    case 2:
                        metadata = _a.sent();
                        token = TokenRegistryWrapper._createTokenFromMetadata(metadata);
                        return [2 /*return*/, token];
                }
            });
        });
    };
    TokenRegistryWrapper.prototype.getTokenAddressBySymbolIfExistsAsync = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRegistryContract, addressIfExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isString('symbol', symbol);
                        return [4 /*yield*/, this._getTokenRegistryContractAsync()];
                    case 1:
                        tokenRegistryContract = _a.sent();
                        return [4 /*yield*/, tokenRegistryContract.getTokenAddressBySymbol.callAsync(symbol)];
                    case 2:
                        addressIfExists = _a.sent();
                        if (addressIfExists === constants_1.constants.NULL_ADDRESS) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, addressIfExists];
                }
            });
        });
    };
    TokenRegistryWrapper.prototype.getTokenAddressByNameIfExistsAsync = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRegistryContract, addressIfExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isString('name', name);
                        return [4 /*yield*/, this._getTokenRegistryContractAsync()];
                    case 1:
                        tokenRegistryContract = _a.sent();
                        return [4 /*yield*/, tokenRegistryContract.getTokenAddressByName.callAsync(name)];
                    case 2:
                        addressIfExists = _a.sent();
                        if (addressIfExists === constants_1.constants.NULL_ADDRESS) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, addressIfExists];
                }
            });
        });
    };
    TokenRegistryWrapper.prototype.getTokenBySymbolIfExistsAsync = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRegistryContract, metadata, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isString('symbol', symbol);
                        return [4 /*yield*/, this._getTokenRegistryContractAsync()];
                    case 1:
                        tokenRegistryContract = _a.sent();
                        return [4 /*yield*/, tokenRegistryContract.getTokenBySymbol.callAsync(symbol)];
                    case 2:
                        metadata = _a.sent();
                        token = TokenRegistryWrapper._createTokenFromMetadata(metadata);
                        return [2 /*return*/, token];
                }
            });
        });
    };
    TokenRegistryWrapper.prototype.getTokenByNameIfExistsAsync = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRegistryContract, metadata, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isString('name', name);
                        return [4 /*yield*/, this._getTokenRegistryContractAsync()];
                    case 1:
                        tokenRegistryContract = _a.sent();
                        return [4 /*yield*/, tokenRegistryContract.getTokenByName.callAsync(name)];
                    case 2:
                        metadata = _a.sent();
                        token = TokenRegistryWrapper._createTokenFromMetadata(metadata);
                        return [2 /*return*/, token];
                }
            });
        });
    };
    /**
     * Retrieves the Ethereum address of the TokenRegistry contract deployed on the network
     * that the user-passed web3 provider is connected to.
     * @returns The Ethereum address of the TokenRegistry contract being used.
     */
    TokenRegistryWrapper.prototype.getContractAddress = function () {
        var contractAddress = this._getContractAddress(artifacts_1.artifacts.TokenRegistry, this._contractAddressIfExists);
        return contractAddress;
    };
    TokenRegistryWrapper.prototype._invalidateContractInstance = function () {
        delete this._tokenRegistryContractIfExists;
    };
    TokenRegistryWrapper.prototype._getTokenRegistryContractAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, abi, address, contractInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!_.isUndefined(this._tokenRegistryContractIfExists)) {
                            return [2 /*return*/, this._tokenRegistryContractIfExists];
                        }
                        return [4 /*yield*/, this._getContractAbiAndAddressFromArtifactsAsync(artifacts_1.artifacts.TokenRegistry, this._contractAddressIfExists)];
                    case 1:
                        _a = _b.sent(), abi = _a[0], address = _a[1];
                        contractInstance = new token_registry_1.TokenRegistryContract(abi, address, this._web3Wrapper.getProvider(), this._web3Wrapper.getContractDefaults());
                        this._tokenRegistryContractIfExists = contractInstance;
                        return [2 /*return*/, this._tokenRegistryContractIfExists];
                }
            });
        });
    };
    return TokenRegistryWrapper;
}(contract_wrapper_1.ContractWrapper));
exports.TokenRegistryWrapper = TokenRegistryWrapper;
//# sourceMappingURL=token_registry_wrapper.js.map