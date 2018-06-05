import { ConstructorAbi, DataItem } from 'ethereum-types';
import { ContractsBackend, ParamKind } from './types';
export declare const utils: {
    solTypeToTsType(paramKind: ParamKind, backend: ContractsBackend, solType: string, components?: DataItem[] | undefined): string;
    isUnionType(tsType: string): boolean;
    isObjectType(tsType: string): boolean;
    getPartialNameFromFileName(filename: string): string;
    getNamedContent(filename: string): {
        name: string;
        content: string;
    };
    getEmptyConstructor(): ConstructorAbi;
};
