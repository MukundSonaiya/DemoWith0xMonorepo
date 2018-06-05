export interface UpdatedPackage {
    name: string;
    version: string;
    private: boolean;
}
export interface Change {
    note: string;
    pr?: number;
}
export declare type Changelog = VersionChangelog[];
export interface VersionChangelog {
    timestamp?: number;
    version: string;
    changes: Change[];
}
export declare enum SemVerIndex {
    Invalid = 0,
    Patch = 1,
    Minor = 2,
    Major = 3,
}
export interface PackageToVersionChange {
    [name: string]: string;
}
