import { ContractArtifact } from '@0xproject/sol-compiler';
import * as Ownership from '../artifacts/Ownership.json';

export const artifacts = {
    Ownership: (Ownership as any) as ContractArtifact,
};
