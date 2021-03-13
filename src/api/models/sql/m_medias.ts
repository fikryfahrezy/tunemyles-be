import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_banks, m_banksId } from "./m_banks";
import type { m_categories, m_categoriesId } from "./m_categories";
import type { Product, ProductId } from "./Product";
import type { User, UserId } from "./User";
import type { m_wallets, m_walletsId } from "./m_wallets";
import type { u_product_photos, u_product_photosId } from "./u_product_photos";
import type {
    u_user_is_merchant,
    u_user_is_merchantId,
} from "./u_user_is_merchant";
import type {
    u_user_wallet_top_up,
    u_user_wallet_top_upId,
} from "./u_user_wallet_top_up";

export interface m_mediasAttributes {
    id: number;
    uri: string;
    label: string;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type m_mediasPk = "id";
export type m_mediasId = m_medias[m_mediasPk];
export type m_mediasCreationAttributes = Optional<
    m_mediasAttributes,
    m_mediasPk
>;

export class m_medias
    extends Model<m_mediasAttributes, m_mediasCreationAttributes>
    implements m_mediasAttributes {
    id!: number;
    uri!: string;
    label!: string;
    is_visible?: number;
    created_at?: Date;
    updated_at?: Date;

    // m_medias hasMany m_banks via id_logo
    m_banks!: m_banks[];
    getM_banks!: Sequelize.HasManyGetAssociationsMixin<m_banks>;
    setM_banks!: Sequelize.HasManySetAssociationsMixin<m_banks, m_banksId>;
    addM_bank!: Sequelize.HasManyAddAssociationMixin<m_banks, m_banksId>;
    addM_banks!: Sequelize.HasManyAddAssociationsMixin<m_banks, m_banksId>;
    createM_bank!: Sequelize.HasManyCreateAssociationMixin<m_banks>;
    removeM_bank!: Sequelize.HasManyRemoveAssociationMixin<m_banks, m_banksId>;
    removeM_banks!: Sequelize.HasManyRemoveAssociationsMixin<
        m_banks,
        m_banksId
    >;
    hasM_bank!: Sequelize.HasManyHasAssociationMixin<m_banks, m_banksId>;
    hasM_banks!: Sequelize.HasManyHasAssociationsMixin<m_banks, m_banksId>;
    countM_banks!: Sequelize.HasManyCountAssociationsMixin;
    // m_medias hasMany m_categories via id_icon
    m_categories!: m_categories[];
    getM_categories!: Sequelize.HasManyGetAssociationsMixin<m_categories>;
    setM_categories!: Sequelize.HasManySetAssociationsMixin<
        m_categories,
        m_categoriesId
    >;
    addM_category!: Sequelize.HasManyAddAssociationMixin<
        m_categories,
        m_categoriesId
    >;
    addM_categories!: Sequelize.HasManyAddAssociationsMixin<
        m_categories,
        m_categoriesId
    >;
    createM_category!: Sequelize.HasManyCreateAssociationMixin<m_categories>;
    removeM_category!: Sequelize.HasManyRemoveAssociationMixin<
        m_categories,
        m_categoriesId
    >;
    removeM_categories!: Sequelize.HasManyRemoveAssociationsMixin<
        m_categories,
        m_categoriesId
    >;
    hasM_category!: Sequelize.HasManyHasAssociationMixin<
        m_categories,
        m_categoriesId
    >;
    hasM_categories!: Sequelize.HasManyHasAssociationsMixin<
        m_categories,
        m_categoriesId
    >;
    countM_categories!: Sequelize.HasManyCountAssociationsMixin;
    // m_medias hasMany m_products via id_cover
    m_products!: Product[];
    getM_products!: Sequelize.HasManyGetAssociationsMixin<Product>;
    setM_products!: Sequelize.HasManySetAssociationsMixin<Product, ProductId>;
    addM_product!: Sequelize.HasManyAddAssociationMixin<Product, ProductId>;
    addM_products!: Sequelize.HasManyAddAssociationsMixin<Product, ProductId>;
    createM_product!: Sequelize.HasManyCreateAssociationMixin<Product>;
    removeM_product!: Sequelize.HasManyRemoveAssociationMixin<
        Product,
        ProductId
    >;
    removeM_products!: Sequelize.HasManyRemoveAssociationsMixin<
        Product,
        ProductId
    >;
    hasM_product!: Sequelize.HasManyHasAssociationMixin<Product, ProductId>;
    hasM_products!: Sequelize.HasManyHasAssociationsMixin<Product, ProductId>;
    countM_products!: Sequelize.HasManyCountAssociationsMixin;
    // m_medias hasMany m_users via id_photo
    m_users!: User[];
    getM_users!: Sequelize.HasManyGetAssociationsMixin<User>;
    setM_users!: Sequelize.HasManySetAssociationsMixin<User, UserId>;
    addM_user!: Sequelize.HasManyAddAssociationMixin<User, UserId>;
    addM_users!: Sequelize.HasManyAddAssociationsMixin<User, UserId>;
    createM_user!: Sequelize.HasManyCreateAssociationMixin<User>;
    removeM_user!: Sequelize.HasManyRemoveAssociationMixin<User, UserId>;
    removeM_users!: Sequelize.HasManyRemoveAssociationsMixin<User, UserId>;
    hasM_user!: Sequelize.HasManyHasAssociationMixin<User, UserId>;
    hasM_users!: Sequelize.HasManyHasAssociationsMixin<User, UserId>;
    countM_users!: Sequelize.HasManyCountAssociationsMixin;
    // m_medias hasMany m_wallets via id_logo
    m_wallets!: m_wallets[];
    getM_wallets!: Sequelize.HasManyGetAssociationsMixin<m_wallets>;
    setM_wallets!: Sequelize.HasManySetAssociationsMixin<
        m_wallets,
        m_walletsId
    >;
    addM_wallet!: Sequelize.HasManyAddAssociationMixin<m_wallets, m_walletsId>;
    addM_wallets!: Sequelize.HasManyAddAssociationsMixin<
        m_wallets,
        m_walletsId
    >;
    createM_wallet!: Sequelize.HasManyCreateAssociationMixin<m_wallets>;
    removeM_wallet!: Sequelize.HasManyRemoveAssociationMixin<
        m_wallets,
        m_walletsId
    >;
    removeM_wallets!: Sequelize.HasManyRemoveAssociationsMixin<
        m_wallets,
        m_walletsId
    >;
    hasM_wallet!: Sequelize.HasManyHasAssociationMixin<m_wallets, m_walletsId>;
    hasM_wallets!: Sequelize.HasManyHasAssociationsMixin<
        m_wallets,
        m_walletsId
    >;
    countM_wallets!: Sequelize.HasManyCountAssociationsMixin;
    // m_medias hasMany u_product_photos via id_m_medias
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
    // m_medias hasMany u_user_is_merchant via id_identity_photo
    u_user_is_merchants!: u_user_is_merchant[];
    getU_user_is_merchants!: Sequelize.HasManyGetAssociationsMixin<u_user_is_merchant>;
    setU_user_is_merchants!: Sequelize.HasManySetAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    addU_user_is_merchant!: Sequelize.HasManyAddAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    addU_user_is_merchants!: Sequelize.HasManyAddAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    createU_user_is_merchant!: Sequelize.HasManyCreateAssociationMixin<u_user_is_merchant>;
    removeU_user_is_merchant!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    removeU_user_is_merchants!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    hasU_user_is_merchant!: Sequelize.HasManyHasAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    hasU_user_is_merchants!: Sequelize.HasManyHasAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    countU_user_is_merchants!: Sequelize.HasManyCountAssociationsMixin;
    // m_medias hasMany u_user_is_merchant via id_market_photo
    id_market_photo_u_user_is_merchants!: u_user_is_merchant[];
    getId_market_photo_u_user_is_merchants!: Sequelize.HasManyGetAssociationsMixin<u_user_is_merchant>;
    setId_market_photo_u_user_is_merchants!: Sequelize.HasManySetAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    addId_market_photo_u_user_is_merchant!: Sequelize.HasManyAddAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    addId_market_photo_u_user_is_merchants!: Sequelize.HasManyAddAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    createId_market_photo_u_user_is_merchant!: Sequelize.HasManyCreateAssociationMixin<u_user_is_merchant>;
    removeId_market_photo_u_user_is_merchant!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    removeId_market_photo_u_user_is_merchants!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    hasId_market_photo_u_user_is_merchant!: Sequelize.HasManyHasAssociationMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    hasId_market_photo_u_user_is_merchants!: Sequelize.HasManyHasAssociationsMixin<
        u_user_is_merchant,
        u_user_is_merchantId
    >;
    countId_market_photo_u_user_is_merchants!: Sequelize.HasManyCountAssociationsMixin;
    // m_medias hasMany u_user_wallet_top_up via proof_id
    u_user_wallet_top_ups!: u_user_wallet_top_up[];
    getU_user_wallet_top_ups!: Sequelize.HasManyGetAssociationsMixin<u_user_wallet_top_up>;
    setU_user_wallet_top_ups!: Sequelize.HasManySetAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    addU_user_wallet_top_up!: Sequelize.HasManyAddAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    addU_user_wallet_top_ups!: Sequelize.HasManyAddAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    createU_user_wallet_top_up!: Sequelize.HasManyCreateAssociationMixin<u_user_wallet_top_up>;
    removeU_user_wallet_top_up!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    removeU_user_wallet_top_ups!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    hasU_user_wallet_top_up!: Sequelize.HasManyHasAssociationMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    hasU_user_wallet_top_ups!: Sequelize.HasManyHasAssociationsMixin<
        u_user_wallet_top_up,
        u_user_wallet_top_upId
    >;
    countU_user_wallet_top_ups!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof m_medias {
        m_medias.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                uri: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                label: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                is_visible: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 1,
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
                tableName: "m_medias",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                ],
                underscored: true,
            }
        );
        return m_medias;
    }
}
