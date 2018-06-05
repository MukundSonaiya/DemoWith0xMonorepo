export interface PostpublishConfigs {
    cwd: string;
    packageName: string;
    version: string;
    assets: string[];
    docPublishConfigs: DocPublishConfigs;
}
export interface DocPublishConfigs {
    fileIncludes: string[];
    s3BucketPath: string;
    s3StagingBucketPath: string;
}
export declare const postpublishUtils: {
    generateConfig(packageJSON: any, tsConfigJSON: any, cwd: string): PostpublishConfigs;
    runAsync(packageJSON: any, tsConfigJSON: any, cwd: string): Promise<void>;
    publishDocsToStagingAsync(packageJSON: any, tsConfigJSON: any, cwd: string): Promise<void>;
    publishReleaseNotesAsync(cwd: string, packageName: string, version: string, assets: string[]): Promise<void>;
    getReleaseNotes(packageName: string, version: string): string;
    getTag(packageName: string, version: string): string;
    getReleaseName(subPackageName: string, version: string): string;
    adjustAssetPaths(cwd: string, assets: string[]): string[];
    adjustFileIncludePaths(fileIncludes: string[], cwd: string): string[];
    generateAndUploadDocsAsync(cwd: string, fileIncludes: string[], version: string, S3BucketPath: string): Promise<void>;
};
