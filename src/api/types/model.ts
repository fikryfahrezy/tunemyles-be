type UserPassword = {
  id: number;
  password: string;
};

type UserToken = {
  type: number;
  token: string;
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

type UserUtility = {
  userId: number;
  utilId: number;
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
