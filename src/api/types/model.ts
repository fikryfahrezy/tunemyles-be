export type UserPassword = {
    id: number;
    password: string;
};

export type UserToken = {
    type: number;
    token: string;
};

export type UserAccount = {
    full_name: string;
    username: string;
    address: string;
    phone_number: string;
    face: string | null;
    id?: number;
};

export type UserWallet = {
    balance: string;
    is_visible: number;
    wallet_name: string | null;
    wallet_description: string | null;
    uri: string | null;
    label: string | null;
};

export type UserUtility = {
    id: number;
    user_id: number;
    type: number;
};
