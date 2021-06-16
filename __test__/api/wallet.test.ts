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

describe('Top Up', () => {});

describe('Withdraw', () => {});

describe('Get Wallets', () => {});

describe('Get Top Up Histories', () => {});

describe('Get Withdraw Histories', () => {});

describe('Get Top Up Detail', () => {});

describe('Get Withdraw Detail', () => {});

describe('Get All User Top Up', () => {});

describe('Get All User Withdraw', () => {});

describe('Upload Top Up Proof', () => {});

describe('Update Top Up Status', () => {});

describe('Update Withdraw Status', () => {});
