export type Validation = {
    keyword: string;
    dataPath: string;
    schemaPath: string;
    params: Record<string, unknown>;
    message: string;
};

export type HandlerWrapperParam = {
    headers: Record<string, unknown>;
    body: Record<string, unknown>;
    params: Record<string, unknown>;
    query: Record<string, unknown>;
};
