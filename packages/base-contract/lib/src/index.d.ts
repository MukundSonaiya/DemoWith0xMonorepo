/// <reference types="ethers" />
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import { ConstructorAbi, ContractAbi, DataItem, MethodAbi, Provider, TxData, TxDataPayable } from 'ethereum-types';
import * as ethers from 'ethers';
export interface EthersInterfaceByFunctionSignature {
    [key: string]: ethers.Interface;
}
export declare class BaseContract {
    protected _ethersInterfacesByFunctionSignature: EthersInterfaceByFunctionSignature;
    protected _web3Wrapper: Web3Wrapper;
    abi: ContractAbi;
    address: string;
    contractName: string;
    constructorArgs: any[];
    protected static _formatABIDataItemList(abis: DataItem[], values: any[], formatter: (type: string, value: any) => any): any;
    protected static _lowercaseAddress(type: string, value: string): string;
    protected static _bigNumberToString(type: string, value: any): any;
    protected static _lookupConstructorAbi(abi: ContractAbi): ConstructorAbi;
    protected static _bnToBigNumber(type: string, value: any): any;
    protected static _applyDefaultsToTxDataAsync<T extends Partial<TxData | TxDataPayable>>(txData: T, txDefaults: Partial<TxData>, estimateGasAsync?: (txData: T) => Promise<number>): Promise<TxData>;
    protected _lookupEthersInterface(functionSignature: string): ethers.Interface;
    protected _lookupAbi(functionSignature: string): MethodAbi;
    constructor(contractName: string, abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>);
}
