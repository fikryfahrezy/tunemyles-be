import bcrypt from "bcrypt";
import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type { m_products, m_productsId } from "./m_products";
import type { u_user, u_userId } from "./u_user";
import type {
    u_user_bank_account,
    u_user_bank_accountId,
} from "./u_user_bank_account";
import type { u_user_cart, u_user_cartId } from "./u_user_cart";
import type { u_user_chat, u_user_chatId } from "./u_user_chat";
import type {
    u_user_chat_detail,
    u_user_chat_detailId,
} from "./u_user_chat_detail";
import type {
    u_user_transaction,
    u_user_transactionId,
} from "./u_user_transaction";

export interface m_usersAttributes {
    id: number;
    full_name: string;
    username: string;
    password: string;
    phone_number: string;
    address: string;
    id_photo?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type m_usersPk = "id";
export type m_usersId = m_users[m_usersPk];
export type m_usersCreationAttributes = Optional<m_usersAttributes, m_usersPk>;

export class m_users
    extends Model<m_usersAttributes, m_usersCreationAttributes>
    implements m_usersAttributes {
    id!: number;
    full_name!: string;
    username!: string;
    password!: string;
    phone_number!: string;
    address!: string;
    id_photo?: number;
    created_at?: Date;
    updated_at?: Date;

    // m_users belongsTo m_medias via id_photo
    id_photo_m_media!: m_medias;
    getId_photo_m_media!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
    setId_photo_m_media!: Sequelize.BelongsToSetAssociationMixin<
        m_medias,
        m_mediasId
    >;
    createId_photo_m_media!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;
    // m_users hasMany m_products via id_m_users
    m_products!: m_products[];
    getM_products!: Sequelize.HasManyGetAssociationsMixin<m_products>;
    setM_products!: Sequelize.HasManySetAssociationsMixin<
        m_products,
        m_productsId
    >;
    addM_product!: Sequelize.HasManyAddAssociationMixin<
        m_products,
        m_productsId
    >;
    addM_products!: Sequelize.HasManyAddAssociationsMixin<
        m_products,
        m_productsId
    >;
    createM_product!: Sequelize.HasManyCreateAssociationMixin<m_products>;
    removeM_product!: Sequelize.HasManyRemoveAssociationMixin<
        m_products,
        m_productsId
    >;
    removeM_products!: Sequelize.HasManyRemoveAssociationsMixin<
        m_products,
        m_productsId
    >;
    hasM_product!: Sequelize.HasManyHasAssociationMixin<
        m_products,
        m_productsId
    >;
    hasM_products!: Sequelize.HasManyHasAssociationsMixin<
        m_products,
        m_productsId
    >;
    countM_products!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user via id_m_users
    u_users!: u_user[];
    getU_users!: Sequelize.HasManyGetAssociationsMixin<u_user>;
    setU_users!: Sequelize.HasManySetAssociationsMixin<u_user, u_userId>;
    addU_user!: Sequelize.HasManyAddAssociationMixin<u_user, u_userId>;
    addU_users!: Sequelize.HasManyAddAssociationsMixin<u_user, u_userId>;
    createU_user!: Sequelize.HasManyCreateAssociationMixin<u_user>;
    removeU_user!: Sequelize.HasManyRemoveAssociationMixin<u_user, u_userId>;
    removeU_users!: Sequelize.HasManyRemoveAssociationsMixin<u_user, u_userId>;
    hasU_user!: Sequelize.HasManyHasAssociationMixin<u_user, u_userId>;
    hasU_users!: Sequelize.HasManyHasAssociationsMixin<u_user, u_userId>;
    countU_users!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user_bank_account via id_m_users
    u_user_bank_accounts!: u_user_bank_account[];
    getU_user_bank_accounts!: Sequelize.HasManyGetAssociationsMixin<u_user_bank_account>;
    setU_user_bank_accounts!: Sequelize.HasManySetAssociationsMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    addU_user_bank_account!: Sequelize.HasManyAddAssociationMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    addU_user_bank_accounts!: Sequelize.HasManyAddAssociationsMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    createU_user_bank_account!: Sequelize.HasManyCreateAssociationMixin<u_user_bank_account>;
    removeU_user_bank_account!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    removeU_user_bank_accounts!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    hasU_user_bank_account!: Sequelize.HasManyHasAssociationMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    hasU_user_bank_accounts!: Sequelize.HasManyHasAssociationsMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    countU_user_bank_accounts!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user_cart via id_m_users
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
    // m_users hasMany u_user_cart via id_merchant
    id_merchant_u_user_carts!: u_user_cart[];
    getId_merchant_u_user_carts!: Sequelize.HasManyGetAssociationsMixin<u_user_cart>;
    setId_merchant_u_user_carts!: Sequelize.HasManySetAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    addId_merchant_u_user_cart!: Sequelize.HasManyAddAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    addId_merchant_u_user_carts!: Sequelize.HasManyAddAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    createId_merchant_u_user_cart!: Sequelize.HasManyCreateAssociationMixin<u_user_cart>;
    removeId_merchant_u_user_cart!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    removeId_merchant_u_user_carts!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    hasId_merchant_u_user_cart!: Sequelize.HasManyHasAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    hasId_merchant_u_user_carts!: Sequelize.HasManyHasAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    countId_merchant_u_user_carts!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user_chat via id_cs
    u_user_chats!: u_user_chat[];
    getU_user_chats!: Sequelize.HasManyGetAssociationsMixin<u_user_chat>;
    setU_user_chats!: Sequelize.HasManySetAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    addU_user_chat!: Sequelize.HasManyAddAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    addU_user_chats!: Sequelize.HasManyAddAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    createU_user_chat!: Sequelize.HasManyCreateAssociationMixin<u_user_chat>;
    removeU_user_chat!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    removeU_user_chats!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    hasU_user_chat!: Sequelize.HasManyHasAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    hasU_user_chats!: Sequelize.HasManyHasAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    countU_user_chats!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user_chat via id_m_users
    id_m_users_u_user_chats!: u_user_chat[];
    getId_m_users_u_user_chats!: Sequelize.HasManyGetAssociationsMixin<u_user_chat>;
    setId_m_users_u_user_chats!: Sequelize.HasManySetAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    addId_m_users_u_user_chat!: Sequelize.HasManyAddAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    addId_m_users_u_user_chats!: Sequelize.HasManyAddAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    createId_m_users_u_user_chat!: Sequelize.HasManyCreateAssociationMixin<u_user_chat>;
    removeId_m_users_u_user_chat!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    removeId_m_users_u_user_chats!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    hasId_m_users_u_user_chat!: Sequelize.HasManyHasAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    hasId_m_users_u_user_chats!: Sequelize.HasManyHasAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    countId_m_users_u_user_chats!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user_chat_detail via id_m_users
    u_user_chat_details!: u_user_chat_detail[];
    getU_user_chat_details!: Sequelize.HasManyGetAssociationsMixin<u_user_chat_detail>;
    setU_user_chat_details!: Sequelize.HasManySetAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    addU_user_chat_detail!: Sequelize.HasManyAddAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    addU_user_chat_details!: Sequelize.HasManyAddAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    createU_user_chat_detail!: Sequelize.HasManyCreateAssociationMixin<u_user_chat_detail>;
    removeU_user_chat_detail!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    removeU_user_chat_details!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    hasU_user_chat_detail!: Sequelize.HasManyHasAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    hasU_user_chat_details!: Sequelize.HasManyHasAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    countU_user_chat_details!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user_transaction via id_m_users
    u_user_transactions!: u_user_transaction[];
    getU_user_transactions!: Sequelize.HasManyGetAssociationsMixin<u_user_transaction>;
    setU_user_transactions!: Sequelize.HasManySetAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    addU_user_transaction!: Sequelize.HasManyAddAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    addU_user_transactions!: Sequelize.HasManyAddAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    createU_user_transaction!: Sequelize.HasManyCreateAssociationMixin<u_user_transaction>;
    removeU_user_transaction!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    removeU_user_transactions!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    hasU_user_transaction!: Sequelize.HasManyHasAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    hasU_user_transactions!: Sequelize.HasManyHasAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    countU_user_transactions!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user_transaction via id_merchant
    id_merchant_u_user_transactions!: u_user_transaction[];
    getId_merchant_u_user_transactions!: Sequelize.HasManyGetAssociationsMixin<u_user_transaction>;
    setId_merchant_u_user_transactions!: Sequelize.HasManySetAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    addId_merchant_u_user_transaction!: Sequelize.HasManyAddAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    addId_merchant_u_user_transactions!: Sequelize.HasManyAddAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    createId_merchant_u_user_transaction!: Sequelize.HasManyCreateAssociationMixin<u_user_transaction>;
    removeId_merchant_u_user_transaction!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    removeId_merchant_u_user_transactions!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    hasId_merchant_u_user_transaction!: Sequelize.HasManyHasAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    hasId_merchant_u_user_transactions!: Sequelize.HasManyHasAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    countId_merchant_u_user_transactions!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof m_users {
        m_users.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                },
                full_name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    validate: {
                        customValidator(value: string) {
                            if (value === "")
                                throw new Error("name can't be empty");
                        },
                        len: {
                            args: [2, 255],
                            msg: "input proper name",
                        },
                    },
                },
                username: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: "username",
                    validate: {
                        is: {
                            // https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username/12019115
                            args: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i,
                            msg: "please input proper username",
                        },
                    },
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    set(value) {
                        const saltRounds = 10;
                        const hash = bcrypt.hashSync(value, saltRounds);
                        this.setDataValue("password", hash);
                    },
                },
                phone_number: {
                    type: DataTypes.STRING(20),
                    allowNull: false,
                    unique: "phone_number",
                    validate: {
                        is: {
                            // https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
                            args: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,13}$/im,
                            msg: "please input proper phone number",
                        },
                    },
                },
                address: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    validate: {
                        customValidator(value: string) {
                            if (value === "")
                                throw new Error("address can't be empty");
                        },
                        len: {
                            args: [5, 1000],
                            msg: "input proper address",
                        },
                    },
                },
                id_photo: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: true,
                    defaultValue: 2,
                    references: {
                        model: "m_medias",
                        key: "id",
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
                tableName: "m_users",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "username",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "username" }],
                    },
                    {
                        name: "phone_number",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "phone_number" }],
                    },
                    {
                        name: "id_photo",
                        using: "BTREE",
                        fields: [{ name: "id_photo" }],
                    },
                ],
                underscored: true,
            }
        );
        return m_users;
    }
}
