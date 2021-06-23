type UserToken = {
  userId: number;
  utilId: number;
  type: number;
};

type SearchQuery = {
  offset: number;
  limit: number;
  search: string;
  availableFields: string[];
  order: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
};

type CustModelType = {
  UserToken: UserToken;
  SearchQuery: SearchQuery;
};

export default CustModelType;
