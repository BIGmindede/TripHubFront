declare namespace NodeJS {
    interface ProcessEnv {
        readonly API_URL: string;
        readonly MEDIA_STORAGE_URL: string;
        readonly IS_DEV: string;
    }
}