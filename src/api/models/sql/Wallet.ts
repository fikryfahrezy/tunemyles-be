import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Media, MediaId } from './Media';
import type { UserWallet, UserWalletId } from './UserWallet';

export interface WalletAttributes {
  id: number;
  wallet_name: string;
  wallet_description: string;
  id_logo?: number;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type WalletPk = 'id';
export type WalletId = Wallet[WalletPk];
export type WalletCreationAttributes = Optional<WalletAttributes, WalletPk>;

export class Wallet
  extends Model<WalletAttributes, WalletCreationAttributes>
  implements WalletAttributes {
  id!: number;

  wallet_name!: string;

  wallet_description!: string;

  id_logo?: number;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // m_wallets belongsTo m_medias via id_logo
  media!: Media;

  getMedia!: Sequelize.BelongsToGetAssociationMixin<Media>;

  setMedia!: Sequelize.BelongsToSetAssociationMixin<Media, MediaId>;

  createMedia!: Sequelize.BelongsToCreateAssociationMixin<Media>;

  // m_wallets hasMany u_user_wallet via id_m_wallets
  userWallets!: UserWallet[];

  getUserWallets!: Sequelize.HasManyGetAssociationsMixin<UserWallet>;

  setUserWallets!: Sequelize.HasManySetAssociationsMixin<UserWallet, UserWalletId>;

  addUserWallet!: Sequelize.HasManyAddAssociationMixin<UserWallet, UserWalletId>;

  addUserWallets!: Sequelize.HasManyAddAssociationsMixin<UserWallet, UserWalletId>;

  createUserWallet!: Sequelize.HasManyCreateAssociationMixin<UserWallet>;

  removeUserWallet!: Sequelize.HasManyRemoveAssociationMixin<UserWallet, UserWalletId>;

  removeUserWallets!: Sequelize.HasManyRemoveAssociationsMixin<UserWallet, UserWalletId>;

  hasUserWallet!: Sequelize.HasManyHasAssociationMixin<UserWallet, UserWalletId>;

  hasUserWallets!: Sequelize.HasManyHasAssociationsMixin<UserWallet, UserWalletId>;

  countUserWallets!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Wallet {
    Wallet.init(
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
              if (value === '') throw new Error("wallet name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'input proper wallet name',
            },
          },
        },
        wallet_description: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("wallet description can't be empty");
            },
            len: {
              args: [2, 1000],
              msg: 'input proper wallet description',
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
                throw new Error('wallet visibility must be between or equal 0 and 2');
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
        tableName: 'm_wallets',
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
    return Wallet;
  }
}
