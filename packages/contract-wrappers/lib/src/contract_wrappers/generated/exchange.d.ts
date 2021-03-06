/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x-monorepo/tree/development/packages/contract_templates.
 */
import { BaseContract } from '@0xproject/base-contract';
import { ContractArtifact } from '@0xproject/sol-compiler';
import { BlockParamLiteral, CallData, ContractAbi, DecodedLogArgs, Provider, TxData } from 'ethereum-types';
import { BigNumber } from '@0xproject/utils';
export declare type ExchangeContractEventArgs = LogFillContractEventArgs | LogCancelContractEventArgs | LogErrorContractEventArgs;
export declare enum ExchangeEvents {
    LogFill = "LogFill",
    LogCancel = "LogCancel",
    LogError = "LogError",
}
export interface LogFillContractEventArgs extends DecodedLogArgs {
    maker: string;
    taker: string;
    feeRecipient: string;
    makerToken: string;
    takerToken: string;
    filledMakerTokenAmount: BigNumber;
    filledTakerTokenAmount: BigNumber;
    paidMakerFee: BigNumber;
    paidTakerFee: BigNumber;
    tokens: string;
    orderHash: string;
}
export interface LogCancelContractEventArgs extends DecodedLogArgs {
    maker: string;
    feeRecipient: string;
    makerToken: string;
    takerToken: string;
    cancelledMakerTokenAmount: BigNumber;
    cancelledTakerTokenAmount: BigNumber;
    tokens: string;
    orderHash: string;
}
export interface LogErrorContractEventArgs extends DecodedLogArgs {
    errorId: number;
    orderHash: string;
}
export declare class ExchangeContract extends BaseContract {
    isRoundingError: {
        callAsync(numerator: BigNumber, denominator: BigNumber, target: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<boolean>;
    };
    filled: {
        callAsync(index_0: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    cancelled: {
        callAsync(index_0: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    fillOrdersUpTo: {
        sendTransactionAsync(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: (number | BigNumber)[], r: string[], s: string[], txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: (number | BigNumber)[], r: string[], s: string[], txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: (number | BigNumber)[], r: string[], s: string[]): string;
        callAsync(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: (number | BigNumber)[], r: string[], s: string[], callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    cancelOrder: {
        sendTransactionAsync(orderAddresses: string[], orderValues: BigNumber[], cancelTakerTokenAmount: BigNumber, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(orderAddresses: string[], orderValues: BigNumber[], cancelTakerTokenAmount: BigNumber, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(orderAddresses: string[], orderValues: BigNumber[], cancelTakerTokenAmount: BigNumber): string;
        callAsync(orderAddresses: string[], orderValues: BigNumber[], cancelTakerTokenAmount: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    ZRX_TOKEN_CONTRACT: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    batchFillOrKillOrders: {
        sendTransactionAsync(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmounts: BigNumber[], v: (number | BigNumber)[], r: string[], s: string[], txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmounts: BigNumber[], v: (number | BigNumber)[], r: string[], s: string[], txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmounts: BigNumber[], v: (number | BigNumber)[], r: string[], s: string[]): string;
    };
    fillOrKillOrder: {
        sendTransactionAsync(orderAddresses: string[], orderValues: BigNumber[], fillTakerTokenAmount: BigNumber, v: number | BigNumber, r: string, s: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(orderAddresses: string[], orderValues: BigNumber[], fillTakerTokenAmount: BigNumber, v: number | BigNumber, r: string, s: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(orderAddresses: string[], orderValues: BigNumber[], fillTakerTokenAmount: BigNumber, v: number | BigNumber, r: string, s: string): string;
    };
    getUnavailableTakerTokenAmount: {
        callAsync(orderHash: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    isValidSignature: {
        callAsync(signer: string, hash: string, v: number | BigNumber, r: string, s: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<boolean>;
    };
    getPartialAmount: {
        callAsync(numerator: BigNumber, denominator: BigNumber, target: BigNumber, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    TOKEN_TRANSFER_PROXY_CONTRACT: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    batchFillOrders: {
        sendTransactionAsync(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmounts: BigNumber[], shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: (number | BigNumber)[], r: string[], s: string[], txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmounts: BigNumber[], shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: (number | BigNumber)[], r: string[], s: string[], txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(orderAddresses: string[][], orderValues: BigNumber[][], fillTakerTokenAmounts: BigNumber[], shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: (number | BigNumber)[], r: string[], s: string[]): string;
    };
    batchCancelOrders: {
        sendTransactionAsync(orderAddresses: string[][], orderValues: BigNumber[][], cancelTakerTokenAmounts: BigNumber[], txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(orderAddresses: string[][], orderValues: BigNumber[][], cancelTakerTokenAmounts: BigNumber[], txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(orderAddresses: string[][], orderValues: BigNumber[][], cancelTakerTokenAmounts: BigNumber[]): string;
    };
    fillOrder: {
        sendTransactionAsync(orderAddresses: string[], orderValues: BigNumber[], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: number | BigNumber, r: string, s: string, txData?: Partial<TxData>): Promise<string>;
        estimateGasAsync(orderAddresses: string[], orderValues: BigNumber[], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: number | BigNumber, r: string, s: string, txData?: Partial<TxData>): Promise<number>;
        getABIEncodedTransactionData(orderAddresses: string[], orderValues: BigNumber[], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: number | BigNumber, r: string, s: string): string;
        callAsync(orderAddresses: string[], orderValues: BigNumber[], fillTakerTokenAmount: BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, v: number | BigNumber, r: string, s: string, callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<BigNumber>;
    };
    getOrderHash: {
        callAsync(orderAddresses: string[], orderValues: BigNumber[], callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    EXTERNAL_QUERY_GAS_LIMIT: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<number>;
    };
    VERSION: {
        callAsync(callData?: Partial<CallData>, defaultBlock?: number | BlockParamLiteral | undefined): Promise<string>;
    };
    static deployFrom0xArtifactAsync(artifact: ContractArtifact, provider: Provider, txDefaults: Partial<TxData>, _zrxToken: string, _tokenTransferProxy: string): Promise<ExchangeContract>;
    static deployAsync(bytecode: string, abi: ContractAbi, provider: Provider, txDefaults: Partial<TxData>, _zrxToken: string, _tokenTransferProxy: string): Promise<ExchangeContract>;
    constructor(abi: ContractAbi, address: string, provider: Provider, txDefaults?: Partial<TxData>);
}
