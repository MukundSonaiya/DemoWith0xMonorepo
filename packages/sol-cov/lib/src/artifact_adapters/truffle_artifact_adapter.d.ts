import { ContractData } from '../types';
import { AbstractArtifactAdapter } from './abstract_artifact_adapter';
export declare class TruffleArtifactAdapter extends AbstractArtifactAdapter {
    private _solcVersion;
    private _sourcesPath;
    constructor(sourcesPath: string, solcVersion: string);
    collectContractsDataAsync(): Promise<ContractData[]>;
}
