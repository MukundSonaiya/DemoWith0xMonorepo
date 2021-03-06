import { AbstractOrderFilledCancelledFetcher } from '@0xproject/order-utils';
import { BlockParamLiteral } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { ExchangeWrapper } from '../contract_wrappers/exchange_wrapper';
/**
 * Copy on read store for filled/cancelled taker amounts
 */
export declare class OrderFilledCancelledLazyStore implements AbstractOrderFilledCancelledFetcher {
    private _exchangeWrapper;
    private _defaultBlock;
    private _filledTakerAmount;
    private _cancelledTakerAmount;
    constructor(exchange: ExchangeWrapper, defaultBlock: BlockParamLiteral);
    getFilledTakerAmountAsync(orderHash: string): Promise<BigNumber>;
    setFilledTakerAmount(orderHash: string, filledTakerAmount: BigNumber): void;
    deleteFilledTakerAmount(orderHash: string): void;
    getCancelledTakerAmountAsync(orderHash: string): Promise<BigNumber>;
    setCancelledTakerAmount(orderHash: string, cancelledTakerAmount: BigNumber): void;
    deleteCancelledTakerAmount(orderHash: string): void;
    deleteAll(): void;
    getUnavailableTakerAmountAsync(orderHash: string): Promise<BigNumber>;
    getZRXTokenAddress(): string;
}
