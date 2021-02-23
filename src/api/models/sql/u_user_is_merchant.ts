import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type { u_user, u_userId } from "./u_user";

export interface u_user_is_merchantAttributes {
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

export type u_user_is_merchantPk = "id";
export type u_user_is_merchantId = u_user_is_merchant[u_user_is_merchantPk];
export type u_user_is_merchantCreationAttributes = Optional<
  u_user_is_merchantAttributes,
  u_user_is_merchantPk
>;

export class u_user_is_merchant
  extends Model<
    u_user_is_merchantAttributes,
    u_user_is_merchantCreationAttributes
  >
  implements u_user_is_merchantAttributes {
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
  id_identity_photo_m_media!: m_medias;
  getId_identity_photo_m_media!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
  setId_identity_photo_m_media!: Sequelize.BelongsToSetAssociationMixin<
    m_medias,
    m_mediasId
  >;
  createId_identity_photo_m_media!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;
  // u_user_is_merchant belongsTo m_medias via id_market_photo
  id_market_photo_m_media!: m_medias;
  getId_market_photo_m_media!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
  setId_market_photo_m_media!: Sequelize.BelongsToSetAssociationMixin<
    m_medias,
    m_mediasId
  >;
  createId_market_photo_m_media!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;
  // u_user_is_merchant belongsTo u_user via id_u_user
  id_u_user_u_user!: u_user;
  getId_u_user_u_user!: Sequelize.BelongsToGetAssociationMixin<u_user>;
  setId_u_user_u_user!: Sequelize.BelongsToSetAssociationMixin<
    u_user,
    u_userId
  >;
  createId_u_user_u_user!: Sequelize.BelongsToCreateAssociationMixin<u_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof u_user_is_merchant {
    u_user_is_merchant.init(
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
            model: "u_user",
            key: "id",
          },
        },
        no_identity: {
          type: DataTypes.STRING(16),
          allowNull: false,
          unique: "u_user_is_merchant_UN",
        },
        id_identity_photo: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "m_medias",
            key: "id",
          },
        },
        id_market_photo: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "m_medias",
            key: "id",
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
              msg: "please input proper time",
            },
            notNull: {
              msg: "please input proper time",
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
        tableName: "u_user_is_merchant",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "u_user_is_merchant_UN",
            unique: true,
            using: "BTREE",
            fields: [{ name: "no_identity" }],
          },
          {
            name: "id_u_user",
            using: "BTREE",
            fields: [{ name: "id_u_user" }],
          },
          {
            name: "id_identity_photo",
            using: "BTREE",
            fields: [{ name: "id_identity_photo" }],
          },
          {
            name: "id_market_photo",
            using: "BTREE",
            fields: [{ name: "id_market_photo" }],
          },
        ],
        underscored: true,
      }
    );
    return u_user_is_merchant;
  }
}
