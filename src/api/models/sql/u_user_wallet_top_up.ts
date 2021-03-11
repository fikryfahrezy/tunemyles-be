import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_banks, m_banksId } from "./m_banks";
import type { m_medias, m_mediasId } from "./m_medias";
import type { UserWallet, UserWalletId } from "./UserWallet";

export interface u_user_wallet_top_upAttributes {
    id: number;
    id_u_user_wallet: number;
    id_m_banks: number;
    balance_request?: number;
    balance_transfer?: number;
    status?: number;
    proof_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type u_user_wallet_top_upPk = "id";
export type u_user_wallet_top_upId = u_user_wallet_top_up[u_user_wallet_top_upPk];
export type u_user_wallet_top_upCreationAttributes = Optional<
    u_user_wallet_top_upAttributes,
    u_user_wallet_top_upPk
>;

export class u_user_wallet_top_up
    extends Model<
        u_user_wallet_top_upAttributes,
        u_user_wallet_top_upCreationAttributes
    >
    implements u_user_wallet_top_upAttributes {
    id!: number;
    id_u_user_wallet!: number;
    id_m_banks!: number;
    balance_request?: number;
    balance_transfer?: number;
    status?: number;
    proof_id?: number;
    created_at?: Date;
    updated_at?: Date;

    // u_user_wallet_top_up belongsTo m_banks via id_m_banks
    id_m_banks_m_bank!: m_banks;
    getId_m_banks_m_bank!: Sequelize.BelongsToGetAssociationMixin<m_banks>;
    setId_m_banks_m_bank!: Sequelize.BelongsToSetAssociationMixin<
        m_banks,
        m_banksId
    >;
    createId_m_banks_m_bank!: Sequelize.BelongsToCreateAssociationMixin<m_banks>;
    // u_user_wallet_top_up belongsTo m_medias via proof_id
    proof!: m_medias;
    getProof!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
    setProof!: Sequelize.BelongsToSetAssociationMixin<m_medias, m_mediasId>;
    createProof!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;
    // u_user_wallet_top_up belongsTo u_user_wallet via id_u_user_wallet
    id_u_user_wallet_u_user_wallet!: UserWallet;
    getId_u_user_wallet_u_user_wallet!: Sequelize.BelongsToGetAssociationMixin<UserWallet>;
    setId_u_user_wallet_u_user_wallet!: Sequelize.BelongsToSetAssociationMixin<
        UserWallet,
        UserWalletId
    >;
    createId_u_user_wallet_u_user_wallet!: Sequelize.BelongsToCreateAssociationMixin<UserWallet>;

    static initModel(
        sequelize: Sequelize.Sequelize
    ): typeof u_user_wallet_top_up {
        u_user_wallet_top_up.init(
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
                id_m_banks: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "m_banks",
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
                balance_transfer: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    defaultValue: 0,
                    validate: {
                        isNumeric: {
                            msg: "please input proper balance transfer",
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
                                throw new Error("please input proper status");
                        },
                    },
                },
                proof_id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: true,
                    references: {
                        model: "m_medias",
                        key: "id",
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
                tableName: "u_user_wallet_top_up",
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
                        name: "id_m_banks",
                        using: "BTREE",
                        fields: [{ name: "id_m_banks" }],
                    },
                    {
                        name: "proof_id",
                        using: "BTREE",
                        fields: [{ name: "proof_id" }],
                    },
                ],
                underscored: true,
            }
        );
        return u_user_wallet_top_up;
    }
}
