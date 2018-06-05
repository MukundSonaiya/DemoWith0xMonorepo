import { AbiDefinition, DecodedLogArgs, LogEntry, LogWithDecodedArgs, RawLog } from 'ethereum-types';
export declare class AbiDecoder {
    private _savedABIs;
    private _methodIds;
    constructor(abiArrays: AbiDefinition[][]);
    tryToDecodeLogOrNoop<ArgsType extends DecodedLogArgs>(log: LogEntry): LogWithDecodedArgs<ArgsType> | RawLog;
    addABI(abiArray: AbiDefinition[]): void;
}
