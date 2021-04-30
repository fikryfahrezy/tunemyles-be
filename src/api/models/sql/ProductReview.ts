import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type {
  TransactionProduct,
  TransactionProductId,
} from './TransactionProduct';

export interface ProductReviewAttributes {
  id: number;
  id_u_user_transaction_products: number;
  rating?: number;
  review?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ProductReviewPk = 'id';
export type ProductReviewId = ProductReview[ProductReviewPk];
export type ProductReviewCreationAttributes = Optional<
ProductReviewAttributes,
ProductReviewPk
>;

export class ProductReview
  extends Model<ProductReviewAttributes, ProductReviewCreationAttributes>
  implements ProductReviewAttributes {
  id!: number;

  id_u_user_transaction_products!: number;

  rating?: number;

  review?: string;

  created_at?: Date;

  updated_at?: Date;

  /**
   * u_user_transaction_product_reviews belongsTo u_user_transaction_products
   * via id_u_user_transaction_products
   */
  transactionProduct!: TransactionProduct;

  getTransactionProduct!: Sequelize.BelongsToGetAssociationMixin<TransactionProduct>;

  setTransactionProduct!: Sequelize.BelongsToSetAssociationMixin<
  TransactionProduct,
  TransactionProductId
  >;

  createTransactionProduct!: Sequelize.BelongsToCreateAssociationMixin<TransactionProduct>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductReview {
    ProductReview.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        id_u_user_transaction_products: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'u_user_transaction_products',
            key: 'id',
          },
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          validate: {
            customValidator(value: number) {
              if (value < 1 || value > 5) throw new Error('please input proper visibility');
            },
          },
        },
        review: {
          type: DataTypes.TEXT,
          allowNull: true,
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
        tableName: 'u_user_transaction_product_reviews',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'id_u_user_transaction_products',
            using: 'BTREE',
            fields: [{ name: 'id_u_user_transaction_products' }],
          },
        ],
        underscored: true,
      },
    );
    return ProductReview;
  }
}
