import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { BankUser, BankUserId } from './BankUser';
import type { UserWallet, UserWalletId } from './UserWallet';

export interface UserWithdrawAttributes {
  id: number;
  id_u_user_wallet: number;
  id_u_user_bank_account: number;
  balance_request?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type UserWithdrawPk = 'id';
export type UserWithdrawId = UserWithdraw[UserWithdrawPk];
export type UserWithdrawCreationAttributes = Optional<
UserWithdrawAttributes,
UserWithdrawPk
>;

export class UserWithdraw
  extends Model<UserWithdrawAttributes, UserWithdrawCreationAttributes>
  implements UserWithdrawAttributes {
  id!: number;

  id_u_user_wallet!: number;

  id_u_user_bank_account!: number;

  balance_request?: number;

  status?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user_wallet_withdraw belongsTo u_user_bank_account via id_u_user_bank_account
  bankUser!: BankUser;

  getBankUser!: Sequelize.BelongsToGetAssociationMixin<BankUser>;

  setBankUser!: Sequelize.BelongsToSetAssociationMixin<BankUser, BankUserId>;

  createBankAccount!: Sequelize.BelongsToCreateAssociationMixin<BankUser>;

  // u_user_wallet_withdraw belongsTo u_user_wallet via id_u_user_wallet
  userWallet!: UserWallet;

  getUserWallet!: Sequelize.BelongsToGetAssociationMixin<UserWallet>;

  setUserWallet!: Sequelize.BelongsToSetAssociationMixin<
  UserWallet,
  UserWalletId
  >;

  createUserWallet!: Sequelize.BelongsToCreateAssociationMixin<UserWallet>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserWithdraw {
    UserWithdraw.init(
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
            model: 'u_user_wallet',
            key: 'id',
          },
        },
        id_u_user_bank_account: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'u_user_bank_account',
            key: 'id',
          },
        },
        balance_request: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: 'please input proper balance request',
            },
          },
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          validate: {
            isNumeric: {
              msg: 'please input proper status',
            },
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
        tableName: 'u_user_wallet_withdraw',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_u_user_wallet',
            using: 'BTREE',
            fields: [{ name: 'id_u_user_wallet' }],
          },
          {
            name: 'id_u_user_bank_account',
            using: 'BTREE',
            fields: [{ name: 'id_u_user_bank_account' }],
          },
        ],
        underscored: true,
      },
    );
    return UserWithdraw;
  }
}
