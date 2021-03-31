import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Media, MediaId } from './Media';
import type { User, UserId } from './User';
import type { ProductUtility, ProductUtilityId } from './ProductUtility';
import type { UserCart, UserCartId } from './UserCart';
import type {
  TransactionProduct,
  TransactionProductId,
} from './TransactionProduct';

export interface ProductAttributes {
  id: number;
  id_m_users: number;
  product_name: string;
  description?: string;
  id_cover?: number;
  is_visible?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type ProductPk = 'id';
export type ProductId = Product[ProductPk];
export type ProductCreationAttributes = Optional<ProductAttributes, ProductPk>;

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  id!: number;

  id_m_users!: number;

  product_name!: string;

  description?: string;

  id_cover?: number;

  is_visible?: number;

  created_at?: Date;

  updated_at?: Date;

  // m_products belongsTo m_medias via id_cover
  media!: Media;

  getMedia!: Sequelize.BelongsToGetAssociationMixin<Media>;

  setMedia!: Sequelize.BelongsToSetAssociationMixin<Media, MediaId>;

  createMedia!: Sequelize.BelongsToCreateAssociationMixin<Media>;

  // m_products hasMany u_product via id_m_products
  productUtilities!: ProductUtility[];

  getProductUtilities!: Sequelize.HasManyGetAssociationsMixin<ProductUtility>;

  setProductUtilities!: Sequelize.HasManySetAssociationsMixin<
  ProductUtility,
  ProductUtilityId
  >;

  addProductUtility!: Sequelize.HasManyAddAssociationMixin<
  ProductUtility,
  ProductUtilityId
  >;

  addProductUtilities!: Sequelize.HasManyAddAssociationsMixin<
  ProductUtility,
  ProductUtilityId
  >;

  createProductUtility!: Sequelize.HasManyCreateAssociationMixin<ProductUtility>;

  removeProductUtility!: Sequelize.HasManyRemoveAssociationMixin<
  ProductUtility,
  ProductUtilityId
  >;

  removeProductUtilities!: Sequelize.HasManyRemoveAssociationsMixin<
  ProductUtility,
  ProductUtilityId
  >;

  hasProductUtility!: Sequelize.HasManyHasAssociationMixin<
  ProductUtility,
  ProductUtilityId
  >;

  hasProductUtilities!: Sequelize.HasManyHasAssociationsMixin<
  ProductUtility,
  ProductUtilityId
  >;

  countProductUtilities!: Sequelize.HasManyCountAssociationsMixin;

  // m_products hasMany u_user_cart via id_m_products
  userCarts!: UserCart[];

  getUserCarts!: Sequelize.HasManyGetAssociationsMixin<UserCart>;

  setUserCarts!: Sequelize.HasManySetAssociationsMixin<
  UserCart,
  UserCartId
  >;

  addUserCart!: Sequelize.HasManyAddAssociationMixin<
  UserCart,
  UserCartId
  >;

  addUserCarts!: Sequelize.HasManyAddAssociationsMixin<
  UserCart,
  UserCartId
  >;

  createUserCart!: Sequelize.HasManyCreateAssociationMixin<UserCart>;

  removeUserCart!: Sequelize.HasManyRemoveAssociationMixin<
  UserCart,
  UserCartId
  >;

  removeUserCarts!: Sequelize.HasManyRemoveAssociationsMixin<
  UserCart,
  UserCartId
  >;

  hasUserCart!: Sequelize.HasManyHasAssociationMixin<
  UserCart,
  UserCartId
  >;

  hasUserCarts!: Sequelize.HasManyHasAssociationsMixin<
  UserCart,
  UserCartId
  >;

  countUserCarts!: Sequelize.HasManyCountAssociationsMixin;

  // m_products hasMany u_user_transaction_products via id_m_products
  transactionProducts!: TransactionProduct[];

  getTransactionProducts!: Sequelize.HasManyGetAssociationsMixin<TransactionProduct>;

  setTransactionProducts!: Sequelize.HasManySetAssociationsMixin<
  TransactionProduct,
  TransactionProductId
  >;

  addTransactionProduct!: Sequelize.HasManyAddAssociationMixin<
  TransactionProduct,
  TransactionProductId
  >;

  addTransactionProducts!: Sequelize.HasManyAddAssociationsMixin<
  TransactionProduct,
  TransactionProductId
  >;

  createTransactionProduct!: Sequelize.HasManyCreateAssociationMixin<TransactionProduct>;

  removeTransactionProduct!: Sequelize.HasManyRemoveAssociationMixin<
  TransactionProduct,
  TransactionProductId
  >;

  removeTransactionProducts!: Sequelize.HasManyRemoveAssociationsMixin<
  TransactionProduct,
  TransactionProductId
  >;

  hasTransactionProduct!: Sequelize.HasManyHasAssociationMixin<
  TransactionProduct,
  TransactionProductId
  >;

  hasTransactionProducts!: Sequelize.HasManyHasAssociationsMixin<
  TransactionProduct,
  TransactionProductId
  >;

  countTransactionProducts!: Sequelize.HasManyCountAssociationsMixin;

  // m_products belongsTo m_users via id_m_users
  user!: User;

  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;

  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Product {
    Product.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_m_users: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_users',
            key: 'id',
          },
        },
        product_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("product name can't be empty");
            },
            len: {
              args: [2, 255],
              msg: 'please input proper product name',
            },
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          validate: {
            customValidator(value: string) {
              if (value === '') throw new Error("product description can't be empty");
            },
            len: {
              args: [2, 1000],
              msg: 'please input proper description',
            },
          },
        },
        id_cover: {
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
              if (value < 0 || value > 3) throw new Error('please input proper visibility');
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
        tableName: 'm_products',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_m_users',
            using: 'BTREE',
            fields: [{ name: 'id_m_users' }],
          },
          {
            name: 'id_cover',
            using: 'BTREE',
            fields: [{ name: 'id_cover' }],
          },
        ],
        underscored: true,
      },
    );
    return Product;
  }
}
