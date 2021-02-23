import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type { u_product, u_productId } from "./u_product";

export interface u_product_photosAttributes {
  id: number;
  id_u_product: number;
  id_m_medias: number;
  created_at?: Date;
  updated_at?: Date;
}

export type u_product_photosPk = "id";
export type u_product_photosId = u_product_photos[u_product_photosPk];
export type u_product_photosCreationAttributes = Optional<
  u_product_photosAttributes,
  u_product_photosPk
>;

export class u_product_photos
  extends Model<u_product_photosAttributes, u_product_photosCreationAttributes>
  implements u_product_photosAttributes {
  id!: number;
  id_u_product!: number;
  id_m_medias!: number;
  created_at?: Date;
  updated_at?: Date;

  // u_product_photos belongsTo m_medias via id_m_medias
  id_m_medias_m_media!: m_medias;
  getId_m_medias_m_media!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
  setId_m_medias_m_media!: Sequelize.BelongsToSetAssociationMixin<
    m_medias,
    m_mediasId
  >;
  createId_m_medias_m_media!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;
  // u_product_photos belongsTo u_product via id_u_product
  id_u_product_u_product!: u_product;
  getId_u_product_u_product!: Sequelize.BelongsToGetAssociationMixin<u_product>;
  setId_u_product_u_product!: Sequelize.BelongsToSetAssociationMixin<
    u_product,
    u_productId
  >;
  createId_u_product_u_product!: Sequelize.BelongsToCreateAssociationMixin<u_product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof u_product_photos {
    u_product_photos.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_u_product: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "u_product",
            key: "id",
          },
        },
        id_m_medias: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "m_medias",
            key: "id",
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
        tableName: "u_product_photos",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_u_product",
            using: "BTREE",
            fields: [{ name: "id_u_product" }],
          },
          {
            name: "id_m_medias",
            using: "BTREE",
            fields: [{ name: "id_m_medias" }],
          },
        ],
        underscored: true,
      }
    );
    return u_product_photos;
  }
}
