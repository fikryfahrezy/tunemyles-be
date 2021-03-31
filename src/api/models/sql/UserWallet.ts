import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Wallet, WalletId } from './Wallet';
import type { UserUtility, UserUtilityId } from './UserUtility';
import type {
  UserTopUp,
  UserTopUpId,
} from './UserTopUp';
import type {
  UserWithdraw,
  UserWithdrawId,
} from './UserWithdraw';

export interface UserWalletAttributes {
  id: number;
  id_u_user: number;
  id_m_wallets?: number;
  balance?: number;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type UserWalletPk = 'id';
export type UserWalletId = UserWallet[UserWalletPk];
export type UserWalletCreationAttributes = Optional<
UserWalletAttributes,
UserWalletPk
>;

export class UserWallet
  extends Model<UserWalletAttributes, UserWalletCreationAttributes>
  implements UserWalletAttributes {
  id!: number;

  id_u_user!: number;

  id_m_wallets?: number;

  balance?: number;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user_wallet belongsTo m_wallets via id_m_wallets
  Wallet!: Wallet;

  getWallet!: Sequelize.BelongsToGetAssociationMixin<Wallet>;

  setWallet!: Sequelize.BelongsToSetAssociationMixin<Wallet, WalletId>;

  createWallet!: Sequelize.BelongsToCreateAssociationMixin<Wallet>;

  // u_user_wallet belongsTo u_user via id_u_user
  userUtility!: UserUtility;

  getUserUtility!: Sequelize.BelongsToGetAssociationMixin<UserUtility>;

  setUserUtility!: Sequelize.BelongsToSetAssociationMixin<
  UserUtility,
  UserUtilityId
  >;

  createUserUtility!: Sequelize.BelongsToCreateAssociationMixin<UserUtility>;

  // u_user_wallet hasMany u_user_wallet_top_up via id_u_user_wallet
  userTopUps!: UserTopUp[];

  getUserTopUps!: Sequelize.HasManyGetAssociationsMixin<UserTopUp>;

  setUserTopUps!: Sequelize.HasManySetAssociationsMixin<
  UserTopUp,
  UserTopUpId
  >;

  adduserTopUp!: Sequelize.HasManyAddAssociationMixin<
  UserTopUp,
  UserTopUpId
  >;

  addUserTopUps!: Sequelize.HasManyAddAssociationsMixin<
  UserTopUp,
  UserTopUpId
  >;

  createUserTopUp!: Sequelize.HasManyCreateAssociationMixin<UserTopUp>;

  removeUserTopUp!: Sequelize.HasManyRemoveAssociationMixin<
  UserTopUp,
  UserTopUpId
  >;

  removeUserTopUps!: Sequelize.HasManyRemoveAssociationsMixin<
  UserTopUp,
  UserTopUpId
  >;

  hasUserTopUp!: Sequelize.HasManyHasAssociationMixin<
  UserTopUp,
  UserTopUpId
  >;

  hasUserTopUps!: Sequelize.HasManyHasAssociationsMixin<
  UserTopUp,
  UserTopUpId
  >;

  countUserTopUps!: Sequelize.HasManyCountAssociationsMixin;

  // u_user_wallet hasMany u_user_wallet_withdraw via id_u_user_wallet
  userWithdraws!: UserWithdraw[];

  getUserWithdraws!: Sequelize.HasManyGetAssociationsMixin<UserWithdraw>;

  setUserWithdraws!: Sequelize.HasManySetAssociationsMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  addUserWithdraw!: Sequelize.HasManyAddAssociationMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  addUserWithdraws!: Sequelize.HasManyAddAssociationsMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  createUserWithdraw!: Sequelize.HasManyCreateAssociationMixin<UserWithdraw>;

  removeUserWithdraw!: Sequelize.HasManyRemoveAssociationMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  removeUserWithdraws!: Sequelize.HasManyRemoveAssociationsMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  hasUserWithdraw!: Sequelize.HasManyHasAssociationMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  hasUserWithdraws!: Sequelize.HasManyHasAssociationsMixin<
  UserWithdraw,
  UserWithdrawId
  >;

  countUserWithdraws!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserWallet {
    UserWallet.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_u_user: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'u_user',
            key: 'id',
          },
        },
        id_m_wallets: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            model: 'm_wallets',
            key: 'id',
          },
        },
        balance: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: 'Only allow numbers',
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
        tableName: 'u_user_wallet',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_u_user',
            using: 'BTREE',
            fields: [{ name: 'id_u_user' }],
          },
          {
            name: 'id_m_wallets',
            using: 'BTREE',
            fields: [{ name: 'id_m_wallets' }],
          },
        ],
        underscored: true,
      },
    );
    return UserWallet;
  }
}
