import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';
import type {
  UserChatDetail,
  UserChatDetailId,
} from './UserChatDetail';

export interface UserChatAttributes {
  id: number;
  id_m_users: number;
  id_cs: number;
  chat_token: string;
  created_at?: Date;
  updated_at?: Date;
}

export type UserChatPk = 'id';
export type UserChatId = UserChat[UserChatPk];
export type UserChatCreationAttributes = Optional<
UserChatAttributes,
UserChatPk
>;

export class UserChat
  extends Model<UserChatAttributes, UserChatCreationAttributes>
  implements UserChatAttributes {
  id!: number;

  id_m_users!: number;

  id_cs!: number;

  chat_token!: string;

  created_at?: Date;

  updated_at?: Date;

  // u_user_chat belongsTo m_users via id_cs
  cs!: User;

  getCs!: Sequelize.BelongsToGetAssociationMixin<User>;

  setCs!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createCs!: Sequelize.BelongsToCreateAssociationMixin<User>;

  // u_user_chat belongsTo m_users via id_m_users
  user!: User;

  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;

  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  // u_user_chat hasMany u_user_chat_detail via id_u_user_chat
  userChatDetails!: UserChatDetail[];

  getUserChatDetails!: Sequelize.HasManyGetAssociationsMixin<UserChatDetail>;

  setUserChatDetails!: Sequelize.HasManySetAssociationsMixin<
  UserChatDetail,
  UserChatDetailId
  >;

  addUserChatDetail!: Sequelize.HasManyAddAssociationMixin<
  UserChatDetail,
  UserChatDetailId
  >;

  addUserChatDetails!: Sequelize.HasManyAddAssociationsMixin<
  UserChatDetail,
  UserChatDetailId
  >;

  createUserChatDetail!: Sequelize.HasManyCreateAssociationMixin<UserChatDetail>;

  removeUserChatDetail!: Sequelize.HasManyRemoveAssociationMixin<
  UserChatDetail,
  UserChatDetailId
  >;

  removeUserChatDetails!: Sequelize.HasManyRemoveAssociationsMixin<
  UserChatDetail,
  UserChatDetailId
  >;

  hasUserChatDetail!: Sequelize.HasManyHasAssociationMixin<
  UserChatDetail,
  UserChatDetailId
  >;

  hasUserChatDetails!: Sequelize.HasManyHasAssociationsMixin<
  UserChatDetail,
  UserChatDetailId
  >;

  countChatDetails!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserChat {
    UserChat.init(
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
            model: 'm_users',
            key: 'id',
          },
        },
        id_cs: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_users',
            key: 'id',
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
        tableName: 'u_user_chat',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'fk_id_m_users_uuch',
            using: 'BTREE',
            fields: [{ name: 'id_m_users' }],
          },
          {
            name: 'fk_id_cs_uuch',
            using: 'BTREE',
            fields: [{ name: 'id_cs' }],
          },
        ],
      },
    );
    return UserChat;
  }
}
