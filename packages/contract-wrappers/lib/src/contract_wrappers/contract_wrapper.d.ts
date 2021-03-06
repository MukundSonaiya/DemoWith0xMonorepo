import { Artifact, ContractAbi, LogEntry, LogWithDecodedArgs, RawLog } from '@0xproject/types';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import { BlockRange, ContractEventArgs, ContractEvents, EventCallback, IndexedFilterValues } from '../types';
export declare class ContractWrapper {
    protected _web3Wrapper: Web3Wrapper;
    protected _networkId: number;
    private _blockAndLogStreamerIfExists?;
    private _blockAndLogStreamIntervalIfExists?;
    private _filters;
    private _filterCallbacks;
    private _onLogAddedSubscriptionToken;
    private _onLogRemovedSubscriptionToken;
    constructor(web3Wrapper: Web3Wrapper, networkId: number);
    protected _unsubscribeAll(): void;
    protected _unsubscribe(filterToken: string, err?: Error): void;
    protected _subscribe<ArgsType extends ContractEventArgs>(address: string, eventName: ContractEvents, indexFilterValues: IndexedFilterValues, abi: ContractAbi, callback: EventCallback<ArgsType>): string;
    protected _getLogsAsync<ArgsType extends ContractEventArgs>(address: string, eventName: ContractEvents, blockRange: BlockRange, indexFilterValues: IndexedFilterValues, abi: ContractAbi): Promise<Array<LogWithDecodedArgs<ArgsType>>>;
    protected _tryToDecodeLogOrNoop<ArgsType extends ContractEventArgs>(log: LogEntry): LogWithDecodedArgs<ArgsType> | RawLog;
    protected _getContractAbiAndAddressFromArtifactsAsync(artifact: Artifact, addressIfExists?: string): Promise<[ContractAbi, string]>;
    protected _getContractAddress(artifact: Artifact, addressIfExists?: string): string;
    private _onLogStateChanged<ArgsType>(isRemoved, log);
    private _startBlockAndLogStream();
    private _onReconcileBlockError(err);
    private _setNetworkId(networkId);
    private _stopBlockAndLogStream();
    private _reconcileBlockAsync();
}
