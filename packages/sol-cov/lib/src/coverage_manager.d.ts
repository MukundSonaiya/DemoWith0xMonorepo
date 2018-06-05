import { AbstractArtifactAdapter } from './artifact_adapters/abstract_artifact_adapter';
import { TraceInfo } from './types';
export declare class CoverageManager {
    private _artifactAdapter;
    private _logger;
    private _traceInfos;
    private _getContractCodeAsync;
    private static _getSingleFileCoverageForTrace(contractData, coveredPcs, pcToSourceRange, fileIndex);
    private static _bytecodeToBytecodeRegex(bytecode);
    private static _getContractDataIfExists(contractsData, bytecode);
    constructor(artifactAdapter: AbstractArtifactAdapter, getContractCodeAsync: (address: string) => Promise<string>, isVerbose: boolean);
    appendTraceInfo(traceInfo: TraceInfo): void;
    writeCoverageAsync(): Promise<void>;
    private _computeCoverageAsync();
}
