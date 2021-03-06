import { LogWithDecodedArgs } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import { BlockRange, EventCallback, IndexedFilterValues, MethodOpts, TransactionOpts } from '../types';
import { ContractWrapper } from './contract_wrapper';
import { TokenContractEventArgs, TokenEvents } from './generated/token';
import { TokenTransferProxyWrapper } from './token_transfer_proxy_wrapper';
/**
 * This class includes all the functionality related to interacting with ERC20 token contracts.
 * All ERC20 method calls are supported, along with some convenience methods for getting/setting allowances
 * to the 0x Proxy smart contract.
 */
export declare class TokenWrapper extends ContractWrapper {
    UNLIMITED_ALLOWANCE_IN_BASE_UNITS: BigNumber;
    private _tokenContractsByAddress;
    private _tokenTransferProxyWrapper;
    constructor(web3Wrapper: Web3Wrapper, networkId: number, tokenTransferProxyWrapper: TokenTransferProxyWrapper);
    /**
     * Retrieves an owner's ERC20 token balance.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose balance you would like to check.
     * @param   methodOpts      Optional arguments this method accepts.
     * @return  The owner's ERC20 token balance in base units.
     */
    getBalanceAsync(tokenAddress: string, ownerAddress: string, methodOpts?: MethodOpts): Promise<BigNumber>;
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
    setAllowanceAsync(tokenAddress: string, ownerAddress: string, spenderAddress: string, amountInBaseUnits: BigNumber, txOpts?: TransactionOpts): Promise<string>;
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
    setUnlimitedAllowanceAsync(tokenAddress: string, ownerAddress: string, spenderAddress: string, txOpts?: TransactionOpts): Promise<string>;
    /**
     * Retrieves the owners allowance in baseUnits set to the spender's address.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose allowance to spenderAddress
     *                          you would like to retrieve.
     * @param   spenderAddress  The hex encoded user Ethereum address who can spend the allowance you are fetching.
     * @param   methodOpts      Optional arguments this method accepts.
     */
    getAllowanceAsync(tokenAddress: string, ownerAddress: string, spenderAddress: string, methodOpts?: MethodOpts): Promise<BigNumber>;
    /**
     * Retrieves the owner's allowance in baseUnits set to the 0x proxy contract.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose proxy contract allowance we are retrieving.
     * @param   methodOpts      Optional arguments this method accepts.
     */
    getProxyAllowanceAsync(tokenAddress: string, ownerAddress: string, methodOpts?: MethodOpts): Promise<BigNumber>;
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
    setProxyAllowanceAsync(tokenAddress: string, ownerAddress: string, amountInBaseUnits: BigNumber, txOpts?: TransactionOpts): Promise<string>;
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
    setUnlimitedProxyAllowanceAsync(tokenAddress: string, ownerAddress: string, txOpts?: TransactionOpts): Promise<string>;
    /**
     * Transfers `amountInBaseUnits` ERC20 tokens from `fromAddress` to `toAddress`.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   fromAddress         The hex encoded user Ethereum address that will send the funds.
     * @param   toAddress           The hex encoded user Ethereum address that will receive the funds.
     * @param   amountInBaseUnits   The amount (specified in baseUnits) of the token to transfer.
     * @param   txOpts              Transaction parameters.
     * @return Transaction hash.
     */
    transferAsync(tokenAddress: string, fromAddress: string, toAddress: string, amountInBaseUnits: BigNumber, txOpts?: TransactionOpts): Promise<string>;
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
    transferFromAsync(tokenAddress: string, fromAddress: string, toAddress: string, senderAddress: string, amountInBaseUnits: BigNumber, txOpts?: TransactionOpts): Promise<string>;
    /**
     * Subscribe to an event type emitted by the Token contract.
     * @param   tokenAddress        The hex encoded address where the ERC20 token is deployed.
     * @param   eventName           The token contract event you would like to subscribe to.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param   callback            Callback that gets called when a log is added/removed
     * @return Subscription token used later to unsubscribe
     */
    subscribe<ArgsType extends TokenContractEventArgs>(tokenAddress: string, eventName: TokenEvents, indexFilterValues: IndexedFilterValues, callback: EventCallback<ArgsType>): string;
    /**
     * Cancel a subscription
     * @param   subscriptionToken Subscription token returned by `subscribe()`
     */
    unsubscribe(subscriptionToken: string): void;
    /**
     * Cancels all existing subscriptions
     */
    unsubscribeAll(): void;
    /**
     * Gets historical logs without creating a subscription
     * @param   tokenAddress        An address of the token that emitted the logs.
     * @param   eventName           The token contract event you would like to subscribe to.
     * @param   blockRange          Block range to get logs from.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return  Array of logs that match the parameters
     */
    getLogsAsync<ArgsType extends TokenContractEventArgs>(tokenAddress: string, eventName: TokenEvents, blockRange: BlockRange, indexFilterValues: IndexedFilterValues): Promise<Array<LogWithDecodedArgs<ArgsType>>>;
    private _invalidateContractInstances();
    private _getTokenContractAsync(tokenAddress);
}
