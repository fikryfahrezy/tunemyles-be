import { FastifyInstance } from "fastify";
import app from "../src/app";

let server: null | FastifyInstance = null;

beforeAll(() => {
    server = app();
    return server.ready();
});

afterAll(() => {
    return server.close();
});

describe("Registration", () => {
    /**
     * NOTE: Generate random string/characters in JavaScript
     * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
     */
    const usedUsername = Math.random().toString(36).substring(2);
    const usedPhoneNumber = Date.now().toString();

    test("Register Success", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/api/v2/auth/register",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                full_name: "Name",
                username: usedUsername,
                password: "password",
                phone_number: usedPhoneNumber,
                address: "address",
            },
        });

        const statusCode = response.statusCode;
        const contenType = response.headers["content-type"];
        const isSuccess = response.json().success;

        expect(statusCode).toBe(200);
        expect(contenType).toBe("application/json; charset=utf-8");
        expect(isSuccess).toBe(true);
    });

    test("Register Fail, Phone Number Already Exist", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/api/v2/auth/register",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                full_name: "Name",
                username: Math.random().toString(36).substring(2),
                password: "password",
                phone_number: usedPhoneNumber,
                address: "address",
            },
        });

        const statusCode = response.statusCode;
        const contenType = response.headers["content-type"];
        const isSuccess = response.json().success;

        expect(statusCode).toBe(400);
        expect(contenType).toBe("application/json; charset=utf-8");
        expect(isSuccess).toBe(false);
    });

    test("Register Fail, Username Already Exist", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/api/v2/auth/register",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                full_name: "Name",
                username: usedUsername,
                password: "password",
                phone_number: Date.now().toString(),
                address: "address",
            },
        });

        const statusCode = response.statusCode;
        const contenType = response.headers["content-type"];
        const isSuccess = response.json().success;

        expect(statusCode).toBe(400);
        expect(contenType).toBe("application/json; charset=utf-8");
        expect(isSuccess).toBe(false);
    });

    test("Register Fail, Empty Name", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/api/v2/auth/register",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                full_name: "",
                username: Math.random().toString(36).substring(2),
                password: "password",
                phone_number: Date.now().toString(),
                address: "address",
            },
        });

        const statusCode = response.statusCode;
        const contenType = response.headers["content-type"];
        const isSuccess = response.json().success;

        expect(statusCode).toBe(422);
        expect(contenType).toBe("application/json; charset=utf-8");
        expect(isSuccess).toBe(false);
    });

    test("Register Fail, Empty Address", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/api/v2/auth/register",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                full_name: "Name",
                username: Math.random().toString(36).substring(2),
                password: "password",
                phone_number: Date.now().toString(),
                address: "",
            },
        });

        const statusCode = response.statusCode;
        const contenType = response.headers["content-type"];
        const isSuccess = response.json().success;

        expect(statusCode).toBe(422);
        expect(contenType).toBe("application/json; charset=utf-8");
        expect(isSuccess).toBe(false);
    });
});

describe("Login", () => {
    test("Login Success", async () => {
        const userUsername = Math.random().toString(36).substring(2);
        const userPassword = "password";

        await server.inject({
            method: "POST",
            url: "/api/v2/auth/register",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                full_name: "Name",
                username: userUsername,
                password: userPassword,
                phone_number: Date.now().toString(),
                address: "address",
            },
        });

        const response = await server.inject({
            method: "POST",
            url: "/api/v2/auth/login",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                username: userUsername,
                password: userPassword,
            },
        });

        const statusCode = response.statusCode;
        const contenType = response.headers["content-type"];
        const isSuccess = response.json().success;

        expect(statusCode).toBe(200);
        expect(contenType).toBe("application/json; charset=utf-8");
        expect(isSuccess).toBe(true);
    });

    test("Login Failed, Wrong Password", async () => {
        const userUsername = Math.random().toString(36).substring(2);

        await server.inject({
            method: "POST",
            url: "/api/v2/auth/register",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                full_name: "Name",
                username: userUsername,
                password: "password",
                phone_number: Date.now().toString(),
                address: "address",
            },
        });

        const response = await server.inject({
            method: "POST",
            url: "/api/v2/auth/login",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                username: userUsername,
                password: "wrong-password",
            },
        });

        const statusCode = response.statusCode;
        const contenType = response.headers["content-type"];
        const isSuccess = response.json().success;

        expect(statusCode).toBe(400);
        expect(contenType).toBe("application/json; charset=utf-8");
        expect(isSuccess).toBe(false);
    });

    test("Login Failed, User Not Registered", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/api/v2/auth/login",
            headers: {
                "content-type": "application/json",
            },
            payload: {
                username: "this-username-not-registered",
                password: "wrong-password",
            },
        });

        const statusCode = response.statusCode;
        const contenType = response.headers["content-type"];
        const isSuccess = response.json().success;

        expect(statusCode).toBe(400);
        expect(contenType).toBe("application/json; charset=utf-8");
        expect(isSuccess).toBe(false);
    });
});
