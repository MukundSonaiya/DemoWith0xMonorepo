/// <reference types="node" />
import { SignatureType } from '@0xproject/types';
export declare const signingUtils: {
    signMessage(message: Buffer, privateKey: Buffer, signatureType: SignatureType): Buffer;
};
