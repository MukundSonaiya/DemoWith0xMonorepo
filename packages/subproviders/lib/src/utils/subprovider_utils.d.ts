/// <reference types="web3-provider-engine" />
import ProviderEngine = require('web3-provider-engine');
import { Subprovider } from '../subproviders/subprovider';
/**
 * Prepends a subprovider to a provider
 * @param provider    Given provider
 * @param subprovider Subprovider to prepend
 */
export declare function prependSubprovider(provider: ProviderEngine, subprovider: Subprovider): void;
