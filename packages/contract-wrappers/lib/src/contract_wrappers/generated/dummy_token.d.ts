/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x-monorepo/tree/development/packages/contract_templates.
 */
import { BaseContract } from '@0xproject/base-contract';
import { ContractArtifact } from '@0xproject/sol-compiler';
import { ContractAbi, Provider, TxData } from 'ethereum-types';
import { BigNumber } from '@0xproject/utils';
export declare class DummyTokenContract extends BaseContract {
    setBalance: {
        sendTransactionAsync(_target: string, _value: BigNumber, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(_target: string, _value: BigNumber, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(_target: string, _value: BigNumber): string;
    };
    static deployFrom0xArtifactAsync(artifact: ContractArtifact, provider: Provider, txDefaults: Partial<TxData>): Promise<DummyTokenContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, provider: Provider, txDefaults: Partial<TxData>): Promise<DummyTokenContract>;
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>);
}
