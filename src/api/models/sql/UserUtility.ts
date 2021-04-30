import md5 from 'md5';
import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';
import type { Merchant, MerchantId } from './Merchant';
import type { UserLostPassword, UserLostPasswordId } from './UserLostPassword';
import type { UserWallet, UserWalletId } from './UserWallet';

export interface UserUtilityAttributes {
  id: number;
  id_m_users: number;
  api_token: string;
  type?: number;
  type_before_banned?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type UserUtilityPk = 'id';
export type UserUtilityId = UserUtility[UserUtilityPk];
export type UserUtilityCreationAttributes = Optional<
UserUtilityAttributes,
UserUtilityPk
>;

export class UserUtility
  extends Model<UserUtilityAttributes, UserUtilityCreationAttributes>
  implements UserUtilityAttributes {
  id!: number;

  id_m_users!: number;

  api_token!: string;

  type?: number;

  type_before_banned?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user belongsTo m_users via id_m_users
  user!: User;

  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;

  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  // u_user hasMany u_user_is_merchant via id_u_user
  merchants!: Merchant[];

  getMerchants!: Sequelize.HasManyGetAssociationsMixin<Merchant>;

  setMerchants!: Sequelize.HasManySetAssociationsMixin<Merchant, MerchantId>;

  addMerchant!: Sequelize.HasManyAddAssociationMixin<Merchant, MerchantId>;

  addMerchants!: Sequelize.HasManyAddAssociationsMixin<Merchant, MerchantId>;

  createMerchant!: Sequelize.HasManyCreateAssociationMixin<Merchant>;

  removeMerchant!: Sequelize.HasManyRemoveAssociationMixin<
  Merchant,
  MerchantId
  >;

  removeMerchants!: Sequelize.HasManyRemoveAssociationsMixin<
  Merchant,
  MerchantId
  >;

  hasMerchant!: Sequelize.HasManyHasAssociationMixin<Merchant, MerchantId>;

  hasMerchants!: Sequelize.HasManyHasAssociationsMixin<Merchant, MerchantId>;

  countMerchants!: Sequelize.HasManyCountAssociationsMixin;

  // u_user hasMany u_user_lost_password via id_u_user
  userLostPasswords!: UserLostPassword[];

  getuserLostPasswords!: Sequelize.HasManyGetAssociationsMixin<UserLostPassword>;

  setuserLostPasswords!: Sequelize.HasManySetAssociationsMixin<
  UserLostPassword,
  UserLostPasswordId
  >;

  addUserLostPassword!: Sequelize.HasManyAddAssociationMixin<
  UserLostPassword,
  UserLostPasswordId
  >;

  adduserLostPasswords!: Sequelize.HasManyAddAssociationsMixin<
  UserLostPassword,
  UserLostPasswordId
  >;

  createUserLostPassword!: Sequelize.HasManyCreateAssociationMixin<UserLostPassword>;

  removeUserLostPassword!: Sequelize.HasManyRemoveAssociationMixin<
  UserLostPassword,
  UserLostPasswordId
  >;

  removeUserLostPasswords!: Sequelize.HasManyRemoveAssociationsMixin<
  UserLostPassword,
  UserLostPasswordId
  >;

  hasUserLostPassword!: Sequelize.HasManyHasAssociationMixin<
  UserLostPassword,
  UserLostPasswordId
  >;

  hasuserLostPasswords!: Sequelize.HasManyHasAssociationsMixin<
  UserLostPassword,
  UserLostPasswordId
  >;

  countUserLostPasswords!: Sequelize.HasManyCountAssociationsMixin;

  // u_user hasMany u_user_wallet via id_u_user
  userWallets!: UserWallet[];

  getUserWallets!: Sequelize.HasManyGetAssociationsMixin<UserWallet>;

  setUserWallets!: Sequelize.HasManySetAssociationsMixin<
  UserWallet,
  UserWalletId
  >;

  addUserWallet!: Sequelize.HasManyAddAssociationMixin<
  UserWallet,
  UserWalletId
  >;

  addUserWallets!: Sequelize.HasManyAddAssociationsMixin<
  UserWallet,
  UserWalletId
  >;

  createUserWallet!: Sequelize.HasManyCreateAssociationMixin<UserWallet>;

  removeUserWallet!: Sequelize.HasManyRemoveAssociationMixin<
  UserWallet,
  UserWalletId
  >;

  removeUserWallets!: Sequelize.HasManyRemoveAssociationsMixin<
  UserWallet,
  UserWalletId
  >;

  hasUserWallet!: Sequelize.HasManyHasAssociationMixin<
  UserWallet,
  UserWalletId
  >;

  hasUserWallets!: Sequelize.HasManyHasAssociationsMixin<
  UserWallet,
  UserWalletId
  >;

  countUserWallets!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserUtility {
    UserUtility.init(
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
        api_token: {
          type: DataTypes.STRING(255),
          allowNull: false,
          set(value: string) {
            this.setDataValue('api_token', md5(`${Date.now()}${value}`));
          },
        },
        type: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            customValidator(value: number) {
              if (value < 0 || value > 3) throw new Error('please input proper visibility');
            },
          },
        },
        type_before_banned: {
          type: DataTypes.INTEGER,
          allowNull: true,
          validate: {
            customValidator(value: number) {
              if (value < 0 || value > 2) throw new Error('please input proper visibility');
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
        tableName: 'u_user',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_m_users',
            using: 'BTREE',
            fields: [{ name: 'id_m_users' }],
          },
        ],
        underscored: true,
      },
    );
    return UserUtility;
  }
}
