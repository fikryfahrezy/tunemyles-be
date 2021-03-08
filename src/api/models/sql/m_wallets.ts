import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type { u_user_wallet, u_user_walletId } from "./u_user_wallet";

export interface m_walletsAttributes {
    id: number;
    wallet_name: string;
    wallet_description: string;
    id_logo?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type m_walletsPk = "id";
export type m_walletsId = m_wallets[m_walletsPk];
export type m_walletsCreationAttributes = Optional<
    m_walletsAttributes,
    m_walletsPk
>;

export class m_wallets
    extends Model<m_walletsAttributes, m_walletsCreationAttributes>
    implements m_walletsAttributes {
    id!: number;
    wallet_name!: string;
    wallet_description!: string;
    id_logo?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;

    // m_wallets belongsTo m_medias via id_logo
    id_logo_m_media!: m_medias;
    getId_logo_m_media!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
    setId_logo_m_media!: Sequelize.BelongsToSetAssociationMixin<
        m_medias,
        m_mediasId
    >;
    createId_logo_m_media!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;
    // m_wallets hasMany u_user_wallet via id_m_wallets
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

    static initModel(sequelize: Sequelize.Sequelize): typeof m_wallets {
        m_wallets.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                wallet_name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    validate: {
                        customValidator(value: string) {
                            if (value === "")
                                throw new Error("wallet name can't be empty");
                        },
                        len: {
                            args: [2, 255],
                            msg: "input proper wallet name",
                        },
                    },
                },
                wallet_description: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    validate: {
                        customValidator(value: string) {
                            if (value === "")
                                throw new Error(
                                    "wallet description can't be empty"
                                );
                        },
                        len: {
                            args: [2, 1000],
                            msg: "input proper wallet description",
                        },
                    },
                },
                id_logo: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: true,
                    references: {
                        model: "m_medias",
                        key: "id",
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
                                    "wallet visibility must be between or equal 0 and 2"
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
                tableName: "m_wallets",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "id_logo",
                        using: "BTREE",
                        fields: [{ name: "id_logo" }],
                    },
                ],
                underscored: true,
            }
        );
        return m_wallets;
    }
}
