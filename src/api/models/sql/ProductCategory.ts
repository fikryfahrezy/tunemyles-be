import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Category, CategoryId } from './Category';
import type { ProductUtility, ProductUtilityId } from './ProductUtility';

export interface ProductCategoryAttributes {
  id: number;
  id_u_product: number;
  id_m_categories: number;
  created_at?: Date;
  updated_at?: Date;
}

export type ProductCategoryPk = 'id';
export type ProductCategoryId = ProductCategory[ProductCategoryPk];
export type ProductCategoryCreationAttributes = Optional<
  ProductCategoryAttributes,
  ProductCategoryPk
>;

export class ProductCategory
  extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>
  implements ProductCategoryAttributes {
  id!: number;

  id_u_product!: number;

  id_m_categories!: number;

  created_at?: Date;

  updated_at?: Date;

  // u_product_categories belongsTo m_categories via id_m_categories
  category!: Category;

  getCategory!: Sequelize.BelongsToGetAssociationMixin<Category>;

  setCategory!: Sequelize.BelongsToSetAssociationMixin<Category, CategoryId>;

  createCategory!: Sequelize.BelongsToCreateAssociationMixin<Category>;

  // u_product_categories belongsTo u_product via id_u_product
  productUtility!: ProductUtility;

  getProductUtility!: Sequelize.BelongsToGetAssociationMixin<ProductUtility>;

  setProductUtility!: Sequelize.BelongsToSetAssociationMixin<ProductUtility, ProductUtilityId>;

  createProductUtility!: Sequelize.BelongsToCreateAssociationMixin<ProductUtility>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductCategory {
    ProductCategory.init(
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
            model: 'u_product',
            key: 'id',
          },
        },
        id_m_categories: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_categories',
            key: 'id',
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
        tableName: 'u_product_categories',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_u_product',
            using: 'BTREE',
            fields: [{ name: 'id_u_product' }],
          },
          {
            name: 'id_m_categories',
            using: 'BTREE',
            fields: [{ name: 'id_m_categories' }],
          },
        ],
        underscored: true,
      },
    );
    return ProductCategory;
  }
}
