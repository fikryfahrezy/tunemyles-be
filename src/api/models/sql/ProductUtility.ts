import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';
import type { ProductCategory, ProductCategoryId } from './ProductCategory';
import type { ProductPhoto, ProductPhotoId } from './ProductPhoto';

export interface ProductUtilityAttributes {
  id: number;
  id_m_products: number;
  price_default?: number;
  price_selling?: number;
  qty?: number;
  discount?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type ProductUtilityPk = 'id';
export type ProductUtilityId = ProductUtility[ProductUtilityPk];
export type ProductUtilityCreationAttributes = Optional<ProductUtilityAttributes, ProductUtilityPk>;

export class ProductUtility
  extends Model<ProductUtilityAttributes, ProductUtilityCreationAttributes>
  implements ProductUtilityAttributes {
  id!: number;

  id_m_products!: number;

  price_default?: number;

  price_selling?: number;

  qty?: number;

  discount?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_product belongsTo m_products via id_m_products
  product!: Product;

  getProduct!: Sequelize.BelongsToGetAssociationMixin<Product>;

  setProduct!: Sequelize.BelongsToSetAssociationMixin<Product, ProductId>;

  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Product>;

  // u_product hasMany u_product_categories via id_u_product
  productCategories!: ProductCategory[];

  getProductCategories!: Sequelize.HasManyGetAssociationsMixin<ProductCategory>;

  setProductCategories!: Sequelize.HasManySetAssociationsMixin<ProductCategory, ProductCategoryId>;

  addProductCategory!: Sequelize.HasManyAddAssociationMixin<ProductCategory, ProductCategoryId>;

  addProductCategories!: Sequelize.HasManyAddAssociationsMixin<ProductCategory, ProductCategoryId>;

  createProductCategory!: Sequelize.HasManyCreateAssociationMixin<ProductCategory>;

  removeProductCategory!: Sequelize.HasManyRemoveAssociationMixin<
    ProductCategory,
    ProductCategoryId
  >;

  removeProductCategories!: Sequelize.HasManyRemoveAssociationsMixin<
    ProductCategory,
    ProductCategoryId
  >;

  hasU_product_category!: Sequelize.HasManyHasAssociationMixin<ProductCategory, ProductCategoryId>;

  hasProductCategories!: Sequelize.HasManyHasAssociationsMixin<ProductCategory, ProductCategoryId>;

  countProductCategories!: Sequelize.HasManyCountAssociationsMixin;

  // u_product hasMany u_product_photos via id_u_product
  productPhoto!: ProductPhoto[];

  getProductPhotos!: Sequelize.HasManyGetAssociationsMixin<ProductPhoto>;

  setProductPhotos!: Sequelize.HasManySetAssociationsMixin<ProductPhoto, ProductPhotoId>;

  addProductPhoto!: Sequelize.HasManyAddAssociationMixin<ProductPhoto, ProductPhotoId>;

  addProductPhotos!: Sequelize.HasManyAddAssociationsMixin<ProductPhoto, ProductPhotoId>;

  createProductPhoto!: Sequelize.HasManyCreateAssociationMixin<ProductPhoto>;

  removeProductPhoto!: Sequelize.HasManyRemoveAssociationMixin<ProductPhoto, ProductPhotoId>;

  removeProductPhotos!: Sequelize.HasManyRemoveAssociationsMixin<ProductPhoto, ProductPhotoId>;

  hasProductPhoto!: Sequelize.HasManyHasAssociationMixin<ProductPhoto, ProductPhotoId>;

  hasProductPhotos!: Sequelize.HasManyHasAssociationsMixin<ProductPhoto, ProductPhotoId>;

  countProductPhotos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductUtility {
    ProductUtility.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_m_products: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_products',
            key: 'id',
          },
        },
        price_default: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
        },
        price_selling: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
        },
        qty: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
        },
        discount: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
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
        tableName: 'u_product',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_m_products',
            using: 'BTREE',
            fields: [{ name: 'id_m_products' }],
          },
        ],
        underscored: true,
      },
    );
    return ProductUtility;
  }
}
