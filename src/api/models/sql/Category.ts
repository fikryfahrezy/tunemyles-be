import slugify from 'slugify';
import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Media, MediaId } from './Media';
import type {
  ProductCategory,
  ProductCategoryId,
} from './ProductCategory';

export interface CategoryAttributes {
  id: number;
  category: string;
  slug: string;
  description?: string;
  id_icon?: number;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type CategoryPk = 'id';
export type CategoryId = Category[CategoryPk];
export type CategoryCreationAttributes = Optional<
CategoryAttributes,
CategoryPk
>;

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes {
  id!: number;

  category!: string;

  slug!: string;

  description?: string;

  id_icon?: number;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // m_categories hasMany u_product_categories via id_m_categories
  productCategories!: ProductCategory[];

  getProductCategories!: Sequelize.HasManyGetAssociationsMixin<ProductCategory>;

  setProductCategories!: Sequelize.HasManySetAssociationsMixin<
  ProductCategory,
  ProductCategoryId
  >;

  addProductCategory!: Sequelize.HasManyAddAssociationMixin<
  ProductCategory,
  ProductCategoryId
  >;

  addProductCategories!: Sequelize.HasManyAddAssociationsMixin<
  ProductCategory,
  ProductCategoryId
  >;

  createProductCategory!: Sequelize.HasManyCreateAssociationMixin<ProductCategory>;

  removeProductCategory!: Sequelize.HasManyRemoveAssociationMixin<
  ProductCategory,
  ProductCategoryId
  >;

  removeProductCategories!: Sequelize.HasManyRemoveAssociationsMixin<
  ProductCategory,
  ProductCategoryId
  >;

  hasProductCategory!: Sequelize.HasManyHasAssociationMixin<
  ProductCategory,
  ProductCategoryId
  >;

  hasProductCategories!: Sequelize.HasManyHasAssociationsMixin<
  ProductCategory,
  ProductCategoryId
  >;

  countProductCategories!: Sequelize.HasManyCountAssociationsMixin;

  // m_categories belongsTo m_medias via id_icon
  media!: Media;

  getMedia!: Sequelize.BelongsToGetAssociationMixin<Media>;

  setMedia!: Sequelize.BelongsToSetAssociationMixin<
  Media,
  MediaId
  >;

  createMedia!: Sequelize.BelongsToCreateAssociationMixin<Media>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Category {
    Category.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        category: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("category name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'input proper category name',
            },
          },
        },
        slug: {
          type: DataTypes.TEXT,
          allowNull: false,
          set() {
            this.setDataValue(
              'slug',
              slugify(this.getDataValue('category'), {
                lower: true,
              }),
            );
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        id_icon: {
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
                throw new Error(
                  'category visibility must be between or equal 0 and 2',
                );
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
        tableName: 'm_categories',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_icon',
            using: 'BTREE',
            fields: [{ name: 'id_icon' }],
          },
        ],
        underscored: true,
      },
    );
    return Category;
  }
}
