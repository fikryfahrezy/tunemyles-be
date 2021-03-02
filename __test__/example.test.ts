import { FastifyInstance } from "fastify";
import formAutoContent from "form-auto-content";
import fs from "fs";
import app from "../src/app";

let server: null | FastifyInstance = null;

beforeEach(() => {
  server = app();
  return server.ready();
});

afterEach(() => {
  return server.close();
});

describe("Get Data", () => {
  test("Get Success", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/v2/example",
    });

    const statusCode = response.statusCode;
    const contenType = response.headers["content-type"];
    const isSuccess = response.json().success;

    expect(statusCode).toBe(200);
    expect(contenType).toBe("application/json; charset=utf-8");
    expect(isSuccess).toBe(true);
  });
});

describe("Get Single Data", () => {
  test("Found Single Data", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/v2/example/1",
    });

    const statusCode = response.statusCode;
    const contenType = response.headers["content-type"];
    const isSuccess = response.json().success;

    expect(statusCode).toBe(200);
    expect(contenType).toBe("application/json; charset=utf-8");
    expect(isSuccess).toBe(true);
  });

  test("Data Not Found", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/v2/example/100",
    });

    const statusCode = response.statusCode;
    const contenType = response.headers["content-type"];
    const isSuccess = response.json().success;

    expect(statusCode).toBe(404);
    expect(contenType).toBe("application/json; charset=utf-8");
    expect(isSuccess).toBe(false);
  });
});

describe("Post Data", () => {
  test("Post Success", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/api/v2/example",
    });

    const statusCode = response.statusCode;
    const contenType = response.headers["content-type"];
    const isSuccess = response.json().success;

    expect(statusCode).toBe(200);
    expect(contenType).toBe("application/json; charset=utf-8");
    expect(isSuccess).toBe(true);
  });

  test("Post Fail, Validation Fail", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/api/v2/example",
    });

    const statusCode = response.statusCode;
    const contenType = response.headers["content-type"];
    const isSuccess = response.json().success;

    expect(statusCode).toBe(500);
    expect(contenType).toBe("application/json; charset=utf-8");
    expect(isSuccess).toBe(false);
  });
});

describe("Post File", () => {
  test("Post Success", async () => {
    const myFile = fs.createReadStream("./__test__/image-test.png");
    const form = formAutoContent({
      myField: "file",
      myFile,
    });

    const response = await server.inject({
      method: "POST",
      url: "/api/v2/example/file",
      ...form,
    });

    const statusCode = response.statusCode;
    const contenType = response.headers["content-type"];
    const isSuccess = response.json().success;

    expect(statusCode).toBe(200);
    expect(contenType).toBe("application/json; charset=utf-8");
    expect(isSuccess).toBe(true);
  });
});

describe("Get Private Data", () => {
  test("Get Private Data Success", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/v2/example/private",
      headers: { key: 1 },
    });

    const statusCode = response.statusCode;
    const contenType = response.headers["content-type"];
    const isSuccess = response.json().success;

    expect(statusCode).toBe(200);
    expect(contenType).toBe("application/json; charset=utf-8");
    expect(isSuccess).toBe(true);
  });

  test("Get Private Data Fail", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/v2/example/private",
    });

    const statusCode = response.statusCode;
    const contentType = response.headers["content-type"];
    const isSuccess = response.json().success;

    expect(statusCode).toBe(403);
    expect(contentType).toBe("application/json; charset=utf-8");
    expect(isSuccess).toBe(false);
  });
});
