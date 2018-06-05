import { BigNumber } from 'bignumber.js';
import { ContractAbi } from 'ethereum-types';
export interface Order {
    senderAddress: string;
    makerAddress: string;
    takerAddress: string;
    makerFee: BigNumber;
    takerFee: BigNumber;
    makerAssetAmount: BigNumber;
    takerAssetAmount: BigNumber;
    makerAssetData: string;
    takerAssetData: string;
    salt: BigNumber;
    exchangeAddress: string;
    feeRecipientAddress: string;
    expirationTimeSeconds: BigNumber;
}
export interface OrderWithoutExchangeAddress {
    senderAddress: string;
    makerAddress: string;
    takerAddress: string;
    makerFee: BigNumber;
    takerFee: BigNumber;
    makerAssetAmount: BigNumber;
    takerAssetAmount: BigNumber;
    makerAssetData: string;
    takerAssetData: string;
    salt: BigNumber;
    feeRecipientAddress: string;
    expirationTimeSeconds: BigNumber;
}
export interface SignedOrder extends Order {
    signature: string;
}
/**
 * Elliptic Curve signature
 */
export interface ECSignature {
    v: number;
    r: string;
    s: string;
}
/**
 * Validator signature components
 */
export interface ValidatorSignature {
    validatorAddress: string;
    signature: string;
}
/**
 * Errors originating from the 0x exchange contract
 */
export declare enum ExchangeContractErrs {
    OrderFillExpired = "ORDER_FILL_EXPIRED",
    OrderCancelExpired = "ORDER_CANCEL_EXPIRED",
    OrderCancelAmountZero = "ORDER_CANCEL_AMOUNT_ZERO",
    OrderAlreadyCancelledOrFilled = "ORDER_ALREADY_CANCELLED_OR_FILLED",
    OrderFillAmountZero = "ORDER_FILL_AMOUNT_ZERO",
    OrderRemainingFillAmountZero = "ORDER_REMAINING_FILL_AMOUNT_ZERO",
    OrderFillRoundingError = "ORDER_FILL_ROUNDING_ERROR",
    FillBalanceAllowanceError = "FILL_BALANCE_ALLOWANCE_ERROR",
    InsufficientTakerBalance = "INSUFFICIENT_TAKER_BALANCE",
    InsufficientTakerAllowance = "INSUFFICIENT_TAKER_ALLOWANCE",
    InsufficientMakerBalance = "INSUFFICIENT_MAKER_BALANCE",
    InsufficientMakerAllowance = "INSUFFICIENT_MAKER_ALLOWANCE",
    InsufficientTakerFeeBalance = "INSUFFICIENT_TAKER_FEE_BALANCE",
    InsufficientTakerFeeAllowance = "INSUFFICIENT_TAKER_FEE_ALLOWANCE",
    InsufficientMakerFeeBalance = "INSUFFICIENT_MAKER_FEE_BALANCE",
    InsufficientMakerFeeAllowance = "INSUFFICIENT_MAKER_FEE_ALLOWANCE",
    TransactionSenderIsNotFillOrderTaker = "TRANSACTION_SENDER_IS_NOT_FILL_ORDER_TAKER",
    MultipleMakersInSingleCancelBatchDisallowed = "MULTIPLE_MAKERS_IN_SINGLE_CANCEL_BATCH_DISALLOWED",
    InsufficientRemainingFillAmount = "INSUFFICIENT_REMAINING_FILL_AMOUNT",
    MultipleTakerTokensInFillUpToDisallowed = "MULTIPLE_TAKER_TOKENS_IN_FILL_UP_TO_DISALLOWED",
    BatchOrdersMustHaveSameExchangeAddress = "BATCH_ORDERS_MUST_HAVE_SAME_EXCHANGE_ADDRESS",
    BatchOrdersMustHaveAtLeastOneItem = "BATCH_ORDERS_MUST_HAVE_AT_LEAST_ONE_ITEM",
}
export declare type ArtifactContractName = 'ZRX' | 'TokenTransferProxy' | 'TokenRegistry' | 'Token' | 'Exchange' | 'EtherToken';
export interface Artifact {
    contract_name: ArtifactContractName;
    abi: ContractAbi;
    networks: {
        [networkId: number]: {
            address: string;
        };
    };
}
export declare type DoneCallback = (err?: Error) => void;
export interface OrderRelevantState {
    makerBalance: BigNumber;
    makerProxyAllowance: BigNumber;
    makerFeeBalance: BigNumber;
    makerFeeProxyAllowance: BigNumber;
    filledTakerTokenAmount: BigNumber;
    cancelledTakerTokenAmount: BigNumber;
    remainingFillableMakerTokenAmount: BigNumber;
    remainingFillableTakerTokenAmount: BigNumber;
}
export interface OrderStateValid {
    isValid: true;
    orderHash: string;
    orderRelevantState: OrderRelevantState;
}
export interface OrderStateInvalid {
    isValid: false;
    orderHash: string;
    error: ExchangeContractErrs;
}
export declare type OrderState = OrderStateValid | OrderStateInvalid;
export interface Token {
    name: string;
    address: string;
    symbol: string;
    decimals: number;
}
export declare enum SignatureType {
    Illegal = 0,
    Invalid = 1,
    EIP712 = 2,
    EthSign = 3,
    Caller = 4,
    Wallet = 5,
    Validator = 6,
    PreSigned = 7,
    Trezor = 8,
}
/**
 * Elliptic Curve signature
 */
export interface ECSignature {
    v: number;
    r: string;
    s: string;
}
export declare enum AssetProxyId {
    INVALID = 0,
    ERC20 = 1,
    ERC721 = 2,
}
export interface ERC20ProxyData {
    assetProxyId: AssetProxyId;
    tokenAddress: string;
}
export interface ERC721ProxyData {
    assetProxyId: AssetProxyId;
    tokenAddress: string;
    tokenId: BigNumber;
}
export interface ProxyData {
    assetProxyId: AssetProxyId;
    tokenAddress?: string;
    data?: any;
}
