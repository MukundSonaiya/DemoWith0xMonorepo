/// <reference types="web3-provider-engine" />
import ProviderEngine = require('web3-provider-engine');
export interface Web3Config {
    hasAddresses?: boolean;
    shouldUseInProcessGanache?: boolean;
    rpcUrl?: string;
}
export declare const web3Factory: {
    getRpcProvider(config?: Web3Config): ProviderEngine;
};
