import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';
import type { User, UserId } from './User';

export interface UserCartAttributes {
  id: number;
  id_m_users: number;
  id_merchant: number;
  id_m_products: number;
  qty?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type UserCartPk = 'id';
export type UserCartId = UserCart[UserCartPk];
export type UserCartCreationAttributes = Optional<
UserCartAttributes,
UserCartPk
>;

export class UserCart
  extends Model<UserCartAttributes, UserCartCreationAttributes>
  implements UserCartAttributes {
  id!: number;

  id_m_users!: number;

  id_merchant!: number;

  id_m_products!: number;

  qty?: number;

  status?: number;

  created_at?: Date;

  updated_at?: Date;

  // u_user_cart belongsTo m_products via id_m_products
  product!: Product;

  getProduct!: Sequelize.BelongsToGetAssociationMixin<Product>;

  setProduct!: Sequelize.BelongsToSetAssociationMixin<Product, ProductId>;

  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Product>;

  // u_user_cart belongsTo m_users via id_m_users
  user!: User;

  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;

  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  // u_user_cart belongsTo m_users via id_merchant
  merchant!: User;

  getMerchant!: Sequelize.BelongsToGetAssociationMixin<User>;

  setMerchant!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;

  createMerchant!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserCart {
    UserCart.init(
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
        id_merchant: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: 'm_users',
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
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: 'please input proper status',
            },
            customValidation(value: number) {
              if (value < 0 || value > 1) throw new Error('please input proper status');
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
        tableName: 'u_user_cart',
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
            name: 'id_merchant',
            using: 'BTREE',
            fields: [{ name: 'id_merchant' }],
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
    return UserCart;
  }
}
