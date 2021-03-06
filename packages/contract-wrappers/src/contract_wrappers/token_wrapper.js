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
var json_schemas_1 = require("@0xproject/json-schemas");
var utils_1 = require("@0xproject/utils");
var _ = require("lodash");
var artifacts_1 = require("../artifacts");
var types_1 = require("../types");
var assert_1 = require("../utils/assert");
var constants_1 = require("../utils/constants");
var contract_wrapper_1 = require("./contract_wrapper");
var token_1 = require("./generated/token");
/**
 * This class includes all the functionality related to interacting with ERC20 token contracts.
 * All ERC20 method calls are supported, along with some convenience methods for getting/setting allowances
 * to the 0x Proxy smart contract.
 */
var TokenWrapper = /** @class */ (function (_super) {
    __extends(TokenWrapper, _super);
    function TokenWrapper(web3Wrapper, networkId, tokenTransferProxyWrapper) {
        var _this = _super.call(this, web3Wrapper, networkId) || this;
        _this.UNLIMITED_ALLOWANCE_IN_BASE_UNITS = constants_1.constants.UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
        _this._tokenContractsByAddress = {};
        _this._tokenTransferProxyWrapper = tokenTransferProxyWrapper;
        return _this;
    }
    /**
     * Retrieves an owner's ERC20 token balance.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose balance you would like to check.
     * @param   methodOpts      Optional arguments this method accepts.
     * @return  The owner's ERC20 token balance in base units.
     */
    TokenWrapper.prototype.getBalanceAsync = function (tokenAddress, ownerAddress, methodOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, normalizedOwnerAddress, tokenContract, defaultBlock, txData, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('ownerAddress', ownerAddress);
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedOwnerAddress = ownerAddress.toLowerCase();
                        return [4 /*yield*/, this._getTokenContractAsync(normalizedTokenAddress)];
                    case 1:
                        tokenContract = _a.sent();
                        defaultBlock = _.isUndefined(methodOpts) ? undefined : methodOpts.defaultBlock;
                        txData = {};
                        return [4 /*yield*/, tokenContract.balanceOf.callAsync(normalizedOwnerAddress, txData, defaultBlock)];
                    case 2:
                        balance = _a.sent();
                        // Wrap BigNumbers returned from web3 with our own (later) version of BigNumber
                        balance = new utils_1.BigNumber(balance);
                        return [2 /*return*/, balance];
                }
            });
        });
    };
    /**
     * Sets the spender's allowance to a specified number of baseUnits on behalf of the owner address.
     * Equivalent to the ERC20 spec method `approve`.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress        The hex encoded user Ethereum address who would like to set an allowance
     *                              for spenderAddress.
     * @param   spenderAddress      The hex encoded user Ethereum address who will be able to spend the set allowance.
     * @param   amountInBaseUnits   The allowance amount you would like to set.
     * @param   txOpts              Transaction parameters.
     * @return Transaction hash.
     */
    TokenWrapper.prototype.setAllowanceAsync = function (tokenAddress, ownerAddress, spenderAddress, amountInBaseUnits, txOpts) {
        if (txOpts === void 0) { txOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, normalizedSpenderAddress, normalizedOwnerAddress, tokenContract, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('spenderAddress', spenderAddress);
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('ownerAddress', ownerAddress, this._web3Wrapper)];
                    case 1:
                        _a.sent();
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedSpenderAddress = spenderAddress.toLowerCase();
                        normalizedOwnerAddress = ownerAddress.toLowerCase();
                        assert_1.assert.isValidBaseUnitAmount('amountInBaseUnits', amountInBaseUnits);
                        return [4 /*yield*/, this._getTokenContractAsync(normalizedTokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, tokenContract.approve.sendTransactionAsync(normalizedSpenderAddress, amountInBaseUnits, {
                                from: normalizedOwnerAddress,
                                gas: txOpts.gasLimit,
                                gasPrice: txOpts.gasPrice,
                            })];
                    case 3:
                        txHash = _a.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Sets the spender's allowance to an unlimited number of baseUnits on behalf of the owner address.
     * Equivalent to the ERC20 spec method `approve`.
     * Setting an unlimited allowance will lower the gas cost for filling orders involving tokens that forego updating
     * allowances set to the max amount (e.g ZRX, WETH)
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress        The hex encoded user Ethereum address who would like to set an allowance
     *                              for spenderAddress.
     * @param   spenderAddress      The hex encoded user Ethereum address who will be able to spend the set allowance.
     * @param   txOpts              Transaction parameters.
     * @return Transaction hash.
     */
    TokenWrapper.prototype.setUnlimitedAllowanceAsync = function (tokenAddress, ownerAddress, spenderAddress, txOpts) {
        if (txOpts === void 0) { txOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, normalizedOwnerAddress, normalizedSpenderAddress, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('ownerAddress', ownerAddress);
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        assert_1.assert.isETHAddressHex('spenderAddress', spenderAddress);
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedOwnerAddress = ownerAddress.toLowerCase();
                        normalizedSpenderAddress = spenderAddress.toLowerCase();
                        return [4 /*yield*/, this.setAllowanceAsync(normalizedTokenAddress, normalizedOwnerAddress, normalizedSpenderAddress, this.UNLIMITED_ALLOWANCE_IN_BASE_UNITS, txOpts)];
                    case 1:
                        txHash = _a.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Retrieves the owners allowance in baseUnits set to the spender's address.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose allowance to spenderAddress
     *                          you would like to retrieve.
     * @param   spenderAddress  The hex encoded user Ethereum address who can spend the allowance you are fetching.
     * @param   methodOpts      Optional arguments this method accepts.
     */
    TokenWrapper.prototype.getAllowanceAsync = function (tokenAddress, ownerAddress, spenderAddress, methodOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, normalizedOwnerAddress, normalizedSpenderAddress, tokenContract, defaultBlock, txData, allowanceInBaseUnits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('ownerAddress', ownerAddress);
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        assert_1.assert.isETHAddressHex('spenderAddress', spenderAddress);
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedOwnerAddress = ownerAddress.toLowerCase();
                        normalizedSpenderAddress = spenderAddress.toLowerCase();
                        return [4 /*yield*/, this._getTokenContractAsync(normalizedTokenAddress)];
                    case 1:
                        tokenContract = _a.sent();
                        defaultBlock = _.isUndefined(methodOpts) ? undefined : methodOpts.defaultBlock;
                        txData = {};
                        return [4 /*yield*/, tokenContract.allowance.callAsync(normalizedOwnerAddress, normalizedSpenderAddress, txData, defaultBlock)];
                    case 2:
                        allowanceInBaseUnits = _a.sent();
                        // Wrap BigNumbers returned from web3 with our own (later) version of BigNumber
                        allowanceInBaseUnits = new utils_1.BigNumber(allowanceInBaseUnits);
                        return [2 /*return*/, allowanceInBaseUnits];
                }
            });
        });
    };
    /**
     * Retrieves the owner's allowance in baseUnits set to the 0x proxy contract.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose proxy contract allowance we are retrieving.
     * @param   methodOpts      Optional arguments this method accepts.
     */
    TokenWrapper.prototype.getProxyAllowanceAsync = function (tokenAddress, ownerAddress, methodOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, normalizedOwnerAddress, proxyAddress, allowanceInBaseUnits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('ownerAddress', ownerAddress);
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedOwnerAddress = ownerAddress.toLowerCase();
                        proxyAddress = this._tokenTransferProxyWrapper.getContractAddress();
                        return [4 /*yield*/, this.getAllowanceAsync(normalizedTokenAddress, normalizedOwnerAddress, proxyAddress, methodOpts)];
                    case 1:
                        allowanceInBaseUnits = _a.sent();
                        return [2 /*return*/, allowanceInBaseUnits];
                }
            });
        });
    };
    /**
     * Sets the 0x proxy contract's allowance to a specified number of a tokens' baseUnits on behalf
     * of an owner address.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress        The hex encoded user Ethereum address who is setting an allowance
     *                              for the Proxy contract.
     * @param   amountInBaseUnits   The allowance amount specified in baseUnits.
     * @param   txOpts              Transaction parameters.
     * @return Transaction hash.
     */
    TokenWrapper.prototype.setProxyAllowanceAsync = function (tokenAddress, ownerAddress, amountInBaseUnits, txOpts) {
        if (txOpts === void 0) { txOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, normalizedOwnerAddress, proxyAddress, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('ownerAddress', ownerAddress);
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedOwnerAddress = ownerAddress.toLowerCase();
                        assert_1.assert.isValidBaseUnitAmount('amountInBaseUnits', amountInBaseUnits);
                        proxyAddress = this._tokenTransferProxyWrapper.getContractAddress();
                        return [4 /*yield*/, this.setAllowanceAsync(normalizedTokenAddress, normalizedOwnerAddress, proxyAddress, amountInBaseUnits, txOpts)];
                    case 1:
                        txHash = _a.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Sets the 0x proxy contract's allowance to a unlimited number of a tokens' baseUnits on behalf
     * of an owner address.
     * Setting an unlimited allowance will lower the gas cost for filling orders involving tokens that forego updating
     * allowances set to the max amount (e.g ZRX, WETH)
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress        The hex encoded user Ethereum address who is setting an allowance
     *                              for the Proxy contract.
     * @param   txOpts              Transaction parameters.
     * @return Transaction hash.
     */
    TokenWrapper.prototype.setUnlimitedProxyAllowanceAsync = function (tokenAddress, ownerAddress, txOpts) {
        if (txOpts === void 0) { txOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, normalizedOwnerAddress, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('ownerAddress', ownerAddress);
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedOwnerAddress = ownerAddress.toLowerCase();
                        return [4 /*yield*/, this.setProxyAllowanceAsync(normalizedTokenAddress, normalizedOwnerAddress, this.UNLIMITED_ALLOWANCE_IN_BASE_UNITS, txOpts)];
                    case 1:
                        txHash = _a.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Transfers `amountInBaseUnits` ERC20 tokens from `fromAddress` to `toAddress`.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   fromAddress         The hex encoded user Ethereum address that will send the funds.
     * @param   toAddress           The hex encoded user Ethereum address that will receive the funds.
     * @param   amountInBaseUnits   The amount (specified in baseUnits) of the token to transfer.
     * @param   txOpts              Transaction parameters.
     * @return Transaction hash.
     */
    TokenWrapper.prototype.transferAsync = function (tokenAddress, fromAddress, toAddress, amountInBaseUnits, txOpts) {
        if (txOpts === void 0) { txOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, normalizedFromAddress, normalizedToAddress, tokenContract, fromAddressBalance, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        assert_1.assert.isETHAddressHex('toAddress', toAddress);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('fromAddress', fromAddress, this._web3Wrapper)];
                    case 1:
                        _a.sent();
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedFromAddress = fromAddress.toLowerCase();
                        normalizedToAddress = toAddress.toLowerCase();
                        assert_1.assert.isValidBaseUnitAmount('amountInBaseUnits', amountInBaseUnits);
                        return [4 /*yield*/, this._getTokenContractAsync(normalizedTokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.getBalanceAsync(normalizedTokenAddress, normalizedFromAddress)];
                    case 3:
                        fromAddressBalance = _a.sent();
                        if (fromAddressBalance.lessThan(amountInBaseUnits)) {
                            throw new Error(types_1.ContractWrappersError.InsufficientBalanceForTransfer);
                        }
                        return [4 /*yield*/, tokenContract.transfer.sendTransactionAsync(normalizedToAddress, amountInBaseUnits, {
                                from: normalizedFromAddress,
                                gas: txOpts.gasLimit,
                                gasPrice: txOpts.gasPrice,
                            })];
                    case 4:
                        txHash = _a.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Transfers `amountInBaseUnits` ERC20 tokens from `fromAddress` to `toAddress`.
     * Requires the fromAddress to have sufficient funds and to have approved an allowance of
     * `amountInBaseUnits` to `senderAddress`.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   fromAddress         The hex encoded user Ethereum address whose funds are being sent.
     * @param   toAddress           The hex encoded user Ethereum address that will receive the funds.
     * @param   senderAddress       The hex encoded user Ethereum address whose initiates the fund transfer. The
     *                              `fromAddress` must have set an allowance to the `senderAddress`
     *                              before this call.
     * @param   amountInBaseUnits   The amount (specified in baseUnits) of the token to transfer.
     * @param   txOpts              Transaction parameters.
     * @return Transaction hash.
     */
    TokenWrapper.prototype.transferFromAsync = function (tokenAddress, fromAddress, toAddress, senderAddress, amountInBaseUnits, txOpts) {
        if (txOpts === void 0) { txOpts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var normalizedToAddress, normalizedFromAddress, normalizedTokenAddress, normalizedSenderAddress, tokenContract, fromAddressAllowance, fromAddressBalance, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('toAddress', toAddress);
                        assert_1.assert.isETHAddressHex('fromAddress', fromAddress);
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('senderAddress', senderAddress, this._web3Wrapper)];
                    case 1:
                        _a.sent();
                        normalizedToAddress = toAddress.toLowerCase();
                        normalizedFromAddress = fromAddress.toLowerCase();
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        normalizedSenderAddress = senderAddress.toLowerCase();
                        assert_1.assert.isValidBaseUnitAmount('amountInBaseUnits', amountInBaseUnits);
                        return [4 /*yield*/, this._getTokenContractAsync(normalizedTokenAddress)];
                    case 2:
                        tokenContract = _a.sent();
                        return [4 /*yield*/, this.getAllowanceAsync(normalizedTokenAddress, normalizedFromAddress, normalizedSenderAddress)];
                    case 3:
                        fromAddressAllowance = _a.sent();
                        if (fromAddressAllowance.lessThan(amountInBaseUnits)) {
                            throw new Error(types_1.ContractWrappersError.InsufficientAllowanceForTransfer);
                        }
                        return [4 /*yield*/, this.getBalanceAsync(normalizedTokenAddress, normalizedFromAddress)];
                    case 4:
                        fromAddressBalance = _a.sent();
                        if (fromAddressBalance.lessThan(amountInBaseUnits)) {
                            throw new Error(types_1.ContractWrappersError.InsufficientBalanceForTransfer);
                        }
                        return [4 /*yield*/, tokenContract.transferFrom.sendTransactionAsync(normalizedFromAddress, normalizedToAddress, amountInBaseUnits, {
                                from: normalizedSenderAddress,
                                gas: txOpts.gasLimit,
                                gasPrice: txOpts.gasPrice,
                            })];
                    case 5:
                        txHash = _a.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Subscribe to an event type emitted by the Token contract.
     * @param   tokenAddress        The hex encoded address where the ERC20 token is deployed.
     * @param   eventName           The token contract event you would like to subscribe to.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param   callback            Callback that gets called when a log is added/removed
     * @return Subscription token used later to unsubscribe
     */
    TokenWrapper.prototype.subscribe = function (tokenAddress, eventName, indexFilterValues, callback) {
        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
        var normalizedTokenAddress = tokenAddress.toLowerCase();
        assert_1.assert.doesBelongToStringEnum('eventName', eventName, token_1.TokenEvents);
        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
        assert_1.assert.isFunction('callback', callback);
        var subscriptionToken = this._subscribe(normalizedTokenAddress, eventName, indexFilterValues, artifacts_1.artifacts.Token.abi, callback);
        return subscriptionToken;
    };
    /**
     * Cancel a subscription
     * @param   subscriptionToken Subscription token returned by `subscribe()`
     */
    TokenWrapper.prototype.unsubscribe = function (subscriptionToken) {
        this._unsubscribe(subscriptionToken);
    };
    /**
     * Cancels all existing subscriptions
     */
    TokenWrapper.prototype.unsubscribeAll = function () {
        _super.prototype._unsubscribeAll.call(this);
    };
    /**
     * Gets historical logs without creating a subscription
     * @param   tokenAddress        An address of the token that emitted the logs.
     * @param   eventName           The token contract event you would like to subscribe to.
     * @param   blockRange          Block range to get logs from.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return  Array of logs that match the parameters
     */
    TokenWrapper.prototype.getLogsAsync = function (tokenAddress, eventName, blockRange, indexFilterValues) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.isETHAddressHex('tokenAddress', tokenAddress);
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        assert_1.assert.doesBelongToStringEnum('eventName', eventName, token_1.TokenEvents);
                        assert_1.assert.doesConformToSchema('blockRange', blockRange, json_schemas_1.schemas.blockRangeSchema);
                        assert_1.assert.doesConformToSchema('indexFilterValues', indexFilterValues, json_schemas_1.schemas.indexFilterValuesSchema);
                        return [4 /*yield*/, this._getLogsAsync(normalizedTokenAddress, eventName, blockRange, indexFilterValues, artifacts_1.artifacts.Token.abi)];
                    case 1:
                        logs = _a.sent();
                        return [2 /*return*/, logs];
                }
            });
        });
    };
    TokenWrapper.prototype._invalidateContractInstances = function () {
        this.unsubscribeAll();
        this._tokenContractsByAddress = {};
    };
    TokenWrapper.prototype._getTokenContractAsync = function (tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedTokenAddress, tokenContract, _a, abi, address, contractInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        normalizedTokenAddress = tokenAddress.toLowerCase();
                        tokenContract = this._tokenContractsByAddress[normalizedTokenAddress];
                        if (!_.isUndefined(tokenContract)) {
                            return [2 /*return*/, tokenContract];
                        }
                        return [4 /*yield*/, this._getContractAbiAndAddressFromArtifactsAsync(artifacts_1.artifacts.Token, normalizedTokenAddress)];
                    case 1:
                        _a = _b.sent(), abi = _a[0], address = _a[1];
                        contractInstance = new token_1.TokenContract(abi, address, this._web3Wrapper.getProvider(), this._web3Wrapper.getContractDefaults());
                        tokenContract = contractInstance;
                        this._tokenContractsByAddress[normalizedTokenAddress] = tokenContract;
                        return [2 /*return*/, tokenContract];
                }
            });
        });
    };
    return TokenWrapper;
}(contract_wrapper_1.ContractWrapper));
exports.TokenWrapper = TokenWrapper;
//# sourceMappingURL=token_wrapper.js.map