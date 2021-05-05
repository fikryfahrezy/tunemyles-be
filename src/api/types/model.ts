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
};

type UserUtility = {
  id: number;
  user_id: number;
  token: string;
  type: number;
  previous_type: number;
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

type CustModelType = {
  User: User;
  UserToken: UserToken;
  UserWallet: UserWallet;
  UserUtility: UserUtility;
  UserAuth: UserAuth;
};

export default CustModelType;
