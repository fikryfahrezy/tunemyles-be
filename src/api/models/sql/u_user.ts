import md5 from "md5";
import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_users, m_usersId } from "./m_users";
import type {
    u_user_is_merchant,
    u_user_is_merchantId,
} from "./u_user_is_merchant";
import type {
    u_user_lost_password,
    u_user_lost_passwordId,
} from "./u_user_lost_password";
import type { u_user_wallet, u_user_walletId } from "./u_user_wallet";

export interface u_userAttributes {
    id: number;
    id_m_users: number;
    api_token: string;
    type?: number;
    type_before_banned?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type u_userPk = "id";
export type u_userId = u_user[u_userPk];
export type u_userCreationAttributes = Optional<u_userAttributes, u_userPk>;

export class u_user
    extends Model<u_userAttributes, u_userCreationAttributes>
    implements u_userAttributes {
    id!: number;
    id_m_users!: number;
    api_token!: string;
    type?: number;
    type_before_banned?: number;
    created_at?: Date;
    updated_at?: Date;

    // u_user belongsTo m_users via id_m_users
    id_m_users_m_user!: m_users;
    getId_m_users_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
    setId_m_users_m_user!: Sequelize.BelongsToSetAssociationMixin<
        m_users,
        m_usersId
    >;
    createId_m_users_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;
    // u_user hasMany u_user_is_merchant via id_u_user
    u_user_is_merchants!: u_user_is_merchant[];
    getU_user_is_merchants!: Sequelize.HasManyGetAssociationsMixin<u_user_is_merchant>;
    setU_user_is_merchants!: Sequelize.HasManySetAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    addU_user_is_merchant!: Sequelize.HasManyAddAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    addU_user_is_merchants!: Sequelize.HasManyAddAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    createU_user_is_merchant!: Sequelize.HasManyCreateAssociationMixin<u_user_is_merchant>;
    removeU_user_is_merchant!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    removeU_user_is_merchants!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    hasU_user_is_merchant!: Sequelize.HasManyHasAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    hasU_user_is_merchants!: Sequelize.HasManyHasAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    countU_user_is_merchants!: Sequelize.HasManyCountAssociationsMixin;
    // u_user hasMany u_user_lost_password via id_u_user
    u_user_lost_passwords!: u_user_lost_password[];
    getU_user_lost_passwords!: Sequelize.HasManyGetAssociationsMixin<u_user_lost_password>;
    setU_user_lost_passwords!: Sequelize.HasManySetAssociationsMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    addU_user_lost_password!: Sequelize.HasManyAddAssociationMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    addU_user_lost_passwords!: Sequelize.HasManyAddAssociationsMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    createU_user_lost_password!: Sequelize.HasManyCreateAssociationMixin<u_user_lost_password>;
    removeU_user_lost_password!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    removeU_user_lost_passwords!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    hasU_user_lost_password!: Sequelize.HasManyHasAssociationMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    hasU_user_lost_passwords!: Sequelize.HasManyHasAssociationsMixin<
        u_user_lost_password,
        u_user_lost_passwordId
    >;
    countU_user_lost_passwords!: Sequelize.HasManyCountAssociationsMixin;
    // u_user hasMany u_user_wallet via id_u_user
    u_user_wallets!: u_user_wallet[];
    getU_user_wallets!: Sequelize.HasManyGetAssociationsMixin<u_user_wallet>;
    setU_user_wallets!: Sequelize.HasManySetAssociationsMixin<
        u_user_wallet,
        u_user_walletId
    >;
    addU_user_wallet!: Sequelize.HasManyAddAssociationMixin<
        u_user_wallet,
        u_user_walletId
    >;
    addU_user_wallets!: Sequelize.HasManyAddAssociationsMixin<
        u_user_wallet,
        u_user_walletId
    >;
    createU_user_wallet!: Sequelize.HasManyCreateAssociationMixin<u_user_wallet>;
    removeU_user_wallet!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_wallet,
        u_user_walletId
    >;
    removeU_user_wallets!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_wallet,
        u_user_walletId
    >;
    hasU_user_wallet!: Sequelize.HasManyHasAssociationMixin<
        u_user_wallet,
        u_user_walletId
    >;
    hasU_user_wallets!: Sequelize.HasManyHasAssociationsMixin<
        u_user_wallet,
        u_user_walletId
    >;
    countU_user_wallets!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof u_user {
        u_user.init(
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
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
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
        return u_user;
    }
}
