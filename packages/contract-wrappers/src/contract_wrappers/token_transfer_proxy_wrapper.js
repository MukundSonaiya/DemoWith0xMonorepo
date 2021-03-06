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
var contract_wrapper_1 = require("./contract_wrapper");
var token_transfer_proxy_1 = require("./generated/token_transfer_proxy");
/**
 * This class includes the functionality related to interacting with the TokenTransferProxy contract.
 */
var TokenTransferProxyWrapper = /** @class */ (function (_super) {
    __extends(TokenTransferProxyWrapper, _super);
    function TokenTransferProxyWrapper(web3Wrapper, networkId, contractAddressIfExists) {
        var _this = _super.call(this, web3Wrapper, networkId) || this;
        _this._contractAddressIfExists = contractAddressIfExists;
        return _this;
    }
    /**
     * Check if the Exchange contract address is authorized by the TokenTransferProxy contract.
     * @param   exchangeContractAddress     The hex encoded address of the Exchange contract to call.
     * @return  Whether the exchangeContractAddress is authorized.
     */
    TokenTransferProxyWrapper.prototype.isAuthorizedAsync = function (exchangeContractAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedExchangeContractAddress, tokenTransferProxyContractInstance, isAuthorized;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('exchangeContractAddress', exchangeContractAddress);
                        normalizedExchangeContractAddress = exchangeContractAddress.toLowerCase();
                        return [4 /*yield*/, this._getTokenTransferProxyContractAsync()];
                    case 1:
                        tokenTransferProxyContractInstance = _a.sent();
                        return [4 /*yield*/, tokenTransferProxyContractInstance.authorized.callAsync(normalizedExchangeContractAddress)];
                    case 2:
                        isAuthorized = _a.sent();
                        return [2 /*return*/, isAuthorized];
                }
            });
        });
    };
    /**
     * Get the list of all Exchange contract addresses authorized by the TokenTransferProxy contract.
     * @return  The list of authorized addresses.
     */
    TokenTransferProxyWrapper.prototype.getAuthorizedAddressesAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenTransferProxyContractInstance, authorizedAddresses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getTokenTransferProxyContractAsync()];
                    case 1:
                        tokenTransferProxyContractInstance = _a.sent();
                        return [4 /*yield*/, tokenTransferProxyContractInstance.getAuthorizedAddresses.callAsync()];
                    case 2:
                        authorizedAddresses = _a.sent();
                        return [2 /*return*/, authorizedAddresses];
                }
            });
        });
    };
    /**
     * Retrieves the Ethereum address of the TokenTransferProxy contract deployed on the network
     * that the user-passed web3 provider is connected to.
     * @returns The Ethereum address of the TokenTransferProxy contract being used.
     */
    TokenTransferProxyWrapper.prototype.getContractAddress = function () {
        var contractAddress = this._getContractAddress(artifacts_1.artifacts.TokenTransferProxy, this._contractAddressIfExists);
        return contractAddress;
    };
    TokenTransferProxyWrapper.prototype._invalidateContractInstance = function () {
        delete this._tokenTransferProxyContractIfExists;
    };
    TokenTransferProxyWrapper.prototype._getTokenTransferProxyContractAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, abi, address, contractInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!_.isUndefined(this._tokenTransferProxyContractIfExists)) {
                            return [2 /*return*/, this._tokenTransferProxyContractIfExists];
                        }
                        return [4 /*yield*/, this._getContractAbiAndAddressFromArtifactsAsync(artifacts_1.artifacts.TokenTransferProxy, this._contractAddressIfExists)];
                    case 1:
                        _a = _b.sent(), abi = _a[0], address = _a[1];
                        contractInstance = new token_transfer_proxy_1.TokenTransferProxyContract(abi, address, this._web3Wrapper.getProvider(), this._web3Wrapper.getContractDefaults());
                        this._tokenTransferProxyContractIfExists = contractInstance;
                        return [2 /*return*/, this._tokenTransferProxyContractIfExists];
                }
            });
        });
    };
    return TokenTransferProxyWrapper;
}(contract_wrapper_1.ContractWrapper));
exports.TokenTransferProxyWrapper = TokenTransferProxyWrapper;
//# sourceMappingURL=token_transfer_proxy_wrapper.js.map