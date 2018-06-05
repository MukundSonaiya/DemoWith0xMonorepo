import { BigNumber } from '@0xproject/utils';
import { AbiDefinition, ContractAbi } from 'ethereum-types';

export interface ERC20BalancesByOwner {
    [ownerAddress: string]: {
        [tokenAddress: string]: BigNumber;
    };
}

export interface ERC721TokenIdsByOwner {
    [ownerAddress: string]: {
        [tokenAddress: string]: BigNumber[];
    };
}

export interface SubmissionContractEventArgs {
    transactionId: BigNumber;
}

export interface TransactionDataParams {
    name: string;
    abi: AbiDefinition[];
    args: any[];
}

export interface MultiSigConfig {
    owners: string[];
    confirmationsRequired: number;
    secondsRequired: number;
}

export interface MultiSigConfigByNetwork {
    [networkName: string]: MultiSigConfig;
}

export interface Token {
    address?: string;
    name: string;
    symbol: string;
    decimals: number;
    ipfsHash: string;
    swarmHash: string;
}

export enum ExchangeStatus {
    INVALID,
    SUCCESS,
    ROUNDING_ERROR_TOO_LARGE,
    INSUFFICIENT_BALANCE_OR_ALLOWANCE,
    TAKER_ASSET_FILL_AMOUNT_TOO_LOW,
    INVALID_SIGNATURE,
    INVALID_SENDER,
    INVALID_TAKER,
    INVALID_MAKER,
    ORDER_INVALID_MAKER_ASSET_AMOUNT,
    ORDER_INVALID_TAKER_ASSET_AMOUNT,
    ORDER_FILLABLE,
    ORDER_EXPIRED,
    ORDER_FULLY_FILLED,
    ORDER_CANCELLED,
}

export enum ContractName {
    Ownership = 'Ownership'
}

export interface SignedTransaction {
    exchangeAddress: string;
    salt: BigNumber;
    signer: string;
    data: string;
    signature: string;
}