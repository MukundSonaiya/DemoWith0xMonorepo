export declare enum EnvVars {
    SolidityCoverage = "SOLIDITY_COVERAGE",
    VerboseGanache = "VERBOSE_GANACHE",
}
export declare const env: {
    parseBoolean(key: string): boolean;
};
