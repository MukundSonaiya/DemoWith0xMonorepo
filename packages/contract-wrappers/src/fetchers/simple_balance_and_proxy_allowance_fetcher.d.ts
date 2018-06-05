import { AbstractBalanceAndProxyAllowanceFetcher } from '@0xproject/order-utils';
import { BlockParamLiteral } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { TokenWrapper } from '../contract_wrappers/token_wrapper';
export declare class SimpleBalanceAndProxyAllowanceFetcher implements AbstractBalanceAndProxyAllowanceFetcher {
    private _tokenWrapper;
    private _defaultBlock;
    constructor(token: TokenWrapper, defaultBlock: BlockParamLiteral);
    getBalanceAsync(tokenAddress: string, userAddress: string): Promise<BigNumber>;
    getProxyAllowanceAsync(tokenAddress: string, userAddress: string): Promise<BigNumber>;
}
