import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_users, m_usersId } from "./m_users";
import type {
    u_user_chat_detail,
    u_user_chat_detailId,
} from "./u_user_chat_detail";

export interface u_user_chatAttributes {
    id: number;
    id_m_users: number;
    id_cs: number;
    chat_token: string;
    created_at?: Date;
    updated_at?: Date;
}

export type u_user_chatPk = "id";
export type u_user_chatId = u_user_chat[u_user_chatPk];
export type u_user_chatCreationAttributes = Optional<
    u_user_chatAttributes,
    u_user_chatPk
>;

export class u_user_chat
    extends Model<u_user_chatAttributes, u_user_chatCreationAttributes>
    implements u_user_chatAttributes {
    id!: number;
    id_m_users!: number;
    id_cs!: number;
    chat_token!: string;
    created_at?: Date;
    updated_at?: Date;

    // u_user_chat belongsTo m_users via id_cs
    id_cs_m_user!: m_users;
    getId_cs_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
    setId_cs_m_user!: Sequelize.BelongsToSetAssociationMixin<
        m_users,
        m_usersId
    >;
    createId_cs_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;
    // u_user_chat belongsTo m_users via id_m_users
    id_m_users_m_user!: m_users;
    getId_m_users_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
    setId_m_users_m_user!: Sequelize.BelongsToSetAssociationMixin<
        m_users,
        m_usersId
    >;
    createId_m_users_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;
    // u_user_chat hasMany u_user_chat_detail via id_u_user_chat
    u_user_chat_details!: u_user_chat_detail[];
    getU_user_chat_details!: Sequelize.HasManyGetAssociationsMixin<u_user_chat_detail>;
    setU_user_chat_details!: Sequelize.HasManySetAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    addU_user_chat_detail!: Sequelize.HasManyAddAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    addU_user_chat_details!: Sequelize.HasManyAddAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    createU_user_chat_detail!: Sequelize.HasManyCreateAssociationMixin<u_user_chat_detail>;
    removeU_user_chat_detail!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    removeU_user_chat_details!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    hasU_user_chat_detail!: Sequelize.HasManyHasAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    hasU_user_chat_details!: Sequelize.HasManyHasAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    countU_user_chat_details!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof u_user_chat {
        u_user_chat.init(
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
                id_cs: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "m_users",
                        key: "id",
                    },
                },
                chat_token: {
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
                tableName: "u_user_chat",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "fk_id_m_users_uuch",
                        using: "BTREE",
                        fields: [{ name: "id_m_users" }],
                    },
                    {
                        name: "fk_id_cs_uuch",
                        using: "BTREE",
                        fields: [{ name: "id_cs" }],
                    },
                ],
            }
        );
        return u_user_chat;
    }
}
