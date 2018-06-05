import { ErrorCallback, NextCallback, Subprovider } from '@0xproject/subproviders';
import { JSONRPCRequestPayload } from 'ethereum-types';
import { AbstractArtifactAdapter } from './artifact_adapters/abstract_artifact_adapter';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It collects traces of all transactions that were sent and all calls that were executed through JSON RPC.
 */
export declare class CoverageSubprovider extends Subprovider {
    private _lock;
    private _coverageManager;
    private _defaultFromAddress;
    /**
     * Instantiates a CoverageSubprovider instance
     * @param artifactAdapter Adapter for used artifacts format (0x, truffle, giveth, etc.)
     * @param defaultFromAddress default from address to use when sending transactions
     * @param isVerbose If true, we will log any unknown transactions. Otherwise we will ignore them
     */
    constructor(artifactAdapter: AbstractArtifactAdapter, defaultFromAddress: string, isVerbose?: boolean);
    /**
     * Write the test coverage results to a file in Istanbul format.
     */
    writeCoverageAsync(): Promise<void>;
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    handleRequest(payload: JSONRPCRequestPayload, next: NextCallback, end: ErrorCallback): Promise<void>;
    private _onTransactionSentAsync(txData, err, txHash, cb);
    private _onCallExecutedAsync(callData, blockNumber, err, callResult, cb);
    private _recordTxTraceAsync(address, data, txHash);
    private _recordCallTraceAsync(callData, blockNumber);
    private _getContractCodeAsync(address);
}
