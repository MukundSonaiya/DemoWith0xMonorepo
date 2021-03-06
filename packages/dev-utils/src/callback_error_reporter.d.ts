import { DoneCallback } from '@0xproject/types';
export declare const callbackErrorReporter: {
    reportNoErrorCallbackErrors(done: DoneCallback, expectToBeCalledOnce?: boolean): <T>(f?: ((value: T) => void) | undefined) => (value: T) => void;
    reportNodeCallbackErrors(done: DoneCallback, expectToBeCalledOnce?: boolean): <T>(f?: ((value: T) => void) | undefined) => (error: Error | null, value: T | undefined) => void;
    assertNodeCallbackError(done: DoneCallback, errMsg: string): <T>(error: Error | null, value: T | undefined) => void;
};
