/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x-monorepo/tree/development/packages/contract_templates.
 */
import { BaseContract } from '@0xproject/base-contract';
import { ContractArtifact } from '@0xproject/sol-compiler';
import { BlockParamLiteral, CallData, ContractAbi, DecodedLogArgs, Provider, TxData } from 'ethereum-types';
import { BigNumber } from '@0xproject/utils';
export declare type TokenRegistryContractEventArgs = LogAddTokenContractEventArgs | LogRemoveTokenContractEventArgs | LogTokenNameChangeContractEventArgs | LogTokenSymbolChangeContractEventArgs | LogTokenIpfsHashChangeContractEventArgs | LogTokenSwarmHashChangeContractEventArgs;
export declare enum TokenRegistryEvents {
    LogAddToken = "LogAddToken",
    LogRemoveToken = "LogRemoveToken",
    LogTokenNameChange = "LogTokenNameChange",
    LogTokenSymbolChange = "LogTokenSymbolChange",
    LogTokenIpfsHashChange = "LogTokenIpfsHashChange",
    LogTokenSwarmHashChange = "LogTokenSwarmHashChange",
}
export interface LogAddTokenContractEventArgs extends DecodedLogArgs {
    token: string;
    name: string;
    symbol: string;
    decimals: number;
    ipfsHash: string;
    swarmHash: string;
}
export interface LogRemoveTokenContractEventArgs extends DecodedLogArgs {
    token: string;
    name: string;
    symbol: string;
    decimals: number;
    ipfsHash: string;
    swarmHash: string;
}
export interface LogTokenNameChangeContractEventArgs extends DecodedLogArgs {
    token: string;
    oldName: string;
    newName: string;
}
export interface LogTokenSymbolChangeContractEventArgs extends DecodedLogArgs {
    token: string;
    oldSymbol: string;
    newSymbol: string;
}
export interface LogTokenIpfsHashChangeContractEventArgs extends DecodedLogArgs {
    token: string;
    oldIpfsHash: string;
    newIpfsHash: string;
}
export interface LogTokenSwarmHashChangeContractEventArgs extends DecodedLogArgs {
    token: string;
    oldSwarmHash: string;
    newSwarmHash: string;
}
export declare class TokenRegistryContract extends BaseContract {
    removeToken: {
        sendTransactionAsync(_token: string, _index: BigNumber, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_token: string, _index: BigNumber, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_token: string, _index: BigNumber): string;
    };
    getTokenAddressByName: {
        callAsync(_name: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    getTokenAddressBySymbol: {
        callAsync(_symbol: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    setTokenSwarmHash: {
        sendTransactionAsync(_token: string, _swarmHash: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_token: string, _swarmHash: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_token: string, _swarmHash: string): string;
    };
    getTokenMetaData: {
        callAsync(_token: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<[string, string, string, number, string, string]>;
    };
    owner: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    addToken: {
        sendTransactionAsync(_token: string, _name: string, _symbol: string, _decimals: number | BigNumber, _ipfsHash: string, _swarmHash: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_token: string, _name: string, _symbol: string, _decimals: number | BigNumber, _ipfsHash: string, _swarmHash: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_token: string, _name: string, _symbol: string, _decimals: number | BigNumber, _ipfsHash: string, _swarmHash: string): string;
    };
    setTokenName: {
        sendTransactionAsync(_token: string, _name: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_token: string, _name: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_token: string, _name: string): string;
    };
    tokens: {
        callAsync(index_0: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<[string, string, string, number, string, string]>;
    };
    tokenAddresses: {
        callAsync(index_0: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    getTokenByName: {
        callAsync(_name: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<[string, string, string, number, string, string]>;
    };
    getTokenAddresses: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string[]>;
    };
    setTokenIpfsHash: {
        sendTransactionAsync(_token: string, _ipfsHash: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_token: string, _ipfsHash: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_token: string, _ipfsHash: string): string;
    };
    getTokenBySymbol: {
        callAsync(_symbol: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<[string, string, string, number, string, string]>;
    };
    setTokenSymbol: {
        sendTransactionAsync(_token: string, _symbol: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_token: string, _symbol: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_token: string, _symbol: string): string;
    };
    transferOwnership: {
        sendTransactionAsync(newOwner: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(newOwner: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(newOwner: string): string;
    };
    static deployFrom0xArtifactAsync(artifact: ContractArtifact, provider: Provider, txDefaults: Partial<TxData>): Promise<TokenRegistryContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, provider: Provider, txDefaults: Partial<TxData>): Promise<TokenRegistryContract>;
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>);
}
