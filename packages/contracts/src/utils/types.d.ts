import { OrderWithoutExchangeAddress } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { AbiDefinition } from 'ethereum-types';
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
export interface BatchFillOrders {
    orders: OrderWithoutExchangeAddress[];
    signatures: string[];
    takerAssetFillAmounts: BigNumber[];
}
export interface MarketSellOrders {
    orders: OrderWithoutExchangeAddress[];
    signatures: string[];
    takerAssetFillAmount: BigNumber;
}
export interface MarketBuyOrders {
    orders: OrderWithoutExchangeAddress[];
    signatures: string[];
    makerAssetFillAmount: BigNumber;
}
export interface BatchCancelOrders {
    orders: OrderWithoutExchangeAddress[];
}
export interface CancelOrdersBefore {
    salt: BigNumber;
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
export declare enum ExchangeStatus {
    INVALID = 0,
    SUCCESS = 1,
    ROUNDING_ERROR_TOO_LARGE = 2,
    INSUFFICIENT_BALANCE_OR_ALLOWANCE = 3,
    TAKER_ASSET_FILL_AMOUNT_TOO_LOW = 4,
    INVALID_SIGNATURE = 5,
    INVALID_SENDER = 6,
    INVALID_TAKER = 7,
    INVALID_MAKER = 8,
    ORDER_INVALID_MAKER_ASSET_AMOUNT = 9,
    ORDER_INVALID_TAKER_ASSET_AMOUNT = 10,
    ORDER_FILLABLE = 11,
    ORDER_EXPIRED = 12,
    ORDER_FULLY_FILLED = 13,
    ORDER_CANCELLED = 14,
}
export declare enum ContractName {
    TokenRegistry = "TokenRegistry",
    MultiSigWalletWithTimeLock = "MultiSigWalletWithTimeLock",
    Exchange = "Exchange",
    ZRXToken = "ZRXToken",
    DummyERC20Token = "DummyERC20Token",
    EtherToken = "WETH9",
    AssetProxyOwner = "AssetProxyOwner",
    AccountLevels = "AccountLevels",
    EtherDelta = "EtherDelta",
    Arbitrage = "Arbitrage",
    TestAssetProxyDispatcher = "TestAssetProxyDispatcher",
    TestLibs = "TestLibs",
    TestSignatureValidator = "TestSignatureValidator",
    ERC20Proxy = "ERC20Proxy",
    ERC721Proxy = "ERC721Proxy",
    DummyERC721Token = "DummyERC721Token",
    TestLibBytes = "TestLibBytes",
    Authorizable = "Authorizable",
    Whitelist = "Whitelist",
}
export interface SignedTransaction {
    exchangeAddress: string;
    salt: BigNumber;
    signer: string;
    data: string;
    signature: string;
}
export interface TransferAmountsByMatchOrders {
    amountBoughtByLeftMaker: BigNumber;
    amountSoldByLeftMaker: BigNumber;
    amountReceivedByLeftMaker: BigNumber;
    feePaidByLeftMaker: BigNumber;
    amountBoughtByRightMaker: BigNumber;
    amountSoldByRightMaker: BigNumber;
    amountReceivedByRightMaker: BigNumber;
    feePaidByRightMaker: BigNumber;
    amountReceivedByTaker: BigNumber;
    feePaidByTakerLeft: BigNumber;
    feePaidByTakerRight: BigNumber;
    totalFeePaidByTaker: BigNumber;
    feeReceivedLeft: BigNumber;
    feeReceivedRight: BigNumber;
}
export interface OrderInfo {
    orderStatus: number;
    orderHash: string;
    orderTakerAssetFilledAmount: BigNumber;
}
export interface CancelOrder {
    order: OrderWithoutExchangeAddress;
    takerAssetCancelAmount: BigNumber;
}
export interface MatchOrder {
    left: OrderWithoutExchangeAddress;
    right: OrderWithoutExchangeAddress;
    leftSignature: string;
    rightSignature: string;
}
