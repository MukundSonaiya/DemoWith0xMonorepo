/// <reference types="node" />
import { BigNumber } from '@0xproject/utils';
export declare const constants: {
    INVALID_OPCODE: string;
    REVERT: string;
    TESTRPC_NETWORK_ID: number;
    AWAIT_TRANSACTION_MINED_MS: number;
    MAX_ETHERTOKEN_WITHDRAW_GAS: number;
    MAX_TOKEN_TRANSFERFROM_GAS: number;
    MAX_TOKEN_APPROVE_GAS: number;
    DUMMY_TOKEN_NAME: string;
    DUMMY_TOKEN_SYMBOL: string;
    DUMMY_TOKEN_DECIMALS: BigNumber;
    DUMMY_TOKEN_TOTAL_SUPPLY: BigNumber;
    NULL_BYTES: string;
    NUM_DUMMY_ERC20_TO_DEPLOY: number;
    NUM_DUMMY_ERC721_TO_DEPLOY: number;
    NUM_ERC721_TOKENS_TO_MINT: number;
    NULL_ADDRESS: string;
    UNLIMITED_ALLOWANCE_IN_BASE_UNITS: BigNumber;
    TESTRPC_PRIVATE_KEYS: Buffer[];
    INITIAL_ERC20_BALANCE: BigNumber;
    INITIAL_ERC20_ALLOWANCE: BigNumber;
    STATIC_ORDER_PARAMS: {
        makerAssetAmount: BigNumber;
        takerAssetAmount: BigNumber;
        makerFee: BigNumber;
        takerFee: BigNumber;
    };
};
