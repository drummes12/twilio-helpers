export declare const SID: {
    account: {
        initial: string;
        label: string;
    };
    authToken: {
        initial: string;
        label: string;
    };
    conversation: {
        initial: string;
        label: string;
    };
    content: {
        initial: string;
        label: string;
    };
    studioFlow: {
        initial: string;
        label: string;
    };
    syncService: {
        initial: string;
        label: string;
    };
    workspace: {
        initial: string;
        label: string;
    };
    task: {
        initial: string;
        label: string;
    };
    syncMap: {
        initial: string;
        label: string;
    };
};
export declare const REGEX_SID: (initialSid: string) => RegExp;
export declare const REGEX_ADDRESS: RegExp;
export declare const WEBHOOK_METHOD: string[];
export declare const WEBHOOK_TARGET: string[];
export declare const WEBHOOK_PRE_ACTION: string[];
export declare const WEBHOOK_POST_ACTION: string[];
