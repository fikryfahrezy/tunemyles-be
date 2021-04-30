import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Media, MediaId } from './Media';
import type { ProductUtility, ProductUtilityId } from './ProductUtility';

export interface ProductPhotoAttributes {
  id: number;
  id_u_product: number;
  id_m_medias: number;
  created_at?: Date;
  updated_at?: Date;
}

export type ProductPhotoPk = 'id';
export type ProductPhotoId = ProductPhoto[ProductPhotoPk];
export type ProductPhotoCreationAttributes = Optional<
ProductPhotoAttributes,
ProductPhotoPk
>;

export class ProductPhoto
  extends Model<ProductPhotoAttributes, ProductPhotoCreationAttributes>
  implements ProductPhotoAttributes {
  id!: number;

  id_u_product!: number;

  id_m_medias!: number;

  created_at?: Date;

  updated_at?: Date;

  // u_product_photos belongsTo m_medias via id_m_medias
  media!: Media;

  getMedia!: Sequelize.BelongsToGetAssociationMixin<Media>;

  setMedia!: Sequelize.BelongsToSetAssociationMixin<Media, MediaId>;

  createMedia!: Sequelize.BelongsToCreateAssociationMixin<Media>;

  // u_product_photos belongsTo u_product via id_u_product
  productUtility!: ProductUtility;

  getProductUtility!: Sequelize.BelongsToGetAssociationMixin<ProductUtility>;

  setProductUtility!: Sequelize.BelongsToSetAssociationMixin<
  ProductUtility,
  ProductUtilityId
  >;

  createProductUtility!: Sequelize.BelongsToCreateAssociationMixin<ProductUtility>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductPhoto {
    ProductPhoto.init(
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
        id_m_medias: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_medias',
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
        tableName: 'u_product_photos',
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
            name: 'id_m_medias',
            using: 'BTREE',
            fields: [{ name: 'id_m_medias' }],
          },
        ],
        underscored: true,
      },
    );
    return ProductPhoto;
  }
}
