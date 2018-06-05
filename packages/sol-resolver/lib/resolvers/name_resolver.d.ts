import { ContractSource } from '../types';
import { EnumerableResolver } from './enumerable_resolver';
export declare class NameResolver extends EnumerableResolver {
    private _contractsDir;
    constructor(contractsDir: string);
    resolveIfExists(lookupContractName: string): ContractSource | undefined;
    getAll(): ContractSource[];
    private _traverseContractsDir(dirPath, onFile);
}
