import type { Server } from 'http';
import type { FastifyInstance } from 'fastify';
import app from '../../src/config/app';
import sequelize from '../../src/databases/sequelize';

let server: Server = null;
let appServer: FastifyInstance = null;

beforeAll(async () => {
  await sequelize.authenticate();
  appServer = app();
  await appServer.ready();
  server = appServer.server;
});

afterAll(async () => {
  await appServer.close();
  await sequelize.close();
});

describe('Post Bank User', () => {});

describe('Get Banks', () => {});

describe('Get Bank Detail', () => {});

describe('Get Bank Users', () => {});

describe('Update Bank User', () => {});

describe('Delete Bank User', () => {});
