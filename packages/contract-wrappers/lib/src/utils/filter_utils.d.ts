import { ConstructorAbi, EventAbi, FallbackAbi, FilterObject, LogEntry, MethodAbi } from '@0xproject/types';
import { BlockRange, ContractEvents, IndexedFilterValues } from '../types';
export declare const filterUtils: {
    generateUUID(): string;
    getFilter(address: string, eventName: ContractEvents, indexFilterValues: IndexedFilterValues, abi: (MethodAbi | ConstructorAbi | FallbackAbi | EventAbi)[], blockRange?: BlockRange | undefined): FilterObject;
    getEventSignatureFromAbiByName(eventAbi: EventAbi, eventName: ContractEvents): string;
    getTopicsForIndexedArgs(abi: EventAbi, indexFilterValues: IndexedFilterValues): (string | null)[];
    matchesFilter(log: LogEntry, filter: FilterObject): boolean;
    doesMatchTopics(logTopics: string[], filterTopics: (string | string[] | null)[]): boolean;
    matchesTopic(logTopic: string, filterTopic: string | string[] | null): boolean;
};
