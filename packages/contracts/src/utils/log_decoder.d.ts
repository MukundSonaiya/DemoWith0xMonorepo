import { Web3Wrapper } from '@0xproject/web3-wrapper';
import { DecodedLogArgs, LogEntry, LogWithDecodedArgs, RawLog, TransactionReceiptWithDecodedLogs } from 'ethereum-types';
export declare class LogDecoder {
    private _web3Wrapper;
    private _contractAddress;
    private _abiDecoder;
    static wrapLogBigNumbers(log: any): any;
    constructor(web3Wrapper: Web3Wrapper, contractAddress: string);
    decodeLogOrThrow<ArgsType extends DecodedLogArgs>(log: LogEntry): LogWithDecodedArgs<ArgsType> | RawLog;
    getTxWithDecodedLogsAsync(txHash: string): Promise<TransactionReceiptWithDecodedLogs>;
}
