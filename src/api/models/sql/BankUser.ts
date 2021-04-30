import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Bank, BankId } from './Bank';
import type { User, UserId } from './User';
import type { UserWithdraw, UserWithdrawId } from './UserWithdraw';

export interface BankUserAttributes {
  id: number;
  id_m_banks: number;
  id_m_users: number;
  account_number: string;
  account_name: string;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type BankUserPk = 'id';
export type BankUserId = BankUser[BankUserPk];
export type BankUserCreationAttributes = Optional<
BankUserAttributes,
BankUserPk
>;

export class BankUser
  extends Model<BankUserAttributes, BankUserCreationAttributes>
  implements BankUserAttributes {
  id!: number;

  id_m_banks!: number;

  id_m_users!: number;

  account_number!: string;

  account_name!: string;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user_bank_account belongsTo m_banks via id_m_banks
  bank!: Bank;

  getBank!: Sequelize.BelongsToGetAssociationMixin<Bank>;

  setBank!: Sequelize.BelongsToSetAssociationMixin<Bank, BankId>;

  createBank!: Sequelize.BelongsToCreateAssociationMixin<Bank>;

  // u_user_bank_account belongsTo m_users via id_m_users
  user!: User;

  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;

  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  // u_user_bank_account hasMany u_user_wallet_withdraw via id_u_user_bank_account
  userWitdraws!: UserWithdraw[];

  getUserWitdraws!: Sequelize.HasManyGetAssociationsMixin<UserWithdraw>;

  setUserWitdraws!: Sequelize.HasManySetAssociationsMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  addUserWitdraw!: Sequelize.HasManyAddAssociationMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  addUserWitdraws!: Sequelize.HasManyAddAssociationsMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  createUserWitdraw!: Sequelize.HasManyCreateAssociationMixin<UserWithdraw>;

  removeUserWitdraw!: Sequelize.HasManyRemoveAssociationMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  removeUserWitdraws!: Sequelize.HasManyRemoveAssociationsMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  hasUserWitdraw!: Sequelize.HasManyHasAssociationMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  hasUserWitdraws!: Sequelize.HasManyHasAssociationsMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  countUserWitdraws!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof BankUser {
    BankUser.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_m_banks: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_banks',
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
        account_number: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("account number can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'input proper account number',
            },
          },
        },
        account_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("account name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'input proper account name',
            },
          },
        },
        is_visible: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          validate: {
            customValidator(value: number) {
              if (value < 0 || value > 2) throw new Error('please input proper visibility');
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
        tableName: 'u_user_bank_account',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_m_banks',
            using: 'BTREE',
            fields: [{ name: 'id_m_banks' }],
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
    return BankUser;
  }
}
