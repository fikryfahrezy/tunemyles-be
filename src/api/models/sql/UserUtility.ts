import md5 from "md5";
import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { User, UserId } from "./User";
import type {
    u_user_is_merchant,
    u_user_is_merchantId,
} from "./u_user_is_merchant";
import type {
    u_user_lost_password,
    u_user_lost_passwordId,
} from "./u_user_lost_password";
import type { UserWallet, UserWalletId } from "./UserWallet";

export interface UserUtilityAttributes {
    id: number;
    id_m_users: number;
    api_token: string;
    type?: number;
    type_before_banned?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type UserUtilityPk = "id";
export type UserUtilityId = UserUtility[UserUtilityPk];
export type UserUtilityCreationAttributes = Optional<
    UserUtilityAttributes,
    UserUtilityPk
>;

export class UserUtility
    extends Model<UserUtilityAttributes, UserUtilityCreationAttributes>
    implements UserUtilityAttributes {
    id!: number;
    id_m_users!: number;
    api_token!: string;
    type?: number;
    type_before_banned?: number;
    created_at?: Date;
    updated_at?: Date;

    // u_user belongsTo m_users via id_m_users
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    // u_user hasMany u_user_is_merchant via id_u_user
    merchants!: u_user_is_merchant[];
    getMerchants!: Sequelize.HasManyGetAssociationsMixin<u_user_is_merchant>;
    setMerchants!: Sequelize.HasManySetAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    addMerchant!: Sequelize.HasManyAddAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    addMerchants!: Sequelize.HasManyAddAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    createMerchant!: Sequelize.HasManyCreateAssociationMixin<u_user_is_merchant>;
    removeMerchant!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    removeMerchants!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    hasMerchant!: Sequelize.HasManyHasAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    hasMerchants!: Sequelize.HasManyHasAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    countMerchants!: Sequelize.HasManyCountAssociationsMixin;

    // u_user hasMany u_user_lost_password via id_u_user
    userLostPasswords!: u_user_lost_password[];
    getuserLostPasswords!: Sequelize.HasManyGetAssociationsMixin<u_user_lost_password>;
    setuserLostPasswords!: Sequelize.HasManySetAssociationsMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    addUserLostPassword!: Sequelize.HasManyAddAssociationMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    adduserLostPasswords!: Sequelize.HasManyAddAssociationsMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    createUserLostPassword!: Sequelize.HasManyCreateAssociationMixin<u_user_lost_password>;
    removeUserLostPassword!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    removeUserLostPasswords!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    hasUserLostPassword!: Sequelize.HasManyHasAssociationMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    hasuserLostPasswords!: Sequelize.HasManyHasAssociationsMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    countUserLostPasswords!: Sequelize.HasManyCountAssociationsMixin;

    // u_user hasMany u_user_wallet via id_u_user
    userWallets!: UserWallet[];
    getUserWallets!: Sequelize.HasManyGetAssociationsMixin<UserWallet>;
    setUserWallets!: Sequelize.HasManySetAssociationsMixin<
        UserWallet,
        UserWalletId
    >;
    addUserWallet!: Sequelize.HasManyAddAssociationMixin<
        UserWallet,
        UserWalletId
    >;
    addUserWallets!: Sequelize.HasManyAddAssociationsMixin<
        UserWallet,
        UserWalletId
    >;
    createUserWallet!: Sequelize.HasManyCreateAssociationMixin<UserWallet>;
    removeUserWallet!: Sequelize.HasManyRemoveAssociationMixin<
        UserWallet,
        UserWalletId
    >;
    removeUserWallets!: Sequelize.HasManyRemoveAssociationsMixin<
        UserWallet,
        UserWalletId
    >;
    hasUserWallet!: Sequelize.HasManyHasAssociationMixin<
        UserWallet,
        UserWalletId
    >;
    hasUserWallets!: Sequelize.HasManyHasAssociationsMixin<
        UserWallet,
        UserWalletId
    >;
    countUserWallets!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof UserUtility {
        UserUtility.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                id_m_users: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "m_users",
                        key: "id",
                    },
                },
                api_token: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    set(value) {
                        this.setDataValue(
                            "api_token",
                            md5(`${Date.now()}${value}`)
                        );
                    },
                },
                type: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                    validate: {
                        customValidator(value: number) {
                            if (value < 0 || value > 3)
                                throw new Error(
                                    "please input proper visibility"
                                );
                        },
                    },
                },
                type_before_banned: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    validate: {
                        customValidator(value: number) {
                            if (value < 0 || value > 2)
                                throw new Error(
                                    "please input proper visibility"
                                );
                        },
                    },
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: Date.now(),
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: Date.now(),
                },
            },
            {
                sequelize,
                tableName: "u_user",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "id_m_users",
                        using: "BTREE",
                        fields: [{ name: "id_m_users" }],
                    },
                ],
                underscored: true,
            }
        );
        return UserUtility;
    }
}
