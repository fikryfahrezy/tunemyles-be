export type Validation = {
  keyword: string;
  dataPath: string;
  schemaPath: string;
  params: Record<string, unknown>;
  message: string;
};

export type JwtPayload = {
  user_id: number;
  util_id: number;
  type: number;
  iat: number;
  exp: number;
};
