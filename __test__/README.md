# [Test Requirement](#test-requirement)

## [API](#api)

### [Auth](#auth)

---

#### [# Register](#register)

Register Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Register Fail, Phone Number Already Exist

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Username Already Exist

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Empy Name

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Empty Address

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Name too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Name too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Username too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Username too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Phone Number too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Phone Number too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Address too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, Address too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Register Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Login](#login)

Login Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Login Fail, Wrong Password

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Login Fail, User Not Registered

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Login Fail, No `username` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Login Fail, No `password` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Login Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Profile](#get-profile)

Get Profile Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Profile Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Profile Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Update Profile](#update-profile)

Update Profile Success, Add New Profile Image

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Update Profile Success, Update Profile Image

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Update Profile Fail, Name too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile fail, Name too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, Phone Number too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, Phone Number too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, Phone Number too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, Address too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, Addrss too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, Password too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, Password too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Profile Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Forgot Password](#forgot-password)

Request Forgot Password Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Request Forgot Password Fail, Number Not Registered

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Request Forgot Password Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Verify Token](#verify-token)

Verify Forgot Password Token Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Verify Forgot Password Token Fail, Token Invalid

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Verify Forgot Password Token Fail, No Token Provided

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Reset Password](#reset-password)

Reset Password Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Reset Password Fail, Token Invalid

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Reset Password Fail, Password too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Reset Password Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Reset Password Fail, No Token Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

### [# Master](#master)

---

#### [Master Bank](#master-bank)

##### [# Add Master Bank](#add-bank)

Add Bank with Logo Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Add Bank without Logo Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Add Bank Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Add Bank Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Add Bank Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Master Banks](#get-banks)

Get Banks Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Banks Success, with Query `orderDirection=ASC&orderBy=created_at&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Banks Success, with Query `orderDirection=DESC&orderBy=created_at&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Banks Success, with Query `orderDirection=DESC&orderBy=bank_name&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Banks Success, with Query `orderDirection=DESC&orderBy=bank_name&search=random&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Banks Success, with Query `orderDirection=DESC&orderBy=bank_name&search=&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Banks Success, with Query `orderDirection=DESC&orderBy=bank_name&search=&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Banks Fail, with Query `orderDirection=DESCs&orderBy=bank_name&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Banks Fail, with Query `orderDirection=ASC&orderBy=bank_names&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Banks Fail, with Query `orderDirection=ASCs&orderBy=bank_names&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Banks Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Banks Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Master Bank Detail](#get-bank-detail)

Get Bank Detail Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Bank Detail Fail, Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Bank Detail Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Bank Detail Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Master Bank](#update-bank)

Update Bank Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Update Bank Fail, Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Bank Detail Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Bank Detail Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Master Bank Detail](#update-bank-detail)

Update Bank Detail Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Update Bank Detail Fail, Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Bank Detail Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Update Bank Detail Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Master Bank Logo](#update-bank-logo)

Change Bank Logo Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Change Bank Logo Fail, Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Change Bank Logo Fail, No `image` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Change Bank Logo Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Change Bank Logo Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Add Master Bank Step](#add-bank-step)

Add Bank Step Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Add Bank Step Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Add Bank Step Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Add Bank Step Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Master Bank Step](#delete-bank-step)

Delete Bank Step Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Delete Bank Step Fail, Bank Step Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Delete Bank Step Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Delete Bank Step Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Master Bank](#delete-bank)

Delete Bank Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Delete Bank Fail, Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Delete Bank Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Delete Bank Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Master Category](#master-category)

##### [# Add Category](#add-category)

Add Category with Icon Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Add Category without Icon Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Add Category Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Add Category Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Add Category Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Categories](#get-categories)

Get Categories Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Categories Success, with Query `orderDirection=ASC&orderBy=created_at&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Categories Success, with Query `orderDirection=DESC&orderBy=created_at&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Categories Success, with Query `orderDirection=DESC&orderBy=category&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Categories Success, with Query `orderDirection=DESC&orderBy=category&search=random&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Categories Success, with Query `orderDirection=DESC&orderBy=category&search=&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Categories Success, with Query `orderDirection=DESC&orderBy=category&search=&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Categories Success, with Query `orderDirection=DESC&orderBy=description&search=&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Categories Fail, with Query `orderDirection=DESCs&orderBy=category&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Categories Fail, with Query `orderDirection=ASC&orderBy=categories&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Categories Fail, with Query `orderDirection=ASCs&orderBy=categories&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Categories Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Categories Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Category](#update-category)

##### [# Update Category Icon](#update-category-icon)

##### [# Delete Category](#delete-category)

#### [Master Media](#master-media)

##### [# Add Medias](#add-media)

##### [# Get Medias](#get-medias)

Get Medias Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Medias Success, with Query `orderDirection=ASC&orderBy=created_at&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Medias Success, with Query `orderDirection=DESC&orderBy=created_at&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Medias Success, with Query `orderDirection=DESC&orderBy=label&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Medias Success, with Query `orderDirection=DESC&orderBy=label&search=random&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Medias Success, with Query `orderDirection=DESC&orderBy=label&search=&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Medias Success, with Query `orderDirection=DESC&orderBy=label&search=&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Medias Fail, with Query `orderDirection=DESCs&orderBy=label&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Medias Fail, with Query `orderDirection=ASC&orderBy=labels&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Medias Fail, with Query `orderDirection=ASCs&orderBy=labels&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Medias Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Medias Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Media](#update-media)

##### [# Delete Media](#delete-media)

#### [Master Wallet](#master-wallet)

##### [# Add Wallet](#add-wallet)

##### [# Get Wallets](#get-wallets)

Get Wallets Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Wallets Success, with Query `orderDirection=ASC&orderBy=created_at&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Wallets Success, with Query `orderDirection=DESC&orderBy=created_at&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Wallets Success, with Query `orderDirection=DESC&orderBy=wallet_name&search=random&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Wallets Success, with Query `orderDirection=DESC&orderBy=wallet_name&search=random&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Wallets Success, with Query `orderDirection=DESC&orderBy=wallet_name&search=&page=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Wallets Success, with Query `orderDirection=DESC&orderBy=wallet_name&search=&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Wallets Success, with Query `orderDirection=ASC&orderBy=wallet_description&search=&page=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

Get Wallets Fail, with Query `orderDirection=DESCs&orderBy=wallet_name&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Wallets Fail, with Query `orderDirection=ASC&orderBy=wallet_names&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Wallets Fail, with Query `orderDirection=ASCs&orderBy=wallet_names&search=&page=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Wallets Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

Get Wallets Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Wallet](#update-wallet)

##### [# Change Wallet Logo](#change-wallet-logo)

##### [# Delete Wallet](#delete-wallet)

#### [Master Faq](#master-faq)

##### [# Add Faq](#add-faq)

##### [# Get Faqs](#get-faqs)

##### [# Update Faq](#update-faq)

##### [# Delete Faq](#delete-faq)

### [Merchant](#mechant)

---

#### [Merchant Profile](#merchant-merchant)

##### [# Activate Merchant](#activate-merchant)

##### [# Update Merchant Profile](#update-merchant-profile)

##### [# Update Merchant Close Time](#update-merchant-close-time)

##### [# Get Merchant Profile](#get-merchant-profile)

#### [Merchant Product](#merchant-product)

##### [# Add Product](#add-product)

##### [# Get Products](#get-products)

##### [# Update Product](#update-product)

##### [# Update Product Cover](#update-product-cover)

##### [# Update Product Category](#update-product-category)

##### [# Bind Product Category](#bind-product-category)

##### [# Add Product Image](#add-product-image)

##### [# Get Product Detail](#get-product-detail)

##### [# Delete Product Category](#delete-product-category)

##### [# Delete Product Image](#delete-product-image)

##### [# Delete Product](#delete-product)

##### [# Get Merchant Product Detail](#get-merchant-product-detail)

#### [Merchant Order](#merchant-order)

##### [# Get Orders](#get-orders)

##### [# Get Order Detail](#get-order-detail)

##### [# Update Order Status](#update-order-status)

#### [Merchant List](#merchant-list)

##### [# Get Merchant List](#get-merchant-list)

##### [# Get Merchant Product List](#get-merchant-product-list)

##### [# Get Random Merchants](#get-random-merchants)

#### [Merchant Transaction](#merchant-transaction)

##### [# Get Merchant Transaction Histories](#get-merchant-transaction-histories)

##### [# Get Merchant Incomes](#get-merchant-incomes)

### [Product](#product)

---

#### [# Get Products](#get-products)

#### [# Get Products by Category](#get-products-by-category)

### [Cart](#cart)

---

#### [# Add Item to Cart](#add-item-to-cart)

#### [# Get Carts Items](#get-cart-items)

#### [# Update Cart Item Qty](#update-cart-item-qty)

#### [# Delete Cart Item](#delete-cart-item)

#### [# Checkout](#checkout)

### [Transaction](#transaction)

---

#### [# Get User Processed Transactions](#get-user-processed-transactions)

#### [# Get User Transaction Detail](#get-user-transaction-detail)

#### [# Finish Transaction](#finish-transaction)

#### [# Review Transaction](#review-transaction)

### [Bank](#bank)

---

#### [# Add User Bank](#add-user-bank)

#### [# Get Banks](#get-banks)

#### [# Get Bank Detail](#get-bank-detail)

#### [# Get Bank Users](#get-bank-users)

#### [# Update Bank User](#update-bank-user)

#### [# Delete Bank User](#delete-bank-user)

### [Wallet](#wallet)

---

#### [# Top Up](#top-up)

#### [# Withdraw](#withdraw)

#### [# Get User Wallets](#get-user-wallets)

#### [# Get User Top Up Histories](#get-user-topup-histories)

#### [# Get User Withdraw Histories](#get-user-withdraw-histories)

#### [# Get Top Up Detail](#get-topup-user-detail)

#### [# Get User Withdraw Detail](#get-user-withdraw-detail)

#### [# Get All User Top Up](#get-all-user-topup)

#### [# Get All User Withdraw](#get-all-user-withdraw)

#### [# Upload Top Up Proof](#upload-topup-proof)

#### [# Update Withdraw Status](#update-withdraw-status)

#### [# Update Top Up Status](#update-topup-status)
