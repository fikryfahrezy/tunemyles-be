import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_wallets, m_walletsId } from "./m_wallets";
import type { u_user, u_userId } from "./u_user";
import type {
    u_user_wallet_top_up,
    u_user_wallet_top_upId,
} from "./u_user_wallet_top_up";
import type {
    u_user_wallet_withdraw,
    u_user_wallet_withdrawId,
} from "./u_user_wallet_withdraw";

export interface u_user_walletAttributes {
    id: number;
    id_u_user: number;
    id_m_wallets?: number;
    balance?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type u_user_walletPk = "id";
export type u_user_walletId = u_user_wallet[u_user_walletPk];
export type u_user_walletCreationAttributes = Optional<
    u_user_walletAttributes,
    u_user_walletPk
>;

export class u_user_wallet
    extends Model<u_user_walletAttributes, u_user_walletCreationAttributes>
    implements u_user_walletAttributes {
    id!: number;
    id_u_user!: number;
    id_m_wallets?: number;
    balance?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;

    // u_user_wallet belongsTo m_wallets via id_m_wallets
    id_m_wallets_m_wallet!: m_wallets;
    getId_m_wallets_m_wallet!: Sequelize.BelongsToGetAssociationMixin<m_wallets>;
    setId_m_wallets_m_wallet!: Sequelize.BelongsToSetAssociationMixin<
        m_wallets,
        m_walletsId
    >;
    createId_m_wallets_m_wallet!: Sequelize.BelongsToCreateAssociationMixin<m_wallets>;
    // u_user_wallet belongsTo u_user via id_u_user
    id_u_user_u_user!: u_user;
    getId_u_user_u_user!: Sequelize.BelongsToGetAssociationMixin<u_user>;
    setId_u_user_u_user!: Sequelize.BelongsToSetAssociationMixin<
        u_user,
        u_userId
    >;
    createId_u_user_u_user!: Sequelize.BelongsToCreateAssociationMixin<u_user>;
    // u_user_wallet hasMany u_user_wallet_top_up via id_u_user_wallet
    u_user_wallet_top_ups!: u_user_wallet_top_up[];
    getU_user_wallet_top_ups!: Sequelize.HasManyGetAssociationsMixin<u_user_wallet_top_up>;
    setU_user_wallet_top_ups!: Sequelize.HasManySetAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    addU_user_wallet_top_up!: Sequelize.HasManyAddAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    addU_user_wallet_top_ups!: Sequelize.HasManyAddAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    createU_user_wallet_top_up!: Sequelize.HasManyCreateAssociationMixin<u_user_wallet_top_up>;
    removeU_user_wallet_top_up!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    removeU_user_wallet_top_ups!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    hasU_user_wallet_top_up!: Sequelize.HasManyHasAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    hasU_user_wallet_top_ups!: Sequelize.HasManyHasAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    countU_user_wallet_top_ups!: Sequelize.HasManyCountAssociationsMixin;
    // u_user_wallet hasMany u_user_wallet_withdraw via id_u_user_wallet
    u_user_wallet_withdraws!: u_user_wallet_withdraw[];
    getU_user_wallet_withdraws!: Sequelize.HasManyGetAssociationsMixin<u_user_wallet_withdraw>;
    setU_user_wallet_withdraws!: Sequelize.HasManySetAssociationsMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    addU_user_wallet_withdraw!: Sequelize.HasManyAddAssociationMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    addU_user_wallet_withdraws!: Sequelize.HasManyAddAssociationsMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    createU_user_wallet_withdraw!: Sequelize.HasManyCreateAssociationMixin<u_user_wallet_withdraw>;
    removeU_user_wallet_withdraw!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    removeU_user_wallet_withdraws!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    hasU_user_wallet_withdraw!: Sequelize.HasManyHasAssociationMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    hasU_user_wallet_withdraws!: Sequelize.HasManyHasAssociationsMixin<
        u_user_wallet_withdraw,
        u_user_wallet_withdrawId
    >;
    countU_user_wallet_withdraws!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof u_user_wallet {
        u_user_wallet.init(
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
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
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
        return u_user_wallet;
    }
}
