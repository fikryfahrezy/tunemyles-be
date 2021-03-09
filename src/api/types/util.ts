export type Validation = {
    keyword: string;
    dataPath: string;
    schemaPath: string;
    params: Record<string, unknown>;
    message: string;
};
