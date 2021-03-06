/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x-monorepo/tree/development/packages/contract_templates.
 */
import { BaseContract } from '@0xproject/base-contract';
import { ContractArtifact } from '@0xproject/sol-compiler';
import { BlockParamLiteral, CallData, ContractAbi, DecodedLogArgs, Provider, TxData } from 'ethereum-types';
import { BigNumber } from '@0xproject/utils';
export declare type TokenTransferProxyContractEventArgs = LogAuthorizedAddressAddedContractEventArgs | LogAuthorizedAddressRemovedContractEventArgs;
export declare enum TokenTransferProxyEvents {
    LogAuthorizedAddressAdded = "LogAuthorizedAddressAdded",
    LogAuthorizedAddressRemoved = "LogAuthorizedAddressRemoved",
}
export interface LogAuthorizedAddressAddedContractEventArgs extends DecodedLogArgs {
    target: string;
    caller: string;
}
export interface LogAuthorizedAddressRemovedContractEventArgs extends DecodedLogArgs {
    target: string;
    caller: string;
}
export declare class TokenTransferProxyContract extends BaseContract {
    transferFrom: {
        sendTransactionAsync(token: string, from: string, to: string, value: BigNumber, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(token: string, from: string, to: string, value: BigNumber, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(token: string, from: string, to: string, value: BigNumber): string;
        callAsync(token: string, from: string, to: string, value: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<boolean>;
    };
    addAuthorizedAddress: {
        sendTransactionAsync(target: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(target: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(target: string): string;
    };
    authorities: {
        callAsync(index_0: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    removeAuthorizedAddress: {
        sendTransactionAsync(target: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(target: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(target: string): string;
    };
    owner: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    authorized: {
        callAsync(index_0: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<boolean>;
    };
    getAuthorizedAddresses: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string[]>;
    };
    transferOwnership: {
        sendTransactionAsync(newOwner: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(newOwner: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(newOwner: string): string;
    };
    static deployFrom0xArtifactAsync(artifact: ContractArtifact, provider: Provider, txDefaults: Partial<TxData>): Promise<TokenTransferProxyContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, provider: Provider, txDefaults: Partial<TxData>): Promise<TokenTransferProxyContract>;
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>);
}
