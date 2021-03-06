import { Order, SignedOrder } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { ExchangeWrapper } from '../contract_wrappers/exchange_wrapper';
import { ExchangeTransferSimulator } from './exchange_transfer_simulator';
export declare class OrderValidationUtils {
    private _exchangeWrapper;
    static validateCancelOrderThrowIfInvalid(order: Order, cancelTakerTokenAmount: BigNumber, unavailableTakerTokenAmount: BigNumber): void;
    static validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTradeEmulator: ExchangeTransferSimulator, signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber, senderAddress: string, zrxTokenAddress: string): Promise<void>;
    private static _validateRemainingFillAmountNotZeroOrThrow(takerTokenAmount, unavailableTakerTokenAmount);
    private static _validateOrderNotExpiredOrThrow(expirationUnixTimestampSec);
    private static _getPartialAmount(numerator, denominator, target);
    constructor(exchangeWrapper: ExchangeWrapper);
    validateOrderFillableOrThrowAsync(exchangeTradeEmulator: ExchangeTransferSimulator, signedOrder: SignedOrder, zrxTokenAddress: string, expectedFillTakerTokenAmount?: BigNumber): Promise<void>;
    validateFillOrderThrowIfInvalidAsync(exchangeTradeEmulator: ExchangeTransferSimulator, signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber, takerAddress: string, zrxTokenAddress: string): Promise<BigNumber>;
    validateFillOrKillOrderThrowIfInvalidAsync(exchangeTradeEmulator: ExchangeTransferSimulator, signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber, takerAddress: string, zrxTokenAddress: string): Promise<void>;
}
