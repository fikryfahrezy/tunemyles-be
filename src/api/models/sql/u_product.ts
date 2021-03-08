import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_products, m_productsId } from "./m_products";
import type {
    u_product_categories,
    u_product_categoriesId,
} from "./u_product_categories";
import type { u_product_photos, u_product_photosId } from "./u_product_photos";

export interface u_productAttributes {
    id: number;
    id_m_products: number;
    price_default?: number;
    price_selling?: number;
    qty?: number;
    discount?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type u_productPk = "id";
export type u_productId = u_product[u_productPk];
export type u_productCreationAttributes = Optional<
    u_productAttributes,
    u_productPk
>;

export class u_product
    extends Model<u_productAttributes, u_productCreationAttributes>
    implements u_productAttributes {
    id!: number;
    id_m_products!: number;
    price_default?: number;
    price_selling?: number;
    qty?: number;
    discount?: number;
    created_at?: Date;
    updated_at?: Date;

    // u_product belongsTo m_products via id_m_products
    id_m_products_m_product!: m_products;
    getId_m_products_m_product!: Sequelize.BelongsToGetAssociationMixin<m_products>;
    setId_m_products_m_product!: Sequelize.BelongsToSetAssociationMixin<
        m_products,
        m_productsId
    >;
    createId_m_products_m_product!: Sequelize.BelongsToCreateAssociationMixin<m_products>;
    // u_product hasMany u_product_categories via id_u_product
    u_product_categories!: u_product_categories[];
    getU_product_categories!: Sequelize.HasManyGetAssociationsMixin<u_product_categories>;
    setU_product_categories!: Sequelize.HasManySetAssociationsMixin<
        u_product_categories,
        u_product_categoriesId
    >;
    addU_product_category!: Sequelize.HasManyAddAssociationMixin<
        u_product_categories,
        u_product_categoriesId
    >;
    addU_product_categories!: Sequelize.HasManyAddAssociationsMixin<
        u_product_categories,
        u_product_categoriesId
    >;
    createU_product_category!: Sequelize.HasManyCreateAssociationMixin<u_product_categories>;
    removeU_product_category!: Sequelize.HasManyRemoveAssociationMixin<
        u_product_categories,
        u_product_categoriesId
    >;
    removeU_product_categories!: Sequelize.HasManyRemoveAssociationsMixin<
        u_product_categories,
        u_product_categoriesId
    >;
    hasU_product_category!: Sequelize.HasManyHasAssociationMixin<
        u_product_categories,
        u_product_categoriesId
    >;
    hasU_product_categories!: Sequelize.HasManyHasAssociationsMixin<
        u_product_categories,
        u_product_categoriesId
    >;
    countU_product_categories!: Sequelize.HasManyCountAssociationsMixin;
    // u_product hasMany u_product_photos via id_u_product
    u_product_photos!: u_product_photos[];
    getU_product_photos!: Sequelize.HasManyGetAssociationsMixin<u_product_photos>;
    setU_product_photos!: Sequelize.HasManySetAssociationsMixin<
        u_product_photos,
        u_product_photosId
    >;
    addU_product_photo!: Sequelize.HasManyAddAssociationMixin<
        u_product_photos,
        u_product_photosId
    >;
    addU_product_photos!: Sequelize.HasManyAddAssociationsMixin<
        u_product_photos,
        u_product_photosId
    >;
    createU_product_photo!: Sequelize.HasManyCreateAssociationMixin<u_product_photos>;
    removeU_product_photo!: Sequelize.HasManyRemoveAssociationMixin<
        u_product_photos,
        u_product_photosId
    >;
    removeU_product_photos!: Sequelize.HasManyRemoveAssociationsMixin<
        u_product_photos,
        u_product_photosId
    >;
    hasU_product_photo!: Sequelize.HasManyHasAssociationMixin<
        u_product_photos,
        u_product_photosId
    >;
    hasU_product_photos!: Sequelize.HasManyHasAssociationsMixin<
        u_product_photos,
        u_product_photosId
    >;
    countU_product_photos!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof u_product {
        u_product.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                id_m_products: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: "m_products",
                        key: "id",
                    },
                },
                price_default: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    defaultValue: 0,
                },
                price_selling: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    defaultValue: 0,
                },
                qty: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    defaultValue: 0,
                },
                discount: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
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
                tableName: "u_product",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
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
        return u_product;
    }
}
