import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Media, MediaId } from './Media';
import type { BankUtility, BankUtilityId } from './BankUtility';
import type { BankAccount, BankAccountId } from './BankAccount';
import type { BankUser, BankUserId } from './BankUser';
import type { UserTopUp, UserTopUpId } from './UserTopUp';

export interface BankAttributes {
  id: number;
  bank_name: string;
  id_logo?: number;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type BankPk = 'id';
export type BankId = Bank[BankPk];
export type BankCreationAttributes = Optional<BankAttributes, BankPk>;

export class Bank
  extends Model<BankAttributes, BankCreationAttributes>
  implements BankAttributes {
  id!: number;

  bank_name!: string;

  id_logo?: number;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // m_banks hasMany u_bank via id_m_banks
  bankUtilities!: BankUtility[];

  getBankUtilities!: Sequelize.HasManyGetAssociationsMixin<BankUtility>;

  setBankUtilities!: Sequelize.HasManySetAssociationsMixin<
  BankUtility,
  BankUtilityId
  >;

  addBankUtility!: Sequelize.HasManyAddAssociationMixin<
  BankUtility,
  BankUtilityId
  >;

  addBankUtilities!: Sequelize.HasManyAddAssociationsMixin<
  BankUtility,
  BankUtilityId
  >;

  createBankUtility!: Sequelize.HasManyCreateAssociationMixin<BankUtility>;

  removeBankUtility!: Sequelize.HasManyRemoveAssociationMixin<
  BankUtility,
  BankUtilityId
  >;

  removeBankUtilities!: Sequelize.HasManyRemoveAssociationsMixin<
  BankUtility,
  BankUtilityId
  >;

  hasBankUtility!: Sequelize.HasManyHasAssociationMixin<
  BankUtility,
  BankUtilityId
  >;

  hasBankUtilities!: Sequelize.HasManyHasAssociationsMixin<
  BankUtility,
  BankUtilityId
  >;

  countBankUtilities!: Sequelize.HasManyCountAssociationsMixin;

  // m_banks hasMany u_bank_account via id_m_banks
  bankAccounts!: BankAccount[];

  getBankAccounts!: Sequelize.HasManyGetAssociationsMixin<BankAccount>;

  setBankAccounts!: Sequelize.HasManySetAssociationsMixin<
  BankAccount,
  BankAccountId
  >;

  addBankAccount!: Sequelize.HasManyAddAssociationMixin<
  BankAccount,
  BankAccountId
  >;

  addBankAccounts!: Sequelize.HasManyAddAssociationsMixin<
  BankAccount,
  BankAccountId
  >;

  createBankAccount!: Sequelize.HasManyCreateAssociationMixin<BankAccount>;

  removeBankAccount!: Sequelize.HasManyRemoveAssociationMixin<
  BankAccount,
  BankAccountId
  >;

  removeBankAccounts!: Sequelize.HasManyRemoveAssociationsMixin<
  BankAccount,
  BankAccountId
  >;

  hasBankAccount!: Sequelize.HasManyHasAssociationMixin<
  BankAccount,
  BankAccountId
  >;

  hasBankAccounts!: Sequelize.HasManyHasAssociationsMixin<
  BankAccount,
  BankAccountId
  >;

  countBankAccounts!: Sequelize.HasManyCountAssociationsMixin;

  // m_banks hasMany u_user_bank_account via id_m_banks
  bankUsers!: BankUser[];

  getBankUsers!: Sequelize.HasManyGetAssociationsMixin<BankUser>;

  setBankUsers!: Sequelize.HasManySetAssociationsMixin<BankUser, BankUserId>;

  addBankUser!: Sequelize.HasManyAddAssociationMixin<BankUser, BankUserId>;

  addBankUsers!: Sequelize.HasManyAddAssociationsMixin<BankUser, BankUserId>;

  createBankUser!: Sequelize.HasManyCreateAssociationMixin<BankUser>;

  removeBankUser!: Sequelize.HasManyRemoveAssociationMixin<
  BankUser,
  BankUserId
  >;

  removeBankUsers!: Sequelize.HasManyRemoveAssociationsMixin<
  BankUser,
  BankUserId
  >;

  hasBankUser!: Sequelize.HasManyHasAssociationMixin<BankUser, BankUserId>;

  hasBankUsers!: Sequelize.HasManyHasAssociationsMixin<BankUser, BankUserId>;

  countBankUsers!: Sequelize.HasManyCountAssociationsMixin;

  // m_banks hasMany u_user_wallet_top_up via id_m_banks
  userTopUps!: UserTopUp[];

  getUserTopUps!: Sequelize.HasManyGetAssociationsMixin<UserTopUp>;

  setUserTopUps!: Sequelize.HasManySetAssociationsMixin<UserTopUp, UserTopUpId>;

  addUserTopUp!: Sequelize.HasManyAddAssociationMixin<UserTopUp, UserTopUpId>;

  addUserTopUps!: Sequelize.HasManyAddAssociationsMixin<UserTopUp, UserTopUpId>;

  createUserTopUp!: Sequelize.HasManyCreateAssociationMixin<UserTopUp>;

  removeUserTopUp!: Sequelize.HasManyRemoveAssociationMixin<
  UserTopUp,
  UserTopUpId
  >;

  removeUserTopUps!: Sequelize.HasManyRemoveAssociationsMixin<
  UserTopUp,
  UserTopUpId
  >;

  hasUserTopUp!: Sequelize.HasManyHasAssociationMixin<UserTopUp, UserTopUpId>;

  hasUserTopUps!: Sequelize.HasManyHasAssociationsMixin<UserTopUp, UserTopUpId>;

  countUserTopUps!: Sequelize.HasManyCountAssociationsMixin;

  // m_banks belongsTo m_medias via id_logo
  media!: Media;

  getMedia!: Sequelize.BelongsToGetAssociationMixin<Media>;

  setMedia!: Sequelize.BelongsToSetAssociationMixin<Media, MediaId>;

  createMedia!: Sequelize.BelongsToCreateAssociationMixin<Media>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Bank {
    Bank.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        bank_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("wallet name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'input proper wallet name',
            },
          },
        },
        id_logo: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: 'm_medias',
            key: 'id',
          },
        },
        is_visible: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          validate: {
            customValidator(value: number) {
              if (value < 0 || value > 2) {
                throw new Error(
                  'wallet visibility must be between or equal 0 and 2',
                );
              }
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
        tableName: 'm_banks',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_logo',
            using: 'BTREE',
            fields: [{ name: 'id_logo' }],
          },
        ],
        underscored: true,
      },
    );
    return Bank;
  }
}
