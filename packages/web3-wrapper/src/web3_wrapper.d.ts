/// <reference types="web3" />
import { AbiDecoder, BigNumber } from '@0xproject/utils';
import { BlockParam, BlockWithoutTransactionData, CallData, ContractAbi, FilterObject, LogEntry, Provider, TransactionReceipt, TransactionReceiptWithDecodedLogs, TxData } from 'ethereum-types';
import * as Web3 from 'web3';
/**
 * A wrapper around the Web3.js 0.x library that provides a consistent, clean promise-based interface.
 */
export declare class Web3Wrapper {
    /**
     * Flag to check if this instance is of type Web3Wrapper
     */
    isZeroExWeb3Wrapper: boolean;
    abiDecoder: AbiDecoder;
    private _web3;
    private _txDefaults;
    private _jsonRpcRequestId;
    /**
     * Check if an address is a valid Ethereum address
     * @param address Address to check
     * @returns Whether the address is a valid Ethereum address
     */
    static isAddress(address: string): boolean;
    /**
     * A unit amount is defined as the amount of a token above the specified decimal places (integer part).
     * E.g: If a currency has 18 decimal places, 1e18 or one quintillion of the currency is equivalent
     * to 1 unit.
     * @param   amount      The amount in baseUnits that you would like converted to units.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in units.
     */
    static toUnitAmount(amount: BigNumber, decimals: number): BigNumber;
    /**
     * A baseUnit is defined as the smallest denomination of a token. An amount expressed in baseUnits
     * is the amount expressed in the smallest denomination.
     * E.g: 1 unit of a token with 18 decimal places is expressed in baseUnits as 1000000000000000000
     * @param   amount      The amount of units that you would like converted to baseUnits.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in baseUnits.
     */
    static toBaseUnitAmount(amount: BigNumber, decimals: number): BigNumber;
    /**
     * Convert an Ether amount from ETH to Wei
     * @param ethAmount Amount of Ether to convert to wei
     * @returns Amount in wei
     */
    static toWei(ethAmount: BigNumber): BigNumber;
    /**
     * Instantiates a new Web3Wrapper.
     * @param   provider    The Web3 provider instance you would like the Web3Wrapper to use for interacting with
     *                      the backing Ethereum node.
     * @param   txDefaults  Override TxData defaults sent with RPC requests to the backing Ethereum node.
     * @return  An instance of the Web3Wrapper class.
     */
    constructor(provider: Provider, txDefaults?: Partial<TxData>);
    /**
     * Get the contract defaults set to the Web3Wrapper instance
     * @return  TxData defaults (e.g gas, gasPrice, nonce, etc...)
     */
    getContractDefaults(): Partial<TxData>;
    /**
     * Retrieve the Web3 provider
     * @return  Web3 provider instance
     */
    getProvider(): Provider;
    /**
     * Update the used Web3 provider
     * @param provider The new Web3 provider to be set
     */
    setProvider(provider: Provider): void;
    /**
     * Check whether an address is available through the backing provider. This can be
     * useful if you want to know whether a user can sign messages or transactions from
     * a given Ethereum address.
     * @param senderAddress Address to check availability for
     * @returns Whether the address is available through the provider.
     */
    isSenderAddressAvailableAsync(senderAddress: string): Promise<boolean>;
    /**
     * Fetch the backing Ethereum node's version string (e.g `MetaMask/v4.2.0`)
     * @returns Ethereum node's version string
     */
    getNodeVersionAsync(): Promise<string>;
    /**
     * Fetches the networkId of the backing Ethereum node
     * @returns The network id
     */
    getNetworkIdAsync(): Promise<number>;
    /**
     * Retrieves the transaction receipt for a given transaction hash
     * @param txHash Transaction hash
     * @returns The transaction receipt, including it's status (0: failed, 1: succeeded or undefined: not found)
     */
    getTransactionReceiptAsync(txHash: string): Promise<TransactionReceipt>;
    /**
     * Retrieves an accounts Ether balance in wei
     * @param owner Account whose balance you wish to check
     * @returns Balance in wei
     */
    getBalanceInWeiAsync(owner: string): Promise<BigNumber>;
    /**
     * Check if a contract exists at a given address
     * @param address Address to which to check
     * @returns Whether or not contract code was found at the supplied address
     */
    doesContractExistAtAddressAsync(address: string): Promise<boolean>;
    /**
     * Sign a message with a specific address's private key (`eth_sign`)
     * @param address Address of signer
     * @param message Message to sign
     * @returns Signature string (might be VRS or RSV depending on the Signer)
     */
    signMessageAsync(address: string, message: string): Promise<string>;
    /**
     * Fetches the latest block number
     * @returns Block number
     */
    getBlockNumberAsync(): Promise<number>;
    /**
     * Fetch a specific Ethereum block
     * @param blockParam The block you wish to fetch (blockHash, blockNumber or blockLiteral)
     * @returns The requested block without transaction data
     */
    getBlockAsync(blockParam: string | BlockParam): Promise<BlockWithoutTransactionData>;
    /**
     * Fetch a block's timestamp
     * @param blockParam The block you wish to fetch (blockHash, blockNumber or blockLiteral)
     * @returns The block's timestamp
     */
    getBlockTimestampAsync(blockParam: string | BlockParam): Promise<number>;
    /**
     * Retrieve the user addresses available through the backing provider
     * @returns Available user addresses
     */
    getAvailableAddressesAsync(): Promise<string[]>;
    /**
     * Take a snapshot of the blockchain state on a TestRPC/Ganache local node
     * @returns The snapshot id. This can be used to revert to this snapshot
     */
    takeSnapshotAsync(): Promise<number>;
    /**
     * Revert the blockchain state to a previous snapshot state on TestRPC/Ganache local node
     * @param snapshotId snapshot id to revert to
     * @returns Whether the revert was successful
     */
    revertSnapshotAsync(snapshotId: number): Promise<boolean>;
    /**
     * Mine a block on a TestRPC/Ganache local node
     */
    mineBlockAsync(): Promise<void>;
    /**
     * Increase the next blocks timestamp on TestRPC/Ganache local node
     * @param timeDelta Amount of time to add in seconds
     */
    increaseTimeAsync(timeDelta: number): Promise<void>;
    /**
     * Retrieve smart contract logs for a given filter
     * @param filter Parameters by which to filter which logs to retrieve
     * @returns The corresponding log entries
     */
    getLogsAsync(filter: FilterObject): Promise<LogEntry[]>;
    /**
     * Get a Web3 contract factory instance for a given ABI
     * @param abi Smart contract ABI
     * @returns Web3 contract factory which can create Web3 Contract instances from the supplied ABI
     */
    getContractFromAbi(abi: ContractAbi): Web3.Contract<any>;
    /**
     * Calculate the estimated gas cost for a given transaction
     * @param txData Transaction data
     * @returns Estimated gas cost
     */
    estimateGasAsync(txData: Partial<TxData>): Promise<number>;
    /**
     * Call a smart contract method at a given block height
     * @param callData Call data
     * @param defaultBlock Block height at which to make the call. Defaults to `latest`
     * @returns The raw call result
     */
    callAsync(callData: CallData, defaultBlock?: BlockParam): Promise<string>;
    /**
     * Send a transaction
     * @param txData Transaction data
     * @returns Transaction hash
     */
    sendTransactionAsync(txData: TxData): Promise<string>;
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
    awaitTransactionMinedAsync(txHash: string, pollingIntervalMs?: number, timeoutMs?: number): Promise<TransactionReceiptWithDecodedLogs>;
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
    awaitTransactionSuccessAsync(txHash: string, pollingIntervalMs?: number, timeoutMs?: number): Promise<TransactionReceiptWithDecodedLogs>;
    private _sendRawPayloadAsync<A>(payload);
    private _normalizeTxReceiptStatus(status);
    private _formatLog(rawLog);
    private _hexToDecimal(hex);
}
