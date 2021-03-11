import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type {
    u_user_bank_account,
    u_user_bank_accountId,
} from "./u_user_bank_account";
import type { UserWallet, UserWalletId } from "./UserWallet";

export interface u_user_wallet_withdrawAttributes {
    id: number;
    id_u_user_wallet: number;
    id_u_user_bank_account: number;
    balance_request?: number;
    status?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type u_user_wallet_withdrawPk = "id";
export type u_user_wallet_withdrawId = u_user_wallet_withdraw[u_user_wallet_withdrawPk];
export type u_user_wallet_withdrawCreationAttributes = Optional<
    u_user_wallet_withdrawAttributes,
    u_user_wallet_withdrawPk
>;

export class u_user_wallet_withdraw
    extends Model<
        u_user_wallet_withdrawAttributes,
        u_user_wallet_withdrawCreationAttributes
    >
    implements u_user_wallet_withdrawAttributes {
    id!: number;
    id_u_user_wallet!: number;
    id_u_user_bank_account!: number;
    balance_request?: number;
    status?: number;
    created_at?: Date;
    updated_at?: Date;

    // u_user_wallet_withdraw belongsTo u_user_bank_account via id_u_user_bank_account
    id_u_user_bank_account_u_user_bank_account!: u_user_bank_account;
    getId_u_user_bank_account_u_user_bank_account!: Sequelize.BelongsToGetAssociationMixin<u_user_bank_account>;
    setId_u_user_bank_account_u_user_bank_account!: Sequelize.BelongsToSetAssociationMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    createId_u_user_bank_account_u_user_bank_account!: Sequelize.BelongsToCreateAssociationMixin<u_user_bank_account>;
    // u_user_wallet_withdraw belongsTo u_user_wallet via id_u_user_wallet
    id_u_user_wallet_u_user_wallet!: UserWallet;
    getId_u_user_wallet_u_user_wallet!: Sequelize.BelongsToGetAssociationMixin<UserWallet>;
    setId_u_user_wallet_u_user_wallet!: Sequelize.BelongsToSetAssociationMixin<
        UserWallet,
        UserWalletId
    >;
    createId_u_user_wallet_u_user_wallet!: Sequelize.BelongsToCreateAssociationMixin<UserWallet>;

    static initModel(
        sequelize: Sequelize.Sequelize
    ): typeof u_user_wallet_withdraw {
        u_user_wallet_withdraw.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                id_u_user_wallet: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "u_user_wallet",
                        key: "id",
                    },
                },
                id_u_user_bank_account: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "u_user_bank_account",
                        key: "id",
                    },
                },
                balance_request: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    defaultValue: 0,
                    validate: {
                        isNumeric: {
                            msg: "please input proper balance request",
                        },
                    },
                },
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 1,
                    validate: {
                        isNumeric: {
                            msg: "please input proper status",
                        },
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
                tableName: "u_user_wallet_withdraw",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "id_u_user_wallet",
                        using: "BTREE",
                        fields: [{ name: "id_u_user_wallet" }],
                    },
                    {
                        name: "id_u_user_bank_account",
                        using: "BTREE",
                        fields: [{ name: "id_u_user_bank_account" }],
                    },
                ],
                underscored: true,
            }
        );
        return u_user_wallet_withdraw;
    }
}
