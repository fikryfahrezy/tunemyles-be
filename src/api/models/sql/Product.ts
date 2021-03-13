import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type { User, UserId } from "./User";
import type { u_product, u_productId } from "./u_product";
import type { u_user_cart, u_user_cartId } from "./u_user_cart";
import type {
    u_user_transaction_products,
    u_user_transaction_productsId,
} from "./u_user_transaction_products";

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

export type ProductPk = "id";
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
    media!: m_medias;
    getMedia!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
    setMedia!: Sequelize.BelongsToSetAssociationMixin<m_medias, m_mediasId>;
    createMedia!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;

    // m_products hasMany u_product via id_m_products
    productUtilities!: u_product[];
    getProductUtilities!: Sequelize.HasManyGetAssociationsMixin<u_product>;
    setProductUtilities!: Sequelize.HasManySetAssociationsMixin<
        u_product,
        u_productId
    >;
    addProductUtility!: Sequelize.HasManyAddAssociationMixin<
        u_product,
        u_productId
    >;
    addProductUtilities!: Sequelize.HasManyAddAssociationsMixin<
        u_product,
        u_productId
    >;
    createProductUtility!: Sequelize.HasManyCreateAssociationMixin<u_product>;
    removeProductUtility!: Sequelize.HasManyRemoveAssociationMixin<
        u_product,
        u_productId
    >;
    removeProductUtilities!: Sequelize.HasManyRemoveAssociationsMixin<
        u_product,
        u_productId
    >;
    hasProductUtility!: Sequelize.HasManyHasAssociationMixin<
        u_product,
        u_productId
    >;
    hasProductUtilities!: Sequelize.HasManyHasAssociationsMixin<
        u_product,
        u_productId
    >;
    countProductUtilities!: Sequelize.HasManyCountAssociationsMixin;

    // m_products hasMany u_user_cart via id_m_products
    userCarts!: u_user_cart[];
    getUserCarts!: Sequelize.HasManyGetAssociationsMixin<u_user_cart>;
    setUserCarts!: Sequelize.HasManySetAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    addUserCart!: Sequelize.HasManyAddAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    addUserCarts!: Sequelize.HasManyAddAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    createUserCart!: Sequelize.HasManyCreateAssociationMixin<u_user_cart>;
    removeUserCart!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    removeUserCarts!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    hasUserCart!: Sequelize.HasManyHasAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    hasUserCarts!: Sequelize.HasManyHasAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    countUserCarts!: Sequelize.HasManyCountAssociationsMixin;

    // m_products hasMany u_user_transaction_products via id_m_products
    userTransactionProducts!: u_user_transaction_products[];
    getUserTransactionProducts!: Sequelize.HasManyGetAssociationsMixin<u_user_transaction_products>;
    setUserTransactionProducts!: Sequelize.HasManySetAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    addU_user_transaction_product!: Sequelize.HasManyAddAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    addUserTransactionProducts!: Sequelize.HasManyAddAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    createUserTransactionProduct!: Sequelize.HasManyCreateAssociationMixin<u_user_transaction_products>;
    removeUserTransactionProduct!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    removeUserTransactionProducts!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    hasUserTransactionProduct!: Sequelize.HasManyHasAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    hasUserTransactionProducts!: Sequelize.HasManyHasAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    countUserTransactionProducts!: Sequelize.HasManyCountAssociationsMixin;

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
                        model: "m_users",
                        key: "id",
                    },
                },
                product_name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    validate: {
                        customValidator(value: string) {
                            if (value === "")
                                throw new Error("product name can't be empty");
                        },
                        len: {
                            args: [2, 255],
                            msg: "please input proper product name",
                        },
                    },
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    validate: {
                        customValidator(value: string) {
                            if (value === "")
                                throw new Error(
                                    "product description can't be empty"
                                );
                        },
                        len: {
                            args: [2, 1000],
                            msg: "please input proper description",
                        },
                    },
                },
                id_cover: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: true,
                    references: {
                        model: "m_medias",
                        key: "id",
                    },
                },
                is_visible: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 1,
                    validate: {
                        customValidator(value: number) {
                            if (value < 0 || value > 3)
                                throw new Error(
                                    "please input proper visibility"
                                );
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
                tableName: "m_products",
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
                        name: "id_cover",
                        using: "BTREE",
                        fields: [{ name: "id_cover" }],
                    },
                ],
                underscored: true,
            }
        );
        return Product;
    }
}
