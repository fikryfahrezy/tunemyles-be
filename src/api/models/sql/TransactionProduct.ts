import md5 from 'md5';
import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';
import type {
  UserTransaction,
  UserTransactionId,
} from './UserTransaction';
import type {
  ProductReview,
  ProductReviewId,
} from './ProductReview';

export interface TransactionProductAttributes {
  id: number;
  id_u_user_transaction: number;
  id_m_products: number;
  qty?: number;
  transaction_token: string;
  sub_total_price?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type TransactionProductPk = 'id';
export type TransactionProductId = TransactionProduct[TransactionProductPk];
export type TransactionProductCreationAttributes = Optional<
TransactionProductAttributes,
TransactionProductPk
>;

export class TransactionProduct
  extends Model<
  TransactionProductAttributes,
  TransactionProductCreationAttributes
  >
  implements TransactionProductAttributes {
  id!: number;

  id_u_user_transaction!: number;

  id_m_products!: number;

  qty?: number;

  transaction_token!: string;

  sub_total_price?: number;

  status?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user_transaction_products belongsTo m_products via id_m_products
  id_m_products_m_product!: Product;

  getId_m_products_m_product!: Sequelize.BelongsToGetAssociationMixin<Product>;

  setId_m_products_m_product!: Sequelize.BelongsToSetAssociationMixin<
  Product,
  ProductId
  >;

  createId_m_products_m_product!: Sequelize.BelongsToCreateAssociationMixin<Product>;

  // u_user_transaction_products belongsTo u_user_transaction via id_u_user_transaction
  userTransaction!: UserTransaction;

  getUserTransaction!: Sequelize.BelongsToGetAssociationMixin<UserTransaction>;

  setUserTransaction!: Sequelize.BelongsToSetAssociationMixin<
  UserTransaction,
  UserTransactionId
  >;

  createUserTransaction!: Sequelize.BelongsToCreateAssociationMixin<UserTransaction>;

  /**
   * u_user_transaction_products hasMany u_user_transaction_product_reviews
   * via id_u_user_transaction_products
   */
  productReviews!: ProductReview[];

  getProductReviews!: Sequelize.HasManyGetAssociationsMixin<ProductReview>;

  setProductReviews!: Sequelize.HasManySetAssociationsMixin<
  ProductReview,
  ProductReviewId
  >;

  addProductReview!: Sequelize.HasManyAddAssociationMixin<
  ProductReview,
  ProductReviewId
  >;

  addProductReviews!: Sequelize.HasManyAddAssociationsMixin<
  ProductReview,
  ProductReviewId
  >;

  createProductReview!: Sequelize.HasManyCreateAssociationMixin<ProductReview>;

  removeProductReview!: Sequelize.HasManyRemoveAssociationMixin<
  ProductReview,
  ProductReviewId
  >;

  removeProductReviews!: Sequelize.HasManyRemoveAssociationsMixin<
  ProductReview,
  ProductReviewId
  >;

  hasProductReview!: Sequelize.HasManyHasAssociationMixin<
  ProductReview,
  ProductReviewId
  >;

  hasProductReviews!: Sequelize.HasManyHasAssociationsMixin<
  ProductReview,
  ProductReviewId
  >;

  countProductReviews!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(
    sequelize: Sequelize.Sequelize,
  ): typeof TransactionProduct {
    TransactionProduct.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_u_user_transaction: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'u_user_transaction',
            key: 'id',
          },
        },
        id_m_products: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_products',
            key: 'id',
          },
        },
        qty: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: 'please input proper qty',
            },
          },
        },
        transaction_token: {
          type: DataTypes.STRING(255),
          allowNull: false,
          set(value: string) {
            const token = md5(`${value}`);
            this.setDataValue('transaction_token', token);
          },
        },
        sub_total_price: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: 'please input proper status',
            },
            customValidator(value: number) {
              if (value < 0 || value > 4) throw new Error('please input proper visibility');
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
        tableName: 'u_user_transaction_products',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_u_user_transaction',
            using: 'BTREE',
            fields: [{ name: 'id_u_user_transaction' }],
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
    return TransactionProduct;
  }
}
