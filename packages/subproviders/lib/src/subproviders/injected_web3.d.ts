import { JSONRPCRequestPayload, Provider } from 'ethereum-types';
import { Callback, ErrorCallback } from '../types';
import { Subprovider } from './subprovider';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine)
 * subprovider interface. It forwards JSON RPC requests involving user accounts (getAccounts,
 * sendTransaction, etc...) to the provider instance supplied at instantiation. All other requests
 * are passed onwards for subsequent subproviders to handle.
 */
export declare class InjectedWeb3Subprovider extends Subprovider {
    private _injectedWeb3;
    /**
     * Instantiates a new InjectedWeb3Subprovider
     * @param provider Web3 provider that should handle  all user account related requests
     */
    constructor(provider: Provider);
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    handleRequest(payload: JSONRPCRequestPayload, next: Callback, end: ErrorCallback): Promise<void>;
}
