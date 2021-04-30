import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';
import type { UserChat, UserChatId } from './UserChat';

export interface UserChatDetailAttributes {
  id: number;
  id_u_user_chat: number;
  id_m_users: number;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export type UserChatDetailPk = 'id';
export type UserChatDetailId = UserChatDetail[UserChatDetailPk];
export type UserChatDetailCreationAttributes = Optional<
UserChatDetailAttributes,
UserChatDetailPk
>;

export class UserChatDetail
  extends Model<UserChatDetailAttributes, UserChatDetailCreationAttributes>
  implements UserChatDetailAttributes {
  id!: number;

  id_u_user_chat!: number;

  id_m_users!: number;

  content!: string;

  created_at?: Date;

  updated_at?: Date;

  // u_user_chat_detail belongsTo m_users via id_m_users
  user!: User;

  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;

  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  // u_user_chat_detail belongsTo u_user_chat via id_u_user_chat
  userChat!: UserChat;

  getUserChat!: Sequelize.BelongsToGetAssociationMixin<UserChat>;

  setUserChat!: Sequelize.BelongsToSetAssociationMixin<UserChat, UserChatId>;

  createUserChat!: Sequelize.BelongsToCreateAssociationMixin<UserChat>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserChatDetail {
    UserChatDetail.init(
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
            model: 'u_user_chat',
            key: 'id',
          },
        },
        id_m_users: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_users',
            key: 'id',
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
        tableName: 'u_user_chat_detail',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'fk_id_m_users_uucd',
            using: 'BTREE',
            fields: [{ name: 'id_m_users' }],
          },
          {
            name: 'fk_id_u_user_chat_uucd',
            using: 'BTREE',
            fields: [{ name: 'id_u_user_chat' }],
          },
        ],
      },
    );
    return UserChatDetail;
  }
}
