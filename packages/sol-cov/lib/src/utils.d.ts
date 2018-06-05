import { LineColumn, SingleFileSourceRange } from './types';
export declare const utils: {
    compareLineColumn(lhs: LineColumn, rhs: LineColumn): number;
    removeHexPrefix(hex: string): string;
    isRangeInside(childRange: SingleFileSourceRange, parentRange: SingleFileSourceRange): boolean;
};
