import md5 from "md5";
import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_products, m_productsId } from "./m_products";
import type {
    u_user_transaction,
    u_user_transactionId,
} from "./u_user_transaction";
import type {
    u_user_transaction_product_reviews,
    u_user_transaction_product_reviewsId,
} from "./u_user_transaction_product_reviews";

export interface u_user_transaction_productsAttributes {
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

export type u_user_transaction_productsPk = "id";
export type u_user_transaction_productsId = u_user_transaction_products[u_user_transaction_productsPk];
export type u_user_transaction_productsCreationAttributes = Optional<
    u_user_transaction_productsAttributes,
    u_user_transaction_productsPk
>;

export class u_user_transaction_products
    extends Model<
        u_user_transaction_productsAttributes,
        u_user_transaction_productsCreationAttributes
    >
    implements u_user_transaction_productsAttributes {
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
    id_m_products_m_product!: m_products;
    getId_m_products_m_product!: Sequelize.BelongsToGetAssociationMixin<m_products>;
    setId_m_products_m_product!: Sequelize.BelongsToSetAssociationMixin<
        m_products,
        m_productsId
    >;
    createId_m_products_m_product!: Sequelize.BelongsToCreateAssociationMixin<m_products>;
    // u_user_transaction_products belongsTo u_user_transaction via id_u_user_transaction
    id_u_user_transaction_u_user_transaction!: u_user_transaction;
    getId_u_user_transaction_u_user_transaction!: Sequelize.BelongsToGetAssociationMixin<u_user_transaction>;
    setId_u_user_transaction_u_user_transaction!: Sequelize.BelongsToSetAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    createId_u_user_transaction_u_user_transaction!: Sequelize.BelongsToCreateAssociationMixin<u_user_transaction>;
    // u_user_transaction_products hasMany u_user_transaction_product_reviews via id_u_user_transaction_products
    u_user_transaction_product_reviews!: u_user_transaction_product_reviews[];
    getU_user_transaction_product_reviews!: Sequelize.HasManyGetAssociationsMixin<u_user_transaction_product_reviews>;
    setU_user_transaction_product_reviews!: Sequelize.HasManySetAssociationsMixin<
        u_user_transaction_product_reviews,
        u_user_transaction_product_reviewsId
    >;
    addU_user_transaction_product_review!: Sequelize.HasManyAddAssociationMixin<
        u_user_transaction_product_reviews,
        u_user_transaction_product_reviewsId
    >;
    addU_user_transaction_product_reviews!: Sequelize.HasManyAddAssociationsMixin<
        u_user_transaction_product_reviews,
        u_user_transaction_product_reviewsId
    >;
    createU_user_transaction_product_review!: Sequelize.HasManyCreateAssociationMixin<u_user_transaction_product_reviews>;
    removeU_user_transaction_product_review!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_transaction_product_reviews,
        u_user_transaction_product_reviewsId
    >;
    removeU_user_transaction_product_reviews!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_transaction_product_reviews,
        u_user_transaction_product_reviewsId
    >;
    hasU_user_transaction_product_review!: Sequelize.HasManyHasAssociationMixin<
        u_user_transaction_product_reviews,
        u_user_transaction_product_reviewsId
    >;
    hasU_user_transaction_product_reviews!: Sequelize.HasManyHasAssociationsMixin<
        u_user_transaction_product_reviews,
        u_user_transaction_product_reviewsId
    >;
    countU_user_transaction_product_reviews!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(
        sequelize: Sequelize.Sequelize
    ): typeof u_user_transaction_products {
        u_user_transaction_products.init(
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
                        model: "u_user_transaction",
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
                transaction_token: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    set(value) {
                        const token = md5(`${value}`);
                        this.setDataValue("transaction_token", token);
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
                            msg: "please input proper status",
                        },
                        customValidator(value: number) {
                            if (value < 0 || value > 4)
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
                tableName: "u_user_transaction_products",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "id_u_user_transaction",
                        using: "BTREE",
                        fields: [{ name: "id_u_user_transaction" }],
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
        return u_user_transaction_products;
    }
}
