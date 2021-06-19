type User = {
  id: number;
  full_name: string;
  username: string;
  password: string;
  address: string;
  phone_number: string;
  face: string | null;
  imgId: number | null;
  utilId: number;
  type: number;
};

type UserUtility = {
  id: number;
  userId: number;
  token: string;
  type: number;
  previousType: number;
};

type UserWallet = {
  balance: string;
  is_visible: number;
  wallet_name: string | null;
  wallet_description: string | null;
  uri: string | null;
  label: string | null;
};

type UserToken = {
  userId: number;
  utilId: number;
  type: number;
};

type UserAuth = {
  type: number;
  token: string;
};

type UserForgotToken = {
  userId: number;
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
  User: User;
  UserToken: UserToken;
  UserWallet: UserWallet;
  UserUtility: UserUtility;
  UserAuth: UserAuth;
  UserForgotToken: UserForgotToken;
  SearchQuery: SearchQuery;
};

export default CustModelType;
