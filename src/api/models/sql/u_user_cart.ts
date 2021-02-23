import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_products, m_productsId } from "./m_products";
import type { m_users, m_usersId } from "./m_users";

export interface u_user_cartAttributes {
  id: number;
  id_m_users: number;
  id_merchant: number;
  id_m_products: number;
  qty?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type u_user_cartPk = "id";
export type u_user_cartId = u_user_cart[u_user_cartPk];
export type u_user_cartCreationAttributes = Optional<
  u_user_cartAttributes,
  u_user_cartPk
>;

export class u_user_cart
  extends Model<u_user_cartAttributes, u_user_cartCreationAttributes>
  implements u_user_cartAttributes {
  id!: number;
  id_m_users!: number;
  id_merchant!: number;
  id_m_products!: number;
  qty?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;

  // u_user_cart belongsTo m_products via id_m_products
  id_m_products_m_product!: m_products;
  getId_m_products_m_product!: Sequelize.BelongsToGetAssociationMixin<m_products>;
  setId_m_products_m_product!: Sequelize.BelongsToSetAssociationMixin<
    m_products,
    m_productsId
  >;
  createId_m_products_m_product!: Sequelize.BelongsToCreateAssociationMixin<m_products>;
  // u_user_cart belongsTo m_users via id_m_users
  id_m_users_m_user!: m_users;
  getId_m_users_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
  setId_m_users_m_user!: Sequelize.BelongsToSetAssociationMixin<
    m_users,
    m_usersId
  >;
  createId_m_users_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;
  // u_user_cart belongsTo m_users via id_merchant
  id_merchant_m_user!: m_users;
  getId_merchant_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
  setId_merchant_m_user!: Sequelize.BelongsToSetAssociationMixin<
    m_users,
    m_usersId
  >;
  createId_merchant_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof u_user_cart {
    u_user_cart.init(
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
            model: "m_users",
            key: "id",
          },
        },
        id_merchant: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "m_users",
            key: "id",
          },
        },
        id_m_products: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "m_products",
            key: "id",
          },
        },
        qty: {
          type: DataTypes.BIGINT,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: "please input proper qty",
            },
          },
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
          validate: {
            isNumeric: {
              msg: "please input proper status",
            },
            customValidation(value: number) {
              if (value < 0 || value > 1)
                throw new Error("please input proper status");
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
        tableName: "u_user_cart",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "id_m_users",
            using: "BTREE",
            fields: [{ name: "id_m_users" }],
          },
          {
            name: "id_merchant",
            using: "BTREE",
            fields: [{ name: "id_merchant" }],
          },
          {
            name: "id_m_products",
            using: "BTREE",
            fields: [{ name: "id_m_products" }],
          },
        ],
        underscored: true,
      }
    );
    return u_user_cart;
  }
}
