import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/Sequelize.User';
import {
  validLoginMock,
  invalidLoginMock,
  emptyLoginEmailMock,
  emptyLoginPasswordMock,
  wrongLoginPasswordMock,
  shortLoginPasswordMock,
  wrongLoginEmailPatternMock,
  validTokenMock,
  invalidTokenMock,
  userValidMock
} from './mocks/Login.mock';
import JWTGenerator from '../utils/JWTGenerator';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', function() {
  describe('POST /login', function() {
    it('01 - Should return login with VALID user', async function() {
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(SequelizeUser, 'findOne').resolves(userValidMock as SequelizeUser);
      sinon.stub(jwt, 'sign').resolves('secret_admin');

      const { status, body } = await chai.request(app).post('/login')
        .send(validLoginMock);

      expect(status).to.equal(200);
      expect(body).to.be.have.property('token');
    });

    it("02 - Shouldn't return login with USER that doesn't exist", async function() {
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
      sinon.stub(JWTGenerator, 'sign').resolves('secret_admin');

      const { status, body } = await chai.request(app).post('/login')
        .send(invalidLoginMock);

      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it("03 - Shouldn't return login with INVALID user", async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(invalidLoginMock as SequelizeUser);
      sinon.stub(JWTGenerator, 'sign').resolves('secret_invalid');

      const { status, body } = await chai.request(app).post('/login')
        .send(invalidLoginMock);

      expect(status).to.equal(401);
      expect(body).to.be.have.property('message', 'Invalid email or password');
    });

    it("04 - Shouldn't return login if EMPTY fields", async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);

      const { status, body } = await chai.request(app).post('/login')
        .send();

      expect(status).to.equal(400);
      expect(body).to.be.have.property('message', 'All fields must be filled');
    });

    it("05 - Shouldn't return login if EMAIL field not provide", async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(emptyLoginEmailMock as SequelizeUser);
      sinon.stub(JWTGenerator, 'sign').resolves('secret_invalid');

      const { status, body } = await chai.request(app).post('/login')
        .send(emptyLoginEmailMock);

      expect(status).to.equal(400);
      expect(body).to.be.have.property('message', 'All fields must be filled');
    });    

    it("06 - Shouldn't return login if EMAIL pattern wrong", async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(wrongLoginEmailPatternMock as SequelizeUser);

      const { status, body } = await chai.request(app).post('/login')
        .send(wrongLoginEmailPatternMock);

      expect(status).to.equal(401);
      expect(body).to.be.have.property('message', 'Invalid email or password');
    });

    it("07 - Shouldn't return login if PASSWORD field not provide", async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(emptyLoginPasswordMock as SequelizeUser);

      const { status, body } = await chai.request(app).post('/login')
        .send(emptyLoginEmailMock);

      expect(status).to.equal(400);
      expect(body).to.be.have.property('message', 'All fields must be filled');
    });

    it("08 - Shouldn't return login if PASSWORD wrong", async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(wrongLoginPasswordMock as SequelizeUser);

      const { status, body } = await chai.request(app).post('/login')
        .send(wrongLoginPasswordMock);

      expect(status).to.equal(401);
      expect(body).to.be.have.property('message', 'Invalid email or password');
    });

    it("09 - Shouldn't return login if PASSWORD short", async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(shortLoginPasswordMock as SequelizeUser);

      const { status, body } = await chai.request(app).post('/login')
        .send(shortLoginPasswordMock);

      expect(status).to.equal(401);
      expect(body).to.be.have.property('message', 'Invalid email or password');
    });
  });

  describe('GET /login/role', function() {
    it('01 - Should return login role VALID token', async function() {
      const { status, body } = await chai.request(app).get('/login/role')
      .set('Authorization', validTokenMock)

      expect(status).to.equal(200);
      expect(body).to.be.have.property('role', 'admin');
    });

    it("02 - Shouldn't return login role INVALID token", async function() {
      const { status, body } = await chai.request(app).get('/login/role')
      .set('Authorization', invalidTokenMock)

      expect(status).to.equal(401);
      expect(body).to.be.have.property('message', 'Token must be a valid token');
    });
  });

  afterEach(sinon.restore);
});
