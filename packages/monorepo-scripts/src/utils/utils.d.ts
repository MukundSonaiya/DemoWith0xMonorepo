import { UpdatedPackage } from '../types';
export declare const utils: {
    log(...args: any[]): void;
    getNextPatchVersion(currentVersion: string): string;
    prettifyAsync(filePath: string, cwd: string): Promise<void>;
    getUpdatedLernaPackagesAsync(shouldIncludePrivate: boolean): Promise<LernaPackage[]>;
    getLernaUpdatedPackagesAsync(shouldIncludePrivate: boolean): Promise<UpdatedPackage[]>;
    getChangelogJSONIfExists(changelogPath: string): string | undefined;
    getChangelogJSONOrCreateIfMissing(changelogPath: string): string;
};
