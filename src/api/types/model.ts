type UserPassword = {
  id: number;
  password: string;
};

type UserToken = {
  type: number;
  token: string;
};

type UserAccount = {
  full_name: string;
  username: string;
  address: string;
  phone_number: string;
  face: string | null;
  id?: number;
};

type UserWallet = {
  balance: string;
  is_visible: number;
  wallet_name: string | null;
  wallet_description: string | null;
  uri: string | null;
  label: string | null;
};

type UserUtility = {
  id: number;
  user_id: number;
  type: number;
};

type CustModelType = {
  UserPassword: UserPassword;
  UserToken: UserToken;
  UserAccount: UserAccount;
  UserWallet: UserWallet;
  UserUtility: UserUtility;
};

export default CustModelType;
