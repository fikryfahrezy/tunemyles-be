import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type { m_users, m_usersId } from "./m_users";
import type { u_product, u_productId } from "./u_product";
import type { u_user_cart, u_user_cartId } from "./u_user_cart";
import type {
    u_user_transaction_products,
    u_user_transaction_productsId,
} from "./u_user_transaction_products";

export interface m_productsAttributes {
    id: number;
    id_m_users: number;
    product_name: string;
    description?: string;
    id_cover?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type m_productsPk = "id";
export type m_productsId = m_products[m_productsPk];
export type m_productsCreationAttributes = Optional<
    m_productsAttributes,
    m_productsPk
>;

export class m_products
    extends Model<m_productsAttributes, m_productsCreationAttributes>
    implements m_productsAttributes {
    id!: number;
    id_m_users!: number;
    product_name!: string;
    description?: string;
    id_cover?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;

    // m_products belongsTo m_medias via id_cover
    id_cover_m_media!: m_medias;
    getId_cover_m_media!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
    setId_cover_m_media!: Sequelize.BelongsToSetAssociationMixin<
        m_medias,
        m_mediasId
    >;
    createId_cover_m_media!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;
    // m_products hasMany u_product via id_m_products
    u_products!: u_product[];
    getU_products!: Sequelize.HasManyGetAssociationsMixin<u_product>;
    setU_products!: Sequelize.HasManySetAssociationsMixin<
        u_product,
        u_productId
    >;
    addU_product!: Sequelize.HasManyAddAssociationMixin<u_product, u_productId>;
    addU_products!: Sequelize.HasManyAddAssociationsMixin<
        u_product,
        u_productId
    >;
    createU_product!: Sequelize.HasManyCreateAssociationMixin<u_product>;
    removeU_product!: Sequelize.HasManyRemoveAssociationMixin<
        u_product,
        u_productId
    >;
    removeU_products!: Sequelize.HasManyRemoveAssociationsMixin<
        u_product,
        u_productId
    >;
    hasU_product!: Sequelize.HasManyHasAssociationMixin<u_product, u_productId>;
    hasU_products!: Sequelize.HasManyHasAssociationsMixin<
        u_product,
        u_productId
    >;
    countU_products!: Sequelize.HasManyCountAssociationsMixin;
    // m_products hasMany u_user_cart via id_m_products
    u_user_carts!: u_user_cart[];
    getU_user_carts!: Sequelize.HasManyGetAssociationsMixin<u_user_cart>;
    setU_user_carts!: Sequelize.HasManySetAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    addU_user_cart!: Sequelize.HasManyAddAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    addU_user_carts!: Sequelize.HasManyAddAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    createU_user_cart!: Sequelize.HasManyCreateAssociationMixin<u_user_cart>;
    removeU_user_cart!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    removeU_user_carts!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    hasU_user_cart!: Sequelize.HasManyHasAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    hasU_user_carts!: Sequelize.HasManyHasAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    countU_user_carts!: Sequelize.HasManyCountAssociationsMixin;
    // m_products hasMany u_user_transaction_products via id_m_products
    u_user_transaction_products!: u_user_transaction_products[];
    getU_user_transaction_products!: Sequelize.HasManyGetAssociationsMixin<u_user_transaction_products>;
    setU_user_transaction_products!: Sequelize.HasManySetAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    addU_user_transaction_product!: Sequelize.HasManyAddAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    addU_user_transaction_products!: Sequelize.HasManyAddAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    createU_user_transaction_product!: Sequelize.HasManyCreateAssociationMixin<u_user_transaction_products>;
    removeU_user_transaction_product!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    removeU_user_transaction_products!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    hasU_user_transaction_product!: Sequelize.HasManyHasAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    hasU_user_transaction_products!: Sequelize.HasManyHasAssociationsMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    countU_user_transaction_products!: Sequelize.HasManyCountAssociationsMixin;
    // m_products belongsTo m_users via id_m_users
    id_m_users_m_user!: m_users;
    getId_m_users_m_user!: Sequelize.BelongsToGetAssociationMixin<m_users>;
    setId_m_users_m_user!: Sequelize.BelongsToSetAssociationMixin<
        m_users,
        m_usersId
    >;
    createId_m_users_m_user!: Sequelize.BelongsToCreateAssociationMixin<m_users>;

    static initModel(sequelize: Sequelize.Sequelize): typeof m_products {
        m_products.init(
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
                    defaultValue: 1,
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
        return m_products;
    }
}
