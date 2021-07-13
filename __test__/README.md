# [Test Requirement](#test-requirement)

## [API](#api)

> The order of subtitles is following the order of the routes in the Postman

### [Auth](#auth)

---

#### [# Register](#register)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, `phone_number` Already Exist

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `username` Already Exist

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Empy `full_name`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Empty `address`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `full_name` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `full_name` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `username` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `username` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `phone_number` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `phone_number` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Register Fail, `address` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `address` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Activate Merchant](#activate-merchant)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[JEST]** Fail, User Already Merchant Indentified by User Utility ID

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[JEST]** Fail, User Already Merchant Identified by Token Type

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Login](#login)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Wrong `password`

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, User Not Registered

- Status code should `400`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `username` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `password` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Profile](#get-profile)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Update Profile](#update-profile)

**[JEST]** Success, Add New Profile Image

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[JEST]** Success, Update Profile Image

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN]** Success, With Avatar

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, `full_name` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `full_name` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `phone_number` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `phone_number` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `address` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `address` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `password` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `password` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Forgot Password](#forgot-password)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Password Fail, `phone_number` Not Registered

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `phone_number` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Verify Token](#verify-token)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Token Invalid

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No Token Provided

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Reset Password](#reset-password)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, `token` Invalid

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `new_password` too Short

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, `new_password` too Long

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `token` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `new_password` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

### [# Master](#master)

---

#### [Master Bank](#master-bank)

##### [# Post Master Bank](#post-bank)

**[POSTMAN] [JEST]** Success, With Logo

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, Without Logo

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `bank_name` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Master Banks](#get-banks)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=bank_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=bank_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Post Master Bank Step](#post-bank-step)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `step` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Master Bank Detail](#get-bank-detail)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Master Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Master Bank](#update-bank)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Master Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Master Bank Account](#update-bank-account)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Master Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Change Master Bank Logo](#update-bank-logo)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `logo` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Master Bank Step](#delete-bank-step)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Master Bank Step Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Master Bank](#delete-bank)

**[POSTMAN] [JEST]** Fail, Master Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Master Category](#master-category)

##### [# Post Category](#post-category)

**[POSTMAN] [JEST]** Success, With Icon

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, Without Icon

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Categories](#get-categories)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=category&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=description&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=category&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=description&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Category](#update-category)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Category Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Change Category Icon](#update-category-icon)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `icon` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Category](#delete-category)

**[POSTMAN] [JEST]** Fail, Category Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Master Media](#master-media)

##### [# Post Media](#post-media)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `image` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Medias](#get-medias)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- **[JEST]** Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=label&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=label&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Media](#update-media)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `image` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Media](#delete-media)

**[POSTMAN] [JEST]** Fail, Media Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Master Wallet](#master-wallet)

##### [# Post Master Wallet](#post-master-wallet)

**[POSTMAN] [JEST]** Success, Add with Logo

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, Add without Logo

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Master Wallets](#get-master-wallets)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=wallet_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=wallet_description&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=wallet_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=wallet_description&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Master Wallet](#update-master-wallet)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Wallet Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Change Master Wallet Logo](#change-master-wallet-logo)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `image` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Master Wallet](#delete-master-wallet)

**[POSTMAN] [JEST]** Fail, Wallet Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Master Faq](#master-faq)

##### [# Post Faq](#post-faq)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Faqs](#get-faqs)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

##### [# Update Faq](#update-faq)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Faq Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Faq](#delete-faq)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Faq Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

### [Merchant](#mechant)

---

##### [# Update Merchant Profile](#update-merchant-profile)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Merchant Profile](#merchant-merchant)

##### [# Update Merchant Close Time](#update-merchant-close-time)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `close_time` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Merchant Profile](#get-merchant-profile)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Merchant Product](#merchant-product)

##### [# Post Merchant Product](#post-merchant-product)

**[POSTMAN] [JEST]** Success, With Cover

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, Without Cover

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Merchant Products](#get-merchant-products)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=product_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=product_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Merchant Product](#update-merchant-product)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Merchant Product Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Change Merchant Product Cover](#update-merchant-product-cover)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `cover` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Merchant Product Status](#update-merchant-product-status)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Merchant Product Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `status` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Bind Merchant Product Category](#bind-merchant-product-category)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Category Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Merchant Product Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `category_id` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Post Merchant Product Image](#post-merchant-product-image)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `image` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Merchant Product Detail](#get-merchant-product-detail)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Product Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Merchant Product Category](#delete-merchant-product-category)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Merchant Product Category Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Merchant Product Image](#delete-merchant-product-image)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Merchant Product Image Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Delete Merchant Product](#delete-merchant-product)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Merchant Product Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Merchant Order](#merchant-order)

##### [# Get Merchant Orders](#get-merchant-orders)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Merchant Order Detail](#get-merchant-order-detail)

**[JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Merchant Order Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Update Merchant Order Status](#update-merchant-order-status)

**[JEST]** Success, Not Accept the Order

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Order Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `status` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [Merchant List](#merchant-list)

##### [# Get Merchant List](#get-merchant-list)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Merchant Product List](#get-merchant-product-list)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Merchant Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Random Merchants](#get-random-merchants)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

#### [Merchant Transaction](#merchant-transaction)

##### [# Get Merchant Transaction Histories](#get-merchant-transaction-histories)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?date=2021-2-3`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

##### [# Get Merchant Income Histories](#get-merchant-income-hitories)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?year=2021`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

### [Product](#product)

---

#### [# Get Products](#get-products)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=product_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=product_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Products by Category](#get-products-by-category)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- **[JEST]** Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, Without Query and Category Not Found

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 0`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=product_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=market_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=market_address&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=product_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=market_name&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=market_address&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

### [Bank](#bank)

---

#### [# Get Banks](#get-banks)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Bank Detail](#get-bank-detail)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Post User Bank](#post-user-bank)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Bank Users](#get-bank-users)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Update Bank User](#update-bank-user)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Delete Bank User](#delete-bank-user)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Bank Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

### [Wallet](#wallet)

---

#### [# Get Wallets](#get-wallets)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Top Up](#top-up)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Withdraw](#withdraw)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Top Up Histories](#get-topup-histories)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=balance_transfer&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=balance_transfer&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Withdraw Histories](#get-withdraw-histories)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Top Up Detail](#get-topup-user-detail)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Top Up Data Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Withdraw Detail](#get-withdraw-detail)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Withdraw Data Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get All User Top Up](#get-all-user-topup)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=balance_transfer&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=balance_transfer&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get All User Withdraw](#get-all-user-withdraw)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=balance_request&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=balance_request&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Upload Top Up Proof](#upload-topup-proof)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No `image` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Update Top Up Status](#update-topup-status)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Top Up Data Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `status` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Update Withdraw Status](#update-withdraw-status)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Withdraw Data Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `status` Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

### [Cart](#cart)

---

#### [# Add Item to Cart](#add-item-to-cart)

**[POSTMAN] [JEST]** Success, Without Logo

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get Cart Items](#get-cart-items)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Update Cart Item Qty](#update-cart-item-qty)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Cart Item Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, No `qty` Provided

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Delete Cart Item](#delete-cart-item)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Cart Item Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Checkout](#checkout)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

### [Transaction](#transaction)

---

#### [# Get User Processed Transactions](#get-user-processed-transactions)

**[POSTMAN] [JEST]** Success, Without Query

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?limit=1`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`
- Property `data` on the body should have a `length of 1`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=created_at&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=full_name&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=phone_number&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=DESC&orderBy=address&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=created_at&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=full_name&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=phone_number&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Success, with Query `?orderDirection=ASC&orderBy=address&search=&page=&limit=&status=0`

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESCs&orderBy=created_at&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, with Query `?orderDirection=DESC&orderBy=created_ats&search=&page=&limit=`

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Get User Transaction Detail](#get-user-transaction-detail)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Transaction Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Finish Transaction](#finish-transaction)

**[POSTMAN] [JEST]** Success

- Status code should `200`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, Transaction Not Found

- Status code should `404`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

#### [# Review Transaction](#review-transaction)

**[POSTMAN] [JEST]** Success

- Status code should `201`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `true`

**[POSTMAN] [JEST]** Fail, No Data Provided

- Status code should `422`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, Wrong API Key

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`

**[POSTMAN] [JEST]** Fail, API Key Not Given

- Status code should `403`
- Header `Content-Type` should `application/json; charset=utf-8`
- Body should object with `success` property `false`
