import { BlockParamLiteral } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { TokenWrapper } from '../contract_wrappers/token_wrapper';
import { TradeSide, TransferType } from '../types';
export declare class ExchangeTransferSimulator {
    private _store;
    private _UNLIMITED_ALLOWANCE_IN_BASE_UNITS;
    private static _throwValidationError(failureReason, tradeSide, transferType);
    constructor(token: TokenWrapper, defaultBlock: BlockParamLiteral);
    /**
     * Simulates transferFrom call performed by a proxy
     * @param  tokenAddress      Address of the token to be transferred
     * @param  from              Owner of the transferred tokens
     * @param  to                Recipient of the transferred tokens
     * @param  amountInBaseUnits The amount of tokens being transferred
     * @param  tradeSide         Is Maker/Taker transferring
     * @param  transferType      Is it a fee payment or a value transfer
     */
    transferFromAsync(tokenAddress: string, from: string, to: string, amountInBaseUnits: BigNumber, tradeSide: TradeSide, transferType: TransferType): Promise<void>;
    private _decreaseProxyAllowanceAsync(tokenAddress, userAddress, amountInBaseUnits);
    private _increaseBalanceAsync(tokenAddress, userAddress, amountInBaseUnits);
    private _decreaseBalanceAsync(tokenAddress, userAddress, amountInBaseUnits);
}
