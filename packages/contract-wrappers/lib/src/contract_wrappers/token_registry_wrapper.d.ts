import { Token } from '@0xproject/types';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import { ContractWrapper } from './contract_wrapper';
/**
 * This class includes all the functionality related to interacting with the 0x Token Registry smart contract.
 */
export declare class TokenRegistryWrapper extends ContractWrapper {
    private _tokenRegistryContractIfExists?;
    private _contractAddressIfExists?;
    private static _createTokenFromMetadata(metadata);
    constructor(web3Wrapper: Web3Wrapper, networkId: number, contractAddressIfExists?: string);
    /**
     * Retrieves all the tokens currently listed in the Token Registry smart contract
     * @return  An array of objects that conform to the Token interface.
     */
    getTokensAsync(): Promise<Token[]>;
    /**
     * Retrieves all the addresses of the tokens currently listed in the Token Registry smart contract
     * @return  An array of token addresses.
     */
    getTokenAddressesAsync(): Promise<string[]>;
    /**
     * Retrieves a token by address currently listed in the Token Registry smart contract
     * @return  An object that conforms to the Token interface or undefined if token not found.
     */
    getTokenIfExistsAsync(address: string): Promise<Token | undefined>;
    getTokenAddressBySymbolIfExistsAsync(symbol: string): Promise<string | undefined>;
    getTokenAddressByNameIfExistsAsync(name: string): Promise<string | undefined>;
    getTokenBySymbolIfExistsAsync(symbol: string): Promise<Token | undefined>;
    getTokenByNameIfExistsAsync(name: string): Promise<Token | undefined>;
    /**
     * Retrieves the Ethereum address of the TokenRegistry contract deployed on the network
     * that the user-passed web3 provider is connected to.
     * @returns The Ethereum address of the TokenRegistry contract being used.
     */
    getContractAddress(): string;
    private _invalidateContractInstance();
    private _getTokenRegistryContractAsync();
}
