import bcrypt from "bcrypt";
import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import type { m_medias, m_mediasId } from "./m_medias";
import type { Product, ProductId } from "./Product";
import type { UserUtility, UserUtilityPk } from "./UserUtility";
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

export interface UserAttributes {
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

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserCreationAttributes = Optional<UserAttributes, UserPk>;

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
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
    media!: m_medias;
    getMedia!: Sequelize.BelongsToGetAssociationMixin<m_medias>;
    setMedia!: Sequelize.BelongsToSetAssociationMixin<m_medias, m_mediasId>;
    createMedia!: Sequelize.BelongsToCreateAssociationMixin<m_medias>;

    // m_users hasMany m_products via id_m_users
    products!: Product[];
    getProducts!: Sequelize.HasManyGetAssociationsMixin<Product>;
    setProducts!: Sequelize.HasManySetAssociationsMixin<Product, ProductId>;
    addProduct!: Sequelize.HasManyAddAssociationMixin<Product, ProductId>;
    addProducts!: Sequelize.HasManyAddAssociationsMixin<Product, ProductId>;
    createProduct!: Sequelize.HasManyCreateAssociationMixin<Product>;
    removeProduct!: Sequelize.HasManyRemoveAssociationMixin<Product, ProductId>;
    removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<
        Product,
        ProductId
    >;
    hasProduct!: Sequelize.HasManyHasAssociationMixin<Product, ProductId>;
    hasProducts!: Sequelize.HasManyHasAssociationsMixin<Product, ProductId>;
    countProducts!: Sequelize.HasManyCountAssociationsMixin;
    // m_users hasMany u_user via id_m_users
    userUtilities!: UserUtility[];
    getUserUtilities!: Sequelize.HasManyGetAssociationsMixin<UserUtility>;
    setUserUtilities!: Sequelize.HasManySetAssociationsMixin<
        UserUtility,
        UserUtilityPk
    >;
    addUserUtility!: Sequelize.HasManyAddAssociationMixin<
        UserUtility,
        UserUtilityPk
    >;
    addUserUtilities!: Sequelize.HasManyAddAssociationsMixin<
        UserUtility,
        UserUtilityPk
    >;
    createUserUtilities!: Sequelize.HasManyCreateAssociationMixin<UserUtility>;
    removeUserUtility!: Sequelize.HasManyRemoveAssociationMixin<
        UserUtility,
        UserUtilityPk
    >;
    removeUserUtilities!: Sequelize.HasManyRemoveAssociationsMixin<
        UserUtility,
        UserUtilityPk
    >;
    hasUserUtility!: Sequelize.HasManyHasAssociationMixin<
        UserUtility,
        UserUtilityPk
    >;
    hasUserUtilities!: Sequelize.HasManyHasAssociationsMixin<
        UserUtility,
        UserUtilityPk
    >;
    countUserUtilities!: Sequelize.HasManyCountAssociationsMixin;

    // m_users hasMany u_user_bank_account via id_m_users
    bankAccounts!: u_user_bank_account[];
    getBankAccounts!: Sequelize.HasManyGetAssociationsMixin<u_user_bank_account>;
    setBankAccounts!: Sequelize.HasManySetAssociationsMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    addBankAccount!: Sequelize.HasManyAddAssociationMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    addBankAccounts!: Sequelize.HasManyAddAssociationsMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    createBankAccount!: Sequelize.HasManyCreateAssociationMixin<u_user_bank_account>;
    removeBankAccount!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    removeBankAccounts!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    hasBankAccount!: Sequelize.HasManyHasAssociationMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    hasBankAccounts!: Sequelize.HasManyHasAssociationsMixin<
        u_user_bank_account,
        u_user_bank_accountId
    >;
    countBankAccounts!: Sequelize.HasManyCountAssociationsMixin;

    // m_users hasMany u_user_cart via id_m_users
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

    // m_users hasMany u_user_cart via id_merchant
    merchatCharts!: u_user_cart[];
    getMerchatCharts!: Sequelize.HasManyGetAssociationsMixin<u_user_cart>;
    setMerchatCharts!: Sequelize.HasManySetAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    addMerchatChart!: Sequelize.HasManyAddAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    addMerchatCharts!: Sequelize.HasManyAddAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    createMerchatChart!: Sequelize.HasManyCreateAssociationMixin<u_user_cart>;
    removeMerchatChart!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    removeMerchatCharts!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    hasMerchatChart!: Sequelize.HasManyHasAssociationMixin<
        u_user_cart,
        u_user_cartId
    >;
    hasMerchatCharts!: Sequelize.HasManyHasAssociationsMixin<
        u_user_cart,
        u_user_cartId
    >;
    countMerchatCharts!: Sequelize.HasManyCountAssociationsMixin;

