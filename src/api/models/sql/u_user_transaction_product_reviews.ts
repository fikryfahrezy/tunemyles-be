import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type {
    u_user_transaction_products,
    u_user_transaction_productsId,
} from "./u_user_transaction_products";

export interface u_user_transaction_product_reviewsAttributes {
    id: number;
    id_u_user_transaction_products: number;
    rating?: number;
    review?: string;
    created_at?: Date;
    updated_at?: Date;
}

export type u_user_transaction_product_reviewsPk = "id";
export type u_user_transaction_product_reviewsId = u_user_transaction_product_reviews[u_user_transaction_product_reviewsPk];
export type u_user_transaction_product_reviewsCreationAttributes = Optional<
    u_user_transaction_product_reviewsAttributes,
    u_user_transaction_product_reviewsPk
>;

export class u_user_transaction_product_reviews
    extends Model<
        u_user_transaction_product_reviewsAttributes,
        u_user_transaction_product_reviewsCreationAttributes
    >
    implements u_user_transaction_product_reviewsAttributes {
    id!: number;
    id_u_user_transaction_products!: number;
    rating?: number;
    review?: string;
    created_at?: Date;
    updated_at?: Date;

    // u_user_transaction_product_reviews belongsTo u_user_transaction_products via id_u_user_transaction_products
    id_u_user_transaction_products_u_user_transaction_product!: u_user_transaction_products;
    getId_u_user_transaction_products_u_user_transaction_product!: Sequelize.BelongsToGetAssociationMixin<u_user_transaction_products>;
    setId_u_user_transaction_products_u_user_transaction_product!: Sequelize.BelongsToSetAssociationMixin<
        u_user_transaction_products,
        u_user_transaction_productsId
    >;
    createId_u_user_transaction_products_u_user_transaction_product!: Sequelize.BelongsToCreateAssociationMixin<u_user_transaction_products>;

    static initModel(
        sequelize: Sequelize.Sequelize
    ): typeof u_user_transaction_product_reviews {
        u_user_transaction_product_reviews.init(
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
                        model: "u_user_transaction_products",
                        key: "id",
                    },
                },
                rating: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 1,
                    validate: {
                        customValidator(value: number) {
                            if (value < 1 || value > 5)
                                throw new Error(
                                    "please input proper visibility"
                                );
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
                tableName: "u_user_transaction_product_reviews",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "id_u_user_transaction_products",
                        using: "BTREE",
                        fields: [{ name: "id_u_user_transaction_products" }],
                    },
                ],
                underscored: true,
            }
        );
        return u_user_transaction_product_reviews;
    }
}
