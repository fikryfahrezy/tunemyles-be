import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Media, MediaId } from './Media';
import type { UserUtility, UserUtilityId } from './UserUtility';

export interface MerchantAttributes {
  id: number;
  id_u_user: number;
  no_identity: string;
  id_identity_photo: number;
  id_market_photo: number;
  market_name: string;
  market_address: string;
  market_lat?: number;
  market_lon?: number;
  market_close_time: string;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type MerchantPk = 'id';
export type MerchantId = Merchant[MerchantPk];
export type MerchantCreationAttributes = Optional<
MerchantAttributes,
MerchantPk
>;

export class Merchant
  extends Model<
  MerchantAttributes,
  MerchantCreationAttributes
  >
  implements MerchantAttributes {
  id!: number;

  id_u_user!: number;

  no_identity!: string;

  id_identity_photo!: number;

  id_market_photo!: number;

  market_name!: string;

  market_address!: string;

  market_lat?: number;

  market_lon?: number;

  market_close_time!: string;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user_is_merchant belongsTo m_medias via id_identity_photo
  identityPhoto!: Media;

  getIdentityPhoto!: Sequelize.BelongsToGetAssociationMixin<Media>;

  setIdentityPhoto!: Sequelize.BelongsToSetAssociationMixin<
  Media,
  MediaId
  >;

  createIdentityPhoto!: Sequelize.BelongsToCreateAssociationMixin<Media>;

  // u_user_is_merchant belongsTo m_medias via id_market_photo
  marketPhoto!: Media;

  getMarketPhoto!: Sequelize.BelongsToGetAssociationMixin<Media>;

  setMarketPhoto!: Sequelize.BelongsToSetAssociationMixin<
  Media,
  MediaId
  >;

  createMarketPhoto!: Sequelize.BelongsToCreateAssociationMixin<Media>;

  // u_user_is_merchant belongsTo u_user via id_u_user
  userUtility!: UserUtility;

  getUserUtility!: Sequelize.BelongsToGetAssociationMixin<UserUtility>;

  setUserUtility!: Sequelize.BelongsToSetAssociationMixin<
  UserUtility,
  UserUtilityId
  >;

  createUserUtility!: Sequelize.BelongsToCreateAssociationMixin<UserUtility>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Merchant {
    Merchant.init(
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
        no_identity: {
          type: DataTypes.STRING(16),
          allowNull: false,
          unique: 'u_user_is_merchant_UN',
        },
        id_identity_photo: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_medias',
            key: 'id',
          },
        },
        id_market_photo: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_medias',
            key: 'id',
          },
        },
        market_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        market_address: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        market_lat: {
          type: DataTypes.DOUBLE,
          allowNull: true,
          defaultValue: 0,
        },
        market_lon: {
          type: DataTypes.DOUBLE,
          allowNull: true,
          defaultValue: 0,
        },
        market_close_time: {
          type: DataTypes.STRING(20),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'please input proper time',
            },
            notNull: {
              msg: 'please input proper time',
            },
          },
        },
        is_visible: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
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
        tableName: 'u_user_is_merchant',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'u_user_is_merchant_UN',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'no_identity' }],
          },
          {
            name: 'id_u_user',
            using: 'BTREE',
            fields: [{ name: 'id_u_user' }],
          },
          {
            name: 'id_identity_photo',
            using: 'BTREE',
            fields: [{ name: 'id_identity_photo' }],
          },
          {
            name: 'id_market_photo',
            using: 'BTREE',
            fields: [{ name: 'id_market_photo' }],
          },
        ],
        underscored: true,
      },
    );
    return Merchant;
  }
}
