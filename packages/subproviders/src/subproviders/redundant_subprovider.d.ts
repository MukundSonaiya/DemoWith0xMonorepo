import { JSONRPCRequestPayload } from 'ethereum-types';
import { Callback } from '../types';
import { Subprovider } from './subprovider';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * It attempts to handle each JSON RPC request by sequentially attempting to receive a valid response from one of a
 * set of JSON RPC endpoints.
 */
export declare class RedundantSubprovider extends Subprovider {
    private _subproviders;
    private static _firstSuccessAsync(subproviders, payload, next);
    /**
     * Instantiates a new RedundantSubprovider
     * @param endpoints JSON RPC endpoints to attempt. Attempts are made in the order of the endpoints.
     */
    constructor(subproviders: Subprovider[]);
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    handleRequest(payload: JSONRPCRequestPayload, next: Callback, end: (err: Error | null, data?: any) => void): Promise<void>;
}
