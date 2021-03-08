import slugify from "slugify";
import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type {
    u_product_categories,
    u_product_categoriesId,
} from "./u_product_categories";

export interface m_categoriesAttributes {
    id: number;
    category: string;
    slug: string;
    description?: string;
    id_icon?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type m_categoriesPk = "id";
export type m_categoriesId = m_categories[m_categoriesPk];
export type m_categoriesCreationAttributes = Optional<
    m_categoriesAttributes,
    m_categoriesPk
>;

export class m_categories
    extends Model<m_categoriesAttributes, m_categoriesCreationAttributes>
    implements m_categoriesAttributes {
    id!: number;
    category!: string;
    slug!: string;
    description?: string;
    id_icon?: number;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;

    // m_categories hasMany u_product_categories via id_m_categories
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
    // m_categories belongsTo m_medias via id_icon
    id_icon_m_media!: m_medias;
    getId_icon_m_media!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
    setId_icon_m_media!: Sequelize.BelongsToSetAssociationMixin<
        m_medias,
        m_mediasId
    >;
    createId_icon_m_media!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;

    static initModel(sequelize: Sequelize.Sequelize): typeof m_categories {
        m_categories.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                category: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    validate: {
                        customValidator(value: string) {
                            if (value === "")
                                throw new Error("category name can't be empty");
                        },
                        len: {
                            args: [2, 255],
                            msg: "input proper category name",
                        },
                    },
                },
                slug: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    set() {
                        this.setDataValue(
                            "slug",
                            slugify(this.getDataValue("category"), {
                                lower: true,
                            })
                        );
                    },
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                id_icon: {
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
                            if (value < 0 || value > 2)
                                throw new Error(
                                    "category visibility must be between or equal 0 and 2"
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
                tableName: "m_categories",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "id_icon",
                        using: "BTREE",
                        fields: [{ name: "id_icon" }],
                    },
                ],
                underscored: true,
            }
        );
        return m_categories;
    }
}
