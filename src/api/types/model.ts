type User = {
  id: number;
  full_name: string;
  username: string;
  password: string;
  phone_number: string;
  address: string;
  id_photo?: number;
};

type UserUtility = {
  id: number;
  user_id: number;
  token: string;
  type: number;
  previous_type: number;
};

type UserAccount = {
  fullName: string;
  username: string;
  address: string;
  phoneNumber: string;
  face: string | null;
  id?: number;
};

type UserWallet = {
  balance: string;
  isVisible: number;
  walletName: string | null;
  walletDescription: string | null;
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
  UserAccount: UserAccount;
  UserWallet: UserWallet;
  UserUtility: UserUtility;
  UserAuth: UserAuth;
};

export default CustModelType;
