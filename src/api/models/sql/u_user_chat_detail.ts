import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_users, m_usersId } from "./m_users";
import type { u_user_chat, u_user_chatId } from "./u_user_chat";

export interface u_user_chat_detailAttributes {
    id: number;
    id_u_user_chat: number;
    id_m_users: number;
    content: string;
    created_at?: Date;
    updated_at?: Date;
}

export type u_user_chat_detailPk = "id";
export type u_user_chat_detailId = u_user_chat_detail[u_user_chat_detailPk];
export type u_user_chat_detailCreationAttributes = Optional<
    u_user_chat_detailAttributes,
    u_user_chat_detailPk
>;

export class u_user_chat_detail
    extends Model<
        u_user_chat_detailAttributes,
        u_user_chat_detailCreationAttributes
    >
    implements u_user_chat_detailAttributes {
    id!: number;
    id_u_user_chat!: number;
    id_m_users!: number;
    content!: string;
    created_at?: Date;
    updated_at?: Date;

    // u_user_chat_detail belongsTo m_users via id_m_users
    id_m_users_m_user!: m_users;
    getId_m_users_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
    setId_m_users_m_user!: Sequelize.BelongsToSetAssociationMixin<
        m_users,
        m_usersId
    >;
    createId_m_users_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;
    // u_user_chat_detail belongsTo u_user_chat via id_u_user_chat
    id_u_user_chat_u_user_chat!: u_user_chat;
    getId_u_user_chat_u_user_chat!: Sequelize.BelongsToGetAssociationMixin<u_user_chat>;
    setId_u_user_chat_u_user_chat!: Sequelize.BelongsToSetAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    createId_u_user_chat_u_user_chat!: Sequelize.BelongsToCreateAssociationMixin<u_user_chat>;

    static initModel(
        sequelize: Sequelize.Sequelize
    ): typeof u_user_chat_detail {
        u_user_chat_detail.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                id_u_user_chat: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "u_user_chat",
                        key: "id",
                    },
                },
                id_m_users: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "m_users",
                        key: "id",
                    },
                },
                content: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
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
                tableName: "u_user_chat_detail",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "fk_id_m_users_uucd",
                        using: "BTREE",
                        fields: [{ name: "id_m_users" }],
                    },
                    {
                        name: "fk_id_u_user_chat_uucd",
                        using: "BTREE",
                        fields: [{ name: "id_u_user_chat" }],
                    },
                ],
            }
        );
        return u_user_chat_detail;
    }
}
