import { DoneCallback } from '@0xproject/types';
export declare const reportCallbackErrors: (done: DoneCallback) => (f: (...args: any[]) => void) => (...args: any[]) => Promise<void>;
