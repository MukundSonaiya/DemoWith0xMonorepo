import { ContractSource } from '../types';
import { Resolver } from './resolver';
export declare class RelativeFSResolver extends Resolver {
    private _contractsDir;
    constructor(contractsDir: string);
    resolveIfExists(importPath: string): ContractSource | undefined;
}
