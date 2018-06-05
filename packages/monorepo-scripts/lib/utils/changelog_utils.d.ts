import { Change, VersionChangelog } from '../types';
export declare const changelogUtils: {
    getChangelogMdTitle(versionChangelog: VersionChangelog): string;
    getChangelogMdChange(change: Change): string;
    generateChangelogMd(changelog: VersionChangelog[]): string;
    shouldAddNewChangelogEntry(currentVersion: string, changelog: VersionChangelog[]): boolean;
};
