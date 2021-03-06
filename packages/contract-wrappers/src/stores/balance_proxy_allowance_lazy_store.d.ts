import { AbstractBalanceAndProxyAllowanceFetcher } from '@0xproject/order-utils';
import { BlockParamLiteral } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { TokenWrapper } from '../contract_wrappers/token_wrapper';
/**
 * Copy on read store for balances/proxyAllowances of tokens/accounts
 */
export declare class BalanceAndProxyAllowanceLazyStore implements AbstractBalanceAndProxyAllowanceFetcher {
    private _tokenWrapper;
    private _defaultBlock;
    private _balance;
    private _proxyAllowance;
    constructor(token: TokenWrapper, defaultBlock: BlockParamLiteral);
    getBalanceAsync(tokenAddress: string, userAddress: string): Promise<BigNumber>;
    setBalance(tokenAddress: string, userAddress: string, balance: BigNumber): void;
    deleteBalance(tokenAddress: string, userAddress: string): void;
    getProxyAllowanceAsync(tokenAddress: string, userAddress: string): Promise<BigNumber>;
    setProxyAllowance(tokenAddress: string, userAddress: string, proxyAllowance: BigNumber): void;
    deleteProxyAllowance(tokenAddress: string, userAddress: string): void;
    deleteAll(): void;
}
