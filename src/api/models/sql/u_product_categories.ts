import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_categories, m_categoriesId } from "./m_categories";
import type { u_product, u_productId } from "./u_product";

export interface u_product_categoriesAttributes {
  id: number;
  id_u_product: number;
  id_m_categories: number;
  created_at?: Date;
  updated_at?: Date;
}

export type u_product_categoriesPk = "id";
export type u_product_categoriesId = u_product_categories[u_product_categoriesPk];
export type u_product_categoriesCreationAttributes = Optional<
  u_product_categoriesAttributes,
  u_product_categoriesPk
>;

export class u_product_categories
  extends Model<
    u_product_categoriesAttributes,
    u_product_categoriesCreationAttributes
  >
  implements u_product_categoriesAttributes {
  id!: number;
  id_u_product!: number;
  id_m_categories!: number;
  created_at?: Date;
  updated_at?: Date;

  // u_product_categories belongsTo m_categories via id_m_categories
  id_m_categories_m_category!: m_categories;
  getId_m_categories_m_category!: Sequelize.BelongsToGetAssociationMixin<m_categories>;
  setId_m_categories_m_category!: Sequelize.BelongsToSetAssociationMixin<
    m_categories,
    m_categoriesId
  >;
  createId_m_categories_m_category!: Sequelize.BelongsToCreateAssociationMixin<m_categories>;
  // u_product_categories belongsTo u_product via id_u_product
  id_u_product_u_product!: u_product;
  getId_u_product_u_product!: Sequelize.BelongsToGetAssociationMixin<u_product>;
  setId_u_product_u_product!: Sequelize.BelongsToSetAssociationMixin<
    u_product,
    u_productId
  >;
  createId_u_product_u_product!: Sequelize.BelongsToCreateAssociationMixin<u_product>;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof u_product_categories {
    u_product_categories.init(
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
        id_m_categories: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "m_categories",
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
        tableName: "u_product_categories",
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
            name: "id_m_categories",
            using: "BTREE",
            fields: [{ name: "id_m_categories" }],
          },
        ],
        underscored: true,
      }
    );
    return u_product_categories;
  }
}
