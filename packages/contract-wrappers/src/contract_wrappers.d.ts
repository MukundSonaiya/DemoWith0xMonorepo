import { Provider } from '@0xproject/types';
import { EtherTokenWrapper } from './contract_wrappers/ether_token_wrapper';
import { ExchangeWrapper } from './contract_wrappers/exchange_wrapper';
import { TokenRegistryWrapper } from './contract_wrappers/token_registry_wrapper';
import { TokenTransferProxyWrapper } from './contract_wrappers/token_transfer_proxy_wrapper';
import { TokenWrapper } from './contract_wrappers/token_wrapper';
import { ContractWrappersConfig } from './types';
/**
 * The ContractWrappers class contains smart contract wrappers helpful when building on 0x protocol.
 */
export declare class ContractWrappers {
    /**
     * An instance of the ExchangeWrapper class containing methods for interacting with the 0x Exchange smart contract.
     */
    exchange: ExchangeWrapper;
    /**
     * An instance of the TokenRegistryWrapper class containing methods for interacting with the 0x
     * TokenRegistry smart contract.
     */
    tokenRegistry: TokenRegistryWrapper;
    /**
     * An instance of the TokenWrapper class containing methods for interacting with any ERC20 token smart contract.
     */
    token: TokenWrapper;
    /**
     * An instance of the EtherTokenWrapper class containing methods for interacting with the
     * wrapped ETH ERC20 token smart contract.
     */
    etherToken: EtherTokenWrapper;
    /**
     * An instance of the TokenTransferProxyWrapper class containing methods for interacting with the
     * tokenTransferProxy smart contract.
     */
    proxy: TokenTransferProxyWrapper;
    private _web3Wrapper;
    /**
     * Instantiates a new ContractWrappers instance.
     * @param   provider    The Provider instance you would like the 0x.js library to use for interacting with
     *                      the Ethereum network.
     * @param   config      The configuration object. Look up the type for the description.
     * @return  An instance of the ContractWrappers class.
     */
    constructor(provider: Provider, config: ContractWrappersConfig);
    /**
     * Sets a new web3 provider for 0x.js. Updating the provider will stop all
     * subscriptions so you will need to re-subscribe to all events relevant to your app after this call.
     * @param   provider    The Web3Provider you would like the 0x.js library to use from now on.
     * @param   networkId   The id of the network your provider is connected to
     */
    setProvider(provider: Provider, networkId: number): void;
    /**
     * Get the provider instance currently used by 0x.js
     * @return  Web3 provider instance
     */
    getProvider(): Provider;
}
