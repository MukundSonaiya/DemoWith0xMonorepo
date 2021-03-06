"use strict";
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
var utils_1 = require("@0xproject/utils");
var _ = require("lodash");
var Web3 = require("web3");
var types_1 = require("./types");
var BASE_TEN = 10;
/**
 * A wrapper around the Web3.js 0.x library that provides a consistent, clean promise-based interface.
 */
var Web3Wrapper = /** @class */ (function () {
    /**
     * Instantiates a new Web3Wrapper.
     * @param   provider    The Web3 provider instance you would like the Web3Wrapper to use for interacting with
     *                      the backing Ethereum node.
     * @param   txDefaults  Override TxData defaults sent with RPC requests to the backing Ethereum node.
     * @return  An instance of the Web3Wrapper class.
     */
    function Web3Wrapper(provider, txDefaults) {
        /**
         * Flag to check if this instance is of type Web3Wrapper
         */
        this.isZeroExWeb3Wrapper = true;
        if (_.isUndefined(provider.sendAsync)) {
            // Web3@1.0 provider doesn't support synchronous http requests,
            // so it only has an async `send` method, instead of a `send` and `sendAsync` in web3@0.x.x`
            // We re-assign the send method so that Web3@1.0 providers work with @0xproject/web3-wrapper
            provider.sendAsync = provider.send;
        }
        this.abiDecoder = new utils_1.AbiDecoder([]);
        this._web3 = new Web3();
        this._web3.setProvider(provider);
        this._txDefaults = txDefaults || {};
        this._jsonRpcRequestId = 0;
    }
    /**
     * Check if an address is a valid Ethereum address
     * @param address Address to check
     * @returns Whether the address is a valid Ethereum address
     */
    Web3Wrapper.isAddress = function (address) {
        return utils_1.addressUtils.isAddress(address);
    };
    /**
     * A unit amount is defined as the amount of a token above the specified decimal places (integer part).
     * E.g: If a currency has 18 decimal places, 1e18 or one quintillion of the currency is equivalent
     * to 1 unit.
     * @param   amount      The amount in baseUnits that you would like converted to units.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in units.
     */
    Web3Wrapper.toUnitAmount = function (amount, decimals) {
        var aUnit = new utils_1.BigNumber(BASE_TEN).pow(decimals);
        var unit = amount.div(aUnit);
        return unit;
    };
    /**
     * A baseUnit is defined as the smallest denomination of a token. An amount expressed in baseUnits
     * is the amount expressed in the smallest denomination.
     * E.g: 1 unit of a token with 18 decimal places is expressed in baseUnits as 1000000000000000000
     * @param   amount      The amount of units that you would like converted to baseUnits.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in baseUnits.
     */
    Web3Wrapper.toBaseUnitAmount = function (amount, decimals) {
        var unit = new utils_1.BigNumber(BASE_TEN).pow(decimals);
        var baseUnitAmount = amount.times(unit);
        var hasDecimals = baseUnitAmount.decimalPlaces() !== 0;
        if (hasDecimals) {
            throw new Error("Invalid unit amount: " + amount.toString() + " - Too many decimal places");
        }
        return baseUnitAmount;
    };
    /**
     * Convert an Ether amount from ETH to Wei
     * @param ethAmount Amount of Ether to convert to wei
     * @returns Amount in wei
     */
    Web3Wrapper.toWei = function (ethAmount) {
        var ETH_DECIMALS = 18;
        var balanceWei = Web3Wrapper.toBaseUnitAmount(ethAmount, ETH_DECIMALS);
        return balanceWei;
    };
    /**
     * Get the contract defaults set to the Web3Wrapper instance
     * @return  TxData defaults (e.g gas, gasPrice, nonce, etc...)
     */
    Web3Wrapper.prototype.getContractDefaults = function () {
        return this._txDefaults;
    };
    /**
     * Retrieve the Web3 provider
     * @return  Web3 provider instance
     */
    Web3Wrapper.prototype.getProvider = function () {
        return this._web3.currentProvider;
    };
    /**
     * Update the used Web3 provider
     * @param provider The new Web3 provider to be set
     */
    Web3Wrapper.prototype.setProvider = function (provider) {
        this._web3.setProvider(provider);
    };
    /**
     * Check whether an address is available through the backing provider. This can be
     * useful if you want to know whether a user can sign messages or transactions from
     * a given Ethereum address.
     * @param senderAddress Address to check availability for
     * @returns Whether the address is available through the provider.
     */
    Web3Wrapper.prototype.isSenderAddressAvailableAsync = function (senderAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var addresses, normalizedAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAvailableAddressesAsync()];
                    case 1:
                        addresses = _a.sent();
                        normalizedAddress = senderAddress.toLowerCase();
                        return [2 /*return*/, _.includes(addresses, normalizedAddress)];
                }
            });
        });
    };
    /**
     * Fetch the backing Ethereum node's version string (e.g `MetaMask/v4.2.0`)
     * @returns Ethereum node's version string
     */
    Web3Wrapper.prototype.getNodeVersionAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodeVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRawPayloadAsync({ method: 'web3_clientVersion' })];
                    case 1:
                        nodeVersion = _a.sent();
                        return [2 /*return*/, nodeVersion];
                }
            });
        });
    };
    /**
     * Fetches the networkId of the backing Ethereum node
     * @returns The network id
     */
    Web3Wrapper.prototype.getNetworkIdAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var networkIdStr, networkId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRawPayloadAsync({ method: 'net_version' })];
                    case 1:
                        networkIdStr = _a.sent();
                        networkId = _.parseInt(networkIdStr);
                        return [2 /*return*/, networkId];
                }
            });
        });
    };
    /**
     * Retrieves the transaction receipt for a given transaction hash
     * @param txHash Transaction hash
     * @returns The transaction receipt, including it's status (0: failed, 1: succeeded or undefined: not found)
     */
    Web3Wrapper.prototype.getTransactionReceiptAsync = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionReceipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.getTransactionReceipt)(txHash)];
                    case 1:
                        transactionReceipt = _a.sent();
                        if (!_.isNull(transactionReceipt)) {
                            transactionReceipt.status = this._normalizeTxReceiptStatus(transactionReceipt.status);
                        }
                        return [2 /*return*/, transactionReceipt];
                }
            });
        });
    };
    /**
     * Retrieves an accounts Ether balance in wei
     * @param owner Account whose balance you wish to check
     * @returns Balance in wei
     */
    Web3Wrapper.prototype.getBalanceInWeiAsync = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var balanceInWei;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.getBalance)(owner)];
                    case 1:
                        balanceInWei = _a.sent();
                        // Rewrap in a new BigNumber
                        balanceInWei = new utils_1.BigNumber(balanceInWei);
                        return [2 /*return*/, balanceInWei];
                }
            });
        });
    };
    /**
     * Check if a contract exists at a given address
     * @param address Address to which to check
     * @returns Whether or not contract code was found at the supplied address
     */
    Web3Wrapper.prototype.doesContractExistAtAddressAsync = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var code, isCodeEmpty;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.getCode)(address)];
                    case 1:
                        code = _a.sent();
                        isCodeEmpty = /^0x0{0,40}$/i.test(code);
                        return [2 /*return*/, !isCodeEmpty];
                }
            });
        });
    };
    /**
     * Sign a message with a specific address's private key (`eth_sign`)
     * @param address Address of signer
     * @param message Message to sign
     * @returns Signature string (might be VRS or RSV depending on the Signer)
     */
    Web3Wrapper.prototype.signMessageAsync = function (address, message) {
        return __awaiter(this, void 0, void 0, function () {
            var signData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.sign)(address, message)];
                    case 1:
                        signData = _a.sent();
                        return [2 /*return*/, signData];
                }
            });
        });
    };
    /**
     * Fetches the latest block number
     * @returns Block number
     */
    Web3Wrapper.prototype.getBlockNumberAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blockNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.getBlockNumber)()];
                    case 1:
                        blockNumber = _a.sent();
                        return [2 /*return*/, blockNumber];
                }
            });
        });
    };
    /**
     * Fetch a specific Ethereum block
     * @param blockParam The block you wish to fetch (blockHash, blockNumber or blockLiteral)
     * @returns The requested block without transaction data
     */
    Web3Wrapper.prototype.getBlockAsync = function (blockParam) {
        return __awaiter(this, void 0, void 0, function () {
            var block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.getBlock)(blockParam)];
                    case 1:
                        block = _a.sent();
                        return [2 /*return*/, block];
                }
            });
        });
    };
    /**
     * Fetch a block's timestamp
     * @param blockParam The block you wish to fetch (blockHash, blockNumber or blockLiteral)
     * @returns The block's timestamp
     */
    Web3Wrapper.prototype.getBlockTimestampAsync = function (blockParam) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBlockAsync(blockParam)];
                    case 1:
                        timestamp = (_a.sent()).timestamp;
                        return [2 /*return*/, timestamp];
                }
            });
        });
    };
    /**
     * Retrieve the user addresses available through the backing provider
     * @returns Available user addresses
     */
    Web3Wrapper.prototype.getAvailableAddressesAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var addresses, normalizedAddresses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.getAccounts)()];
                    case 1:
                        addresses = _a.sent();
                        normalizedAddresses = _.map(addresses, function (address) { return address.toLowerCase(); });
                        return [2 /*return*/, normalizedAddresses];
                }
            });
        });
    };
    /**
     * Take a snapshot of the blockchain state on a TestRPC/Ganache local node
     * @returns The snapshot id. This can be used to revert to this snapshot
     */
    Web3Wrapper.prototype.takeSnapshotAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var snapshotId, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this._sendRawPayloadAsync({ method: 'evm_snapshot', params: [] })];
                    case 1:
                        snapshotId = _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/, snapshotId];
                }
            });
        });
    };
    /**
     * Revert the blockchain state to a previous snapshot state on TestRPC/Ganache local node
     * @param snapshotId snapshot id to revert to
     * @returns Whether the revert was successful
     */
    Web3Wrapper.prototype.revertSnapshotAsync = function (snapshotId) {
        return __awaiter(this, void 0, void 0, function () {
            var didRevert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRawPayloadAsync({ method: 'evm_revert', params: [snapshotId] })];
                    case 1:
                        didRevert = _a.sent();
                        return [2 /*return*/, didRevert];
                }
            });
        });
    };
    /**
     * Mine a block on a TestRPC/Ganache local node
     */
    Web3Wrapper.prototype.mineBlockAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRawPayloadAsync({ method: 'evm_mine', params: [] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Increase the next blocks timestamp on TestRPC/Ganache local node
     * @param timeDelta Amount of time to add in seconds
     */
    Web3Wrapper.prototype.increaseTimeAsync = function (timeDelta) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._sendRawPayloadAsync({ method: 'evm_increaseTime', params: [timeDelta] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieve smart contract logs for a given filter
     * @param filter Parameters by which to filter which logs to retrieve
     * @returns The corresponding log entries
     */
    Web3Wrapper.prototype.getLogsAsync = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var fromBlock, toBlock, serializedFilter, payload, rawLogs, formattedLogs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromBlock = filter.fromBlock;
                        if (_.isNumber(fromBlock)) {
                            fromBlock = this._web3.toHex(fromBlock);
                        }
                        toBlock = filter.toBlock;
                        if (_.isNumber(toBlock)) {
                            toBlock = this._web3.toHex(toBlock);
                        }
                        serializedFilter = __assign({}, filter, { fromBlock: fromBlock,
                            toBlock: toBlock });
                        payload = {
                            jsonrpc: '2.0',
                            id: this._jsonRpcRequestId++,
                            method: 'eth_getLogs',
                            params: [serializedFilter],
                        };
                        return [4 /*yield*/, this._sendRawPayloadAsync(payload)];
                    case 1:
                        rawLogs = _a.sent();
                        formattedLogs = _.map(rawLogs, this._formatLog.bind(this));
                        return [2 /*return*/, formattedLogs];
                }
            });
        });
    };
    /**
     * Get a Web3 contract factory instance for a given ABI
     * @param abi Smart contract ABI
     * @returns Web3 contract factory which can create Web3 Contract instances from the supplied ABI
     */
    Web3Wrapper.prototype.getContractFromAbi = function (abi) {
        var web3Contract = this._web3.eth.contract(abi);
        return web3Contract;
    };
    /**
     * Calculate the estimated gas cost for a given transaction
     * @param txData Transaction data
     * @returns Estimated gas cost
     */
    Web3Wrapper.prototype.estimateGasAsync = function (txData) {
        return __awaiter(this, void 0, void 0, function () {
            var gas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.estimateGas)(txData)];
                    case 1:
                        gas = _a.sent();
                        return [2 /*return*/, gas];
                }
            });
        });
    };
    /**
     * Call a smart contract method at a given block height
     * @param callData Call data
     * @param defaultBlock Block height at which to make the call. Defaults to `latest`
     * @returns The raw call result
     */
    Web3Wrapper.prototype.callAsync = function (callData, defaultBlock) {
        return __awaiter(this, void 0, void 0, function () {
            var rawCallResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.call)(callData, defaultBlock)];
                    case 1:
                        rawCallResult = _a.sent();
                        return [2 /*return*/, rawCallResult];
                }
            });
        });
    };
    /**
     * Send a transaction
     * @param txData Transaction data
     * @returns Transaction hash
     */
    Web3Wrapper.prototype.sendTransactionAsync = function (txData) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.promisify(this._web3.eth.sendTransaction)(txData)];
                    case 1:
                        txHash = _a.sent();
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    /**
     * Waits for a transaction to be mined and returns the transaction receipt.
     * Note that just because a transaction was mined does not mean it was
     * successful. You need to check the status code of the transaction receipt
     * to find out if it was successful, or use the helper method
     * awaitTransactionSuccessAsync.
     * @param   txHash            Transaction hash
     * @param   pollingIntervalMs How often (in ms) should we check if the transaction is mined.
     * @param   timeoutMs         How long (in ms) to poll for transaction mined until aborting.
     * @return  Transaction receipt with decoded log args.
     */
    Web3Wrapper.prototype.awaitTransactionMinedAsync = function (txHash, pollingIntervalMs, timeoutMs) {
        if (pollingIntervalMs === void 0) { pollingIntervalMs = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var wasTimeoutExceeded, txReceiptPromise, txReceipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wasTimeoutExceeded = false;
                        if (timeoutMs) {
                            setTimeout(function () { return (wasTimeoutExceeded = true); }, timeoutMs);
                        }
                        txReceiptPromise = new Promise(function (resolve, reject) {
                            var intervalId = utils_1.intervalUtils.setAsyncExcludingInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                                var transactionReceipt, logsWithDecodedArgs, transactionReceiptWithDecodedLogArgs;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (wasTimeoutExceeded) {
                                                utils_1.intervalUtils.clearAsyncExcludingInterval(intervalId);
                                                return [2 /*return*/, reject(types_1.Web3WrapperErrors.TransactionMiningTimeout)];
                                            }
                                            return [4 /*yield*/, this.getTransactionReceiptAsync(txHash)];
                                        case 1:
                                            transactionReceipt = _a.sent();
                                            if (!_.isNull(transactionReceipt)) {
                                                utils_1.intervalUtils.clearAsyncExcludingInterval(intervalId);
                                                logsWithDecodedArgs = _.map(transactionReceipt.logs, this.abiDecoder.tryToDecodeLogOrNoop.bind(this.abiDecoder));
                                                transactionReceiptWithDecodedLogArgs = __assign({}, transactionReceipt, { logs: logsWithDecodedArgs });
                                                resolve(transactionReceiptWithDecodedLogArgs);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, pollingIntervalMs, function (err) {
                                utils_1.intervalUtils.clearAsyncExcludingInterval(intervalId);
                                reject(err);
                            });
                        });
                        return [4 /*yield*/, txReceiptPromise];
                    case 1:
                        txReceipt = _a.sent();
                        return [2 /*return*/, txReceipt];
                }
            });
        });
    };
    /**
     * Waits for a transaction to be mined and returns the transaction receipt.
     * Unlike awaitTransactionMinedAsync, it will throw if the receipt has a
     * status that is not equal to 1. A status of 0 or null indicates that the
     * transaction was mined, but failed. See:
     * https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethgettransactionreceipt
     * @param   txHash            Transaction hash
     * @param   pollingIntervalMs How often (in ms) should we check if the transaction is mined.
     * @param   timeoutMs         How long (in ms) to poll for transaction mined until aborting.
     * @return  Transaction receipt with decoded log args.
     */
    Web3Wrapper.prototype.awaitTransactionSuccessAsync = function (txHash, pollingIntervalMs, timeoutMs) {
        if (pollingIntervalMs === void 0) { pollingIntervalMs = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.awaitTransactionMinedAsync(txHash, pollingIntervalMs, timeoutMs)];
                    case 1:
                        receipt = _a.sent();
                        if (receipt.status !== 1) {
                            throw new Error("Transaction failed: " + txHash);
                        }
                        return [2 /*return*/, receipt];
                }
            });
        });
    };
    Web3Wrapper.prototype._sendRawPayloadAsync = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var sendAsync, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sendAsync = this._web3.currentProvider.sendAsync.bind(this._web3.currentProvider);
                        return [4 /*yield*/, utils_1.promisify(sendAsync)(payload)];
                    case 1:
                        response = _a.sent();
                        result = response.result;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Web3Wrapper.prototype._normalizeTxReceiptStatus = function (status) {
        // Transaction status might have four values
        // undefined - Testrpc and other old clients
        // null - New clients on old transactions
        // number - Parity
        // hex - Geth
        if (_.isString(status)) {
            return this._web3.toDecimal(status);
        }
        else if (_.isUndefined(status)) {
            return null;
        }
        else {
            return status;
        }
    };
    Web3Wrapper.prototype._formatLog = function (rawLog) {
        var formattedLog = __assign({}, rawLog, { logIndex: this._hexToDecimal(rawLog.logIndex), blockNumber: this._hexToDecimal(rawLog.blockNumber), transactionIndex: this._hexToDecimal(rawLog.transactionIndex) });
        return formattedLog;
    };
    Web3Wrapper.prototype._hexToDecimal = function (hex) {
        if (_.isNull(hex)) {
            return null;
        }
        var decimal = this._web3.toDecimal(hex);
        return decimal;
    };
    return Web3Wrapper;
}());
exports.Web3Wrapper = Web3Wrapper;
//# sourceMappingURL=web3_wrapper.js.map