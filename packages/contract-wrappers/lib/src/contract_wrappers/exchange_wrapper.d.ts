import { BlockParamLiteral, DecodedLogArgs, LogEntry, LogWithDecodedArgs, Order, OrderState, SignedOrder } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import { BlockRange, EventCallback, IndexedFilterValues, MethodOpts, OrderCancellationRequest, OrderFillRequest, OrderTransactionOpts, ValidateOrderFillableOpts } from '../types';
import { ContractWrapper } from './contract_wrapper';
import { ExchangeContractEventArgs, ExchangeEvents } from './generated/exchange';
import { TokenWrapper } from './token_wrapper';
/**
 * This class includes all the functionality related to calling methods and subscribing to
 * events of the 0x Exchange smart contract.
 */
export declare class ExchangeWrapper extends ContractWrapper {
    private _exchangeContractIfExists?;
    private _orderValidationUtils;
    private _tokenWrapper;
    private _exchangeContractErrCodesToMsg;
    private _contractAddressIfExists?;
    private _zrxContractAddressIfExists?;
    constructor(web3Wrapper: Web3Wrapper, networkId: number, tokenWrapper: TokenWrapper, contractAddressIfExists?: string, zrxContractAddressIfExists?: string);
    /**
     * Returns the unavailable takerAmount of an order. Unavailable amount is defined as the total
     * amount that has been filled or cancelled. The remaining takerAmount can be calculated by
     * subtracting the unavailable amount from the total order takerAmount.
     * @param   orderHash               The hex encoded orderHash for which you would like to retrieve the
     *                                  unavailable takerAmount.
     * @param   methodOpts              Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has either been filled or cancelled.
     */
    getUnavailableTakerAmountAsync(orderHash: string, methodOpts?: MethodOpts): Promise<BigNumber>;
    /**
     * Retrieve the takerAmount of an order that has already been filled.
     * @param   orderHash    The hex encoded orderHash for which you would like to retrieve the filled takerAmount.
     * @param   methodOpts   Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has already been filled.
     */
    getFilledTakerAmountAsync(orderHash: string, methodOpts?: MethodOpts): Promise<BigNumber>;
    /**
     * Retrieve the takerAmount of an order that has been cancelled.
     * @param   orderHash    The hex encoded orderHash for which you would like to retrieve the
     *                       cancelled takerAmount.
     * @param   methodOpts   Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has been cancelled.
     */
    getCancelledTakerAmountAsync(orderHash: string, methodOpts?: MethodOpts): Promise<BigNumber>;
    /**
     * Fills a signed order with an amount denominated in baseUnits of the taker token.
     * Since the order in which transactions are included in the next block is indeterminate, race-conditions
     * could arise where a users balance or allowance changes before the fillOrder executes. Because of this,
     * we allow you to specify `shouldThrowOnInsufficientBalanceOrAllowance`.
     * If false, the smart contract will not throw if the parties
     * do not have sufficient balances/allowances, preserving gas costs. Setting it to true forgoes this check
     * and causes the smart contract to throw (using all the gas supplied) instead.
     * @param   signedOrder                                 An object that conforms to the SignedOrder interface.
     * @param   fillTakerTokenAmount                        The amount of the order (in taker tokens baseUnits) that
     *                                                      you wish to fill.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance Whether or not you wish for the contract call to throw
     *                                                      if upon execution the tokens cannot be transferred.
     * @param   takerAddress                                The user Ethereum address who would like to fill this order.
     *                                                      Must be available via the supplied Provider
     *                                                      passed to 0x.js.
     * @param   orderTransactionOpts                        Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    fillOrderAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, takerAddress: string, orderTransactionOpts?: OrderTransactionOpts): Promise<string>;
    /**
     * Sequentially and atomically fills signedOrders up to the specified takerTokenFillAmount.
     * If the fill amount is reached - it succeeds and does not fill the rest of the orders.
     * If fill amount is not reached - it fills as much of the fill amount as possible and succeeds.
     * @param   signedOrders                                The array of signedOrders that you would like to fill until
     *                                                      takerTokenFillAmount is reached.
     * @param   fillTakerTokenAmount                        The total amount of the takerTokens you would like to fill.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance Whether or not you wish for the contract call to throw if
     *                                                      upon execution any of the tokens cannot be transferred.
     *                                                      If set to false, the call will continue to fill subsequent
     *                                                      signedOrders even when some cannot be filled.
     * @param   takerAddress                                The user Ethereum address who would like to fill these
     *                                                      orders. Must be available via the supplied Provider
     *                                                      passed to 0x.js.
     * @param   orderTransactionOpts                        Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    fillOrdersUpToAsync(signedOrders: SignedOrder[], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, takerAddress: string, orderTransactionOpts?: OrderTransactionOpts): Promise<string>;
    /**
     * Batch version of fillOrderAsync.
     * Executes multiple fills atomically in a single transaction.
     * If shouldThrowOnInsufficientBalanceOrAllowance is set to false, it will continue filling subsequent orders even
     * when earlier ones fail.
     * When shouldThrowOnInsufficientBalanceOrAllowance is set to true, if any fill fails, the entire batch fails.
     * @param   orderFillRequests                               An array of objects that conform to the
     *                                                          OrderFillRequest interface.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance     Whether or not you wish for the contract call to throw
     *                                                          if upon execution any of the tokens cannot be
     *                                                          transferred. If set to false, the call will continue to
     *                                                          fill subsequent signedOrders even when some
     *                                                          cannot be filled.
     * @param   takerAddress                                    The user Ethereum address who would like to fill
     *                                                          these orders. Must be available via the supplied
     *                                                          Provider passed to 0x.js.
     * @param   orderTransactionOpts                            Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    batchFillOrdersAsync(orderFillRequests: OrderFillRequest[], shouldThrowOnInsufficientBalanceOrAllowance: boolean, takerAddress: string, orderTransactionOpts?: OrderTransactionOpts): Promise<string>;
    /**
     * Attempts to fill a specific amount of an order. If the entire amount specified cannot be filled,
     * the fill order is abandoned.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Provider passed to 0x.js.
     * @param   orderTransactionOpts    Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    fillOrKillOrderAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber, takerAddress: string, orderTransactionOpts?: OrderTransactionOpts): Promise<string>;
    /**
     * Batch version of fillOrKill. Allows a taker to specify a batch of orders that will either be atomically
     * filled (each to the specified fillAmount) or aborted.
     * @param   orderFillRequests           An array of objects that conform to the OrderFillRequest interface.
     * @param   takerAddress                The user Ethereum address who would like to fill there orders.
     *                                      Must be available via the supplied Provider passed to 0x.js.
     * @param   orderTransactionOpts        Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    batchFillOrKillAsync(orderFillRequests: OrderFillRequest[], takerAddress: string, orderTransactionOpts?: OrderTransactionOpts): Promise<string>;
    /**
     * Cancel a given fill amount of an order. Cancellations are cumulative.
     * @param   order                   An object that conforms to the Order or SignedOrder interface.
     *                                  The order you would like to cancel.
     * @param   cancelTakerTokenAmount  The amount (specified in taker tokens) that you would like to cancel.
     * @param   transactionOpts         Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    cancelOrderAsync(order: Order | SignedOrder, cancelTakerTokenAmount: BigNumber, orderTransactionOpts?: OrderTransactionOpts): Promise<string>;
    /**
     * Batch version of cancelOrderAsync. Atomically cancels multiple orders in a single transaction.
     * All orders must be from the same maker.
     * @param   orderCancellationRequests   An array of objects that conform to the OrderCancellationRequest
     *                                      interface.
     * @param   transactionOpts             Optional arguments this method accepts.
     * @return  Transaction hash.
     */
    batchCancelOrdersAsync(orderCancellationRequests: OrderCancellationRequest[], orderTransactionOpts?: OrderTransactionOpts): Promise<string>;
    /**
     * Subscribe to an event type emitted by the Exchange contract.
     * @param   eventName           The exchange contract event you would like to subscribe to.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param   callback            Callback that gets called when a log is added/removed
     * @return Subscription token used later to unsubscribe
     */
    subscribe<ArgsType extends ExchangeContractEventArgs>(eventName: ExchangeEvents, indexFilterValues: IndexedFilterValues, callback: EventCallback<ArgsType>): string;
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
     * @param   eventName           The exchange contract event you would like to subscribe to.
     * @param   blockRange          Block range to get logs from.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return  Array of logs that match the parameters
     */
    getLogsAsync<ArgsType extends ExchangeContractEventArgs>(eventName: ExchangeEvents, blockRange: BlockRange, indexFilterValues: IndexedFilterValues): Promise<Array<LogWithDecodedArgs<ArgsType>>>;
    /**
     * Retrieves the Ethereum address of the Exchange contract deployed on the network
     * that the user-passed web3 provider is connected to.
     * @returns The Ethereum address of the Exchange contract being used.
     */
    getContractAddress(): string;
    /**
     * Checks if order is still fillable and throws an error otherwise. Useful for orderbook
     * pruning where you want to remove stale orders without knowing who the taker will be.
     * @param   signedOrder     An object that conforms to the SignedOrder interface. The
     *                          signedOrder you wish to validate.
     * @param   opts            An object that conforms to the ValidateOrderFillableOpts
     *                          interface. Allows specifying a specific fillTakerTokenAmount
     *                          to validate for.
     */
    validateOrderFillableOrThrowAsync(signedOrder: SignedOrder, opts?: ValidateOrderFillableOpts): Promise<void>;
    /**
     * Checks if order fill will succeed and throws an error otherwise.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Provider passed to 0x.js.
     */
    validateFillOrderThrowIfInvalidAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber, takerAddress: string): Promise<void>;
    /**
     * Checks if cancelling a given order will succeed and throws an informative error if it won't.
     * @param   order                   An object that conforms to the Order or SignedOrder interface.
     *                                  The order you would like to cancel.
     * @param   cancelTakerTokenAmount  The amount (specified in taker tokens) that you would like to cancel.
     */
    validateCancelOrderThrowIfInvalidAsync(order: Order, cancelTakerTokenAmount: BigNumber): Promise<void>;
    /**
     * Checks if calling fillOrKill on a given order will succeed and throws an informative error if it won't.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Provider passed to 0x.js.
     */
    validateFillOrKillOrderThrowIfInvalidAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber, takerAddress: string): Promise<void>;
    /**
     * Checks if rounding error will be > 0.1% when computing makerTokenAmount by doing:
     * `(fillTakerTokenAmount * makerTokenAmount) / takerTokenAmount`.
     * 0x Protocol does not accept any trades that result in large rounding errors. This means that tokens with few or
     * no decimals can only be filled in quantities and ratios that avoid large rounding errors.
     * @param   fillTakerTokenAmount   The amount of the order (in taker tokens baseUnits) that you wish to fill.
     * @param   takerTokenAmount       The order size on the taker side
     * @param   makerTokenAmount       The order size on the maker side
     */
    isRoundingErrorAsync(fillTakerTokenAmount: BigNumber, takerTokenAmount: BigNumber, makerTokenAmount: BigNumber): Promise<boolean>;
    /**
     * Checks if logs contain LogError, which is emitted by Exchange contract on transaction failure.
     * @param   logs   Transaction logs as returned by `zeroEx.awaitTransactionMinedAsync`
     */
    throwLogErrorsAsErrors(logs: Array<LogWithDecodedArgs<DecodedLogArgs> | LogEntry>): void;
    /**
     * Gets the latest OrderState of a signedOrder
     * @param   signedOrder   The signedOrder
     * @param   stateLayer    Optional, desired blockchain state layer (defaults to latest).
     * @return  OrderState of the signedOrder
     */
    getOrderStateAsync(signedOrder: SignedOrder, stateLayer?: BlockParamLiteral): Promise<OrderState>;
    /**
     * Returns the ZRX token address used by the exchange contract.
     * @return Address of ZRX token
     */
    getZRXTokenAddress(): string;
    private _invalidateContractInstances();
    private _isValidSignatureUsingContractCallAsync(dataHex, ecSignature, signerAddressHex);
    private _getOrderHashHexUsingContractCallAsync(order);
    private _getExchangeContractAsync();
}
