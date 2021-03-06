/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x-monorepo/tree/development/packages/contract_templates.
 */
import { BaseContract } from '@0xproject/base-contract';
import { ContractArtifact } from '@0xproject/sol-compiler';
import { BlockParamLiteral, CallData, ContractAbi, DecodedLogArgs, Provider, TxData, TxDataPayable } from 'ethereum-types';
import { BigNumber } from '@0xproject/utils';
export declare type EtherTokenContractEventArgs = TransferContractEventArgs | ApprovalContractEventArgs | DepositContractEventArgs | WithdrawalContractEventArgs;
export declare enum EtherTokenEvents {
    Transfer = "Transfer",
    Approval = "Approval",
    Deposit = "Deposit",
    Withdrawal = "Withdrawal",
}
export interface TransferContractEventArgs extends DecodedLogArgs {
    _from: string;
    _to: string;
    _value: BigNumber;
}
export interface ApprovalContractEventArgs extends DecodedLogArgs {
    _owner: string;
    _spender: string;
    _value: BigNumber;
}
export interface DepositContractEventArgs extends DecodedLogArgs {
    _owner: string;
    _value: BigNumber;
}
export interface WithdrawalContractEventArgs extends DecodedLogArgs {
    _owner: string;
    _value: BigNumber;
}
export declare class EtherTokenContract extends BaseContract {
    name: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    approve: {
        sendTransactionAsync(_spender: string, _value: BigNumber, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_spender: string, _value: BigNumber, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_spender: string, _value: BigNumber): string;
        callAsync(_spender: string, _value: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<boolean>;
    };
    totalSupply: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    transferFrom: {
        sendTransactionAsync(_from: string, _to: string, _value: BigNumber, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_from: string, _to: string, _value: BigNumber, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_from: string, _to: string, _value: BigNumber): string;
        callAsync(_from: string, _to: string, _value: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<boolean>;
    };
    withdraw: {
        sendTransactionAsync(amount: BigNumber, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(amount: BigNumber, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(amount: BigNumber): string;
    };
    decimals: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<number>;
    };
    balanceOf: {
        callAsync(_owner: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    symbol: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    transfer: {
        sendTransactionAsync(_to: string, _value: BigNumber, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_to: string, _value: BigNumber, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_to: string, _value: BigNumber): string;
        callAsync(_to: string, _value: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<boolean>;
    };
    deposit: {
        sendTransactionAsync(txData?: Partial<TxDataPayable>): Promise<string>;
        estimateGasAsync(txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(): string;
    };
    allowance: {
        callAsync(_owner: string, _spender: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    static deployFrom0xArtifactAsync(artifact: ContractArtifact, provider: Provider, txDefaults: Partial<TxData>): Promise<EtherTokenContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, provider: Provider, txDefaults: Partial<TxData>): Promise<EtherTokenContract>;
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>);
}