    // m_users hasMany u_user_chat via id_cs
    csChats!: u_user_chat[];
    getCsChats!: Sequelize.HasManyGetAssociationsMixin<u_user_chat>;
    setCsChats!: Sequelize.HasManySetAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    addCsChat!: Sequelize.HasManyAddAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    addCsChats!: Sequelize.HasManyAddAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    createCsChat!: Sequelize.HasManyCreateAssociationMixin<u_user_chat>;
    removeCsChat!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    removeCsChats!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    hasCsChat!: Sequelize.HasManyHasAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    hasCsChats!: Sequelize.HasManyHasAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    countCsChats!: Sequelize.HasManyCountAssociationsMixin;

    // m_users hasMany u_user_chat via id_m_users
    userChats!: u_user_chat[];
    getUserChats!: Sequelize.HasManyGetAssociationsMixin<u_user_chat>;
    setUserChats!: Sequelize.HasManySetAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    addUserChat!: Sequelize.HasManyAddAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    addUserChats!: Sequelize.HasManyAddAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    createUserChat!: Sequelize.HasManyCreateAssociationMixin<u_user_chat>;
    removeUserChat!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    removeUserChats!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    hasUserChat!: Sequelize.HasManyHasAssociationMixin<
        u_user_chat,
        u_user_chatId
    >;
    hasUserChats!: Sequelize.HasManyHasAssociationsMixin<
        u_user_chat,
        u_user_chatId
    >;
    countUserChats!: Sequelize.HasManyCountAssociationsMixin;

    // m_users hasMany u_user_chat_detail via id_m_users
    userChatDetails!: u_user_chat_detail[];
    getUserChatDetails!: Sequelize.HasManyGetAssociationsMixin<u_user_chat_detail>;
    setUserChatDetails!: Sequelize.HasManySetAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    addUserChatDetail!: Sequelize.HasManyAddAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    addUserChatDetails!: Sequelize.HasManyAddAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    createUserChatDetail!: Sequelize.HasManyCreateAssociationMixin<u_user_chat_detail>;
    removeUserChatDetail!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    removeUserChatDetails!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    hasUserChatDetail!: Sequelize.HasManyHasAssociationMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    hasUserChatDetails!: Sequelize.HasManyHasAssociationsMixin<
        u_user_chat_detail,
        u_user_chat_detailId
    >;
    countUserChatDetails!: Sequelize.HasManyCountAssociationsMixin;

    // m_users hasMany u_user_transaction via id_m_users
    userTransactions!: u_user_transaction[];
    getUserTransactions!: Sequelize.HasManyGetAssociationsMixin<u_user_transaction>;
    setUserTransactions!: Sequelize.HasManySetAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    addUserTransaction!: Sequelize.HasManyAddAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    addUserTransactions!: Sequelize.HasManyAddAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    createUserTransaction!: Sequelize.HasManyCreateAssociationMixin<u_user_transaction>;
    removeUserTransaction!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    removeUserTransactions!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    hasUserTransaction!: Sequelize.HasManyHasAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    hasUserTransactions!: Sequelize.HasManyHasAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    countUserTransactions!: Sequelize.HasManyCountAssociationsMixin;

    // m_users hasMany u_user_transaction via id_merchant
    merchantTransactions!: u_user_transaction[];
    getMerchantTransactions!: Sequelize.HasManyGetAssociationsMixin<u_user_transaction>;
    setMerchantTransactions!: Sequelize.HasManySetAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    addMerchantTransaction!: Sequelize.HasManyAddAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    addMerchantTransactions!: Sequelize.HasManyAddAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    createMerchantTransaction!: Sequelize.HasManyCreateAssociationMixin<u_user_transaction>;
    removeMerchantTransaction!: Sequelize.HasManyRemoveAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    removeMerchantTransactions!: Sequelize.HasManyRemoveAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    hasMerchantTransaction!: Sequelize.HasManyHasAssociationMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    hasMerchantTransactions!: Sequelize.HasManyHasAssociationsMixin<
        u_user_transaction,
        u_user_transactionId
    >;
    countMerchantTransactions!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof User {
        User.init(
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
                    unique: {
                        name: "username",
                        msg: "username already used",
                    },
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
                    unique: {
                        name: "phone_number",
                        msg: "phone number already used",
                    },
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
                    references: {
                        model: "m_medias",
                        key: "id",
                    },
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: Date.now(),
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: Date.now(),
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
        return User;
    }
}
