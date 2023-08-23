import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/Sequelize.User';
import {
  allUsersMock,
  validUserMock,
  existsUserMock,
  emptyUserName,
  emptyRole,
  emptyEmail,
  emptyPassword,
  validTokenMock,
  invalidTokenMock
} from './mocks/Users.mock';
import JWTGenerator from '../utils/JWTGenerator';
import Middleware from '../middlewares/validator.middleware.ts';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users Test', function() {
  describe('GET /users', function() {
    it('01 - Should return all USERS', async function() {
      sinon.stub(SequelizeUser, 'findAll').resolves(allUsersMock as any);

      const { status, body } = await chai.request(app).get('/users');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allUsersMock);
    });

    it('02 - Should return a USER by id', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(validUserMock as any);

      const { status, body } = await chai.request(app).get('/users/2');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(validUserMock);
    });

    it("03 - Shouldn't return a USER that doesn't exist", async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { status, body } = await chai.request(app).get('/users/15');

      expect(status).to.equal(404);
      expect(body.message).to.equal('User 15 not found');
    });
  });

  describe('POST Users', () => {
    it('01 - Should create a USER', async function() {
      sinon.stub(SequelizeUser, 'create').resolves(validUserMock as any);
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
      sinon.stub(JWTGenerator, 'verify').resolves();
      sinon.stub(Middleware, 'userValidator').returns();

      const { id, username, role, email, password } = validUserMock;

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', validTokenMock)
        .send({ username, role, email, password });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({ id, username, role, email });
    });

    it("02 - Shouldn't create a user if TOKEN empty", async function() {
      const { status, body } = await chai.request(app)
      .post('/users/register')

      expect(status).to.equal(401);
      expect(body.message).to.equal('Token not found');
    });

    it("03 - Shouldn't create a user if TOKEN invalid", async function() {
      const { status, body } = await chai.request(app)
        .post('/users/register')
        .set('authorization', invalidTokenMock);

      expect(status).to.equal(401);
      expect(body.message).to.equal('Token must be a valid token');
    });

    it("04 - Shouldn't create a user if empty BODY DATA", async function() {
      sinon.stub(JWTGenerator, 'verify').resolves();

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', 'validToken')
        .send({});

      expect(status).to.equal(400);
      expect(body).to.be.have.property('message');
    });

    it("05 - Shouldn't create a user if USERNAME empty", async function() {
      sinon.stub(JWTGenerator, 'verify').resolves();

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', validTokenMock)
        .send(emptyUserName);

      expect(status).to.equal(400);
      expect(body.message).to.equal('username is required');
    });

    it("06 - Shouldn't create a user if USERNAME exists", async function() {
      sinon.stub(JWTGenerator, 'verify').resolves();
      sinon.stub(Middleware, 'userValidator').returns();

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', validTokenMock)
        .send(existsUserMock);

      expect(status).to.equal(409);
      expect(body.message).to.equal('User already exists');
    });

    it("07 - Shouldn't create a user ROLE empty", async function() {
      sinon.stub(JWTGenerator, 'verify').resolves();

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', 'validToken')
        .send(emptyRole);

      expect(status).to.equal(400);
      expect(body.message).to.equal('role is required');
    });

    it("08 - Shouldn't create a user EMAIL empty", async function() {
      sinon.stub(JWTGenerator, 'verify').resolves();

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', 'validToken')
        .send(emptyEmail);

      expect(status).to.equal(400);
      expect(body.message).to.equal('email is required');
    });

    it("09 - Shouldn't create a user PASSWORD empty", async function() {
      sinon.stub(JWTGenerator, 'verify').resolves();

      const { status, body } = await chai.request(app).post('/users/register')
        .set('authorization', 'validToken')
        .send(emptyPassword);

      expect(status).to.equal(400);
      expect(body.message).to.equal('password is required');
    });
  })

  afterEach(sinon.restore);
});