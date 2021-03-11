import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_wallets, m_walletsId } from "./m_wallets";
import type { UserUtility, UserUtilityId } from "./UserUtility";
import type {
    u_user_wallet_top_up,
    u_user_wallet_top_upId,
} from "./u_user_wallet_top_up";
import type {
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId,
} from "./u_user_wallet_withdraw";

export interface UserWalletAttributes {
    id: number;
    id_u_user: number;
    id_m_wallets?: number;
    balance?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type UserWalletPk = "id";
export type UserWalletId = UserWallet[UserWalletPk];
export type UserWalletCreationAttributes = Optional<
    UserWalletAttributes,
    UserWalletPk
>;

export class UserWallet
    extends Model<UserWalletAttributes, UserWalletCreationAttributes>
    implements UserWalletAttributes {
    id!: number;
    id_u_user!: number;
    id_m_wallets?: number;
    balance?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;

    // u_user_wallet belongsTo m_wallets via id_m_wallets
    Wallet!: m_wallets;
    getWallet!: Sequelize.BelongsToGetAssociationMixin<m_wallets>;
    setWallet!: Sequelize.BelongsToSetAssociationMixin<m_wallets, m_walletsId>;
    createWallet!: Sequelize.BelongsToCreateAssociationMixin<m_wallets>;

    // u_user_wallet belongsTo u_user via id_u_user
    userUtility!: UserUtility;
    getUserUtility!: Sequelize.BelongsToGetAssociationMixin<UserUtility>;
    setUserUtility!: Sequelize.BelongsToSetAssociationMixin<
        UserUtility,
        UserUtilityId
    >;
    createUserUtility!: Sequelize.BelongsToCreateAssociationMixin<UserUtility>;

    // u_user_wallet hasMany u_user_wallet_top_up via id_u_user_wallet
    userTopUps!: u_user_wallet_top_up[];
    getUserTopUps!: Sequelize.HasManyGetAssociationsMixin<u_user_wallet_top_up>;
    setUserTopUps!: Sequelize.HasManySetAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    adduserTopUp!: Sequelize.HasManyAddAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    addUserTopUps!: Sequelize.HasManyAddAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    createUserTopUp!: Sequelize.HasManyCreateAssociationMixin<u_user_wallet_top_up>;
    removeUserTopUp!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    removeUserTopUps!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    hasUserTopUp!: Sequelize.HasManyHasAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    hasUserTopUps!: Sequelize.HasManyHasAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    countUserTopUps!: Sequelize.HasManyCountAssociationsMixin;

    // u_user_wallet hasMany u_user_wallet_withdraw via id_u_user_wallet
    userWithdraws!: u_user_wallet_withdraw[];
    getUserWithdraws!: Sequelize.HasManyGetAssociationsMixin<u_user_wallet_withdraw>;
    setUserWithdraws!: Sequelize.HasManySetAssociationsMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    addUserWithdraw!: Sequelize.HasManyAddAssociationMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    addUserWithdraws!: Sequelize.HasManyAddAssociationsMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    createUserWithdraw!: Sequelize.HasManyCreateAssociationMixin<u_user_wallet_withdraw>;
    removeUserWithdraw!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    removeUserWithdraws!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    hasUserWithdraw!: Sequelize.HasManyHasAssociationMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    hasUserWithdraws!: Sequelize.HasManyHasAssociationsMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    countUserWithdraws!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof UserWallet {
        UserWallet.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                id_u_user: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "u_user",
                        key: "id",
                    },
                },
                id_m_wallets: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: true,
                    defaultValue: 1,
                    references: {
                        model: "m_wallets",
                        key: "id",
                    },
                },
                balance: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    defaultValue: 0,
                    validate: {
                        isNumeric: {
                            msg: "Only allow numbers",
                        },
                    },
                },
                is_visible: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 1,
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
                tableName: "u_user_wallet",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "id_u_user",
                        using: "BTREE",
                        fields: [{ name: "id_u_user" }],
                    },
                    {
                        name: "id_m_wallets",
                        using: "BTREE",
                        fields: [{ name: "id_m_wallets" }],
                    },
                ],
                underscored: true,
            }
        );
        return UserWallet;
    }
}
