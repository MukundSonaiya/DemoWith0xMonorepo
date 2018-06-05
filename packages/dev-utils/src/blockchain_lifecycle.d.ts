import { Web3Wrapper } from '@0xproject/web3-wrapper';
export declare class BlockchainLifecycle {
    private _web3Wrapper;
    private _snapshotIdsStack;
    constructor(web3Wrapper: Web3Wrapper);
    startAsync(): Promise<void>;
    revertAsync(): Promise<void>;
}
