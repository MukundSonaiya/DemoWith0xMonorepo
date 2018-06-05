import { AbstractOrderFilledCancelledFetcher } from '@0xproject/order-utils';
import { BlockParamLiteral } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { ExchangeWrapper } from '../contract_wrappers/exchange_wrapper';
export declare class SimpleOrderFilledCancelledFetcher implements AbstractOrderFilledCancelledFetcher {
    private _exchangeWrapper;
    private _defaultBlock;
    constructor(exchange: ExchangeWrapper, defaultBlock: BlockParamLiteral);
    getFilledTakerAmountAsync(orderHash: string): Promise<BigNumber>;
    getCancelledTakerAmountAsync(orderHash: string): Promise<BigNumber>;
    getUnavailableTakerAmountAsync(orderHash: string): Promise<BigNumber>;
    getZRXTokenAddress(): string;
}
