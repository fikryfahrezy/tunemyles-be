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

describe('Update Merchant Profile', () => {});

describe('Update Merchant Close Time', () => {});

describe('Get Merchant Profile', () => {});

describe('Post Merchant Product', () => {});

describe('Get Merchant Products', () => {});

describe('Update Merchant Product', () => {});

describe('Update Merchant Product Cover', () => {});

describe('Update Merchant Product Status', () => {});

describe('Bind Merchant Product Category', () => {});

describe('Get Merchant Product Detail', () => {});

describe('Post Merchant Product Image', () => {});

describe('Delete Merchant Product Category', () => {});

describe('Delete Merchant Product Image', () => {});

describe('Delete Merchant Product', () => {});

describe('Get Merchant Orders', () => {});

describe('Get Merchant Order Detail', () => {});

describe('Update Merchant Order Status', () => {});

describe('Get Merchant List', () => {});

describe('Get Merchant Product List', () => {});

describe('Get Random Merchants', () => {});

describe('Get Merchant Transaction Histories', () => {});

describe('Get Merchant Income Histories', () => {});
