import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/Sequelize.Match';
import {
  allMatchesMock,
  allMatchesFalseMock,
  allMatchesTrueMock,
  validMatchMock,
  validUserMock,
  validMatchTwoTeamsMock,
  invalidMatchEqualTeamsMock,
  invalidMatchOnlyOneTeamMock,
  validTokenMock,
  invalidTokenMock
} from './mocks/Matches.mock'
import JWTGenerator from '../utils/JWTGenerator';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', function() {
  describe('GET /matches', function() {
    it('01 - Should return all Matches', async function() {
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatchesMock as any);

      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allMatchesMock);
    });

    it('02 - Should return all Matches inProgress TRUE', async function() {
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatchesTrueMock as any);

      const { status, body } = await chai.request(app).get('/matches?inProgress=true');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allMatchesTrueMock);
    });

    it('03 - Should return all Matches inProgress FALSE', async function() {
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatchesFalseMock as any);

      const { status, body } = await chai.request(app).get('/matches?inProgress=false');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allMatchesFalseMock);
    });

    it('04 - Should return a MATCH by id', async function() {
      sinon.stub(SequelizeMatch, 'findOne').resolves(validMatchMock as any);

      const { status, body } = await chai.request(app).get('/matches/45');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(validMatchMock);
    });

    it("05 - Shouldn't return a MATCH that doesn't exist", async function() {
      sinon.stub(SequelizeMatch, 'findOne').resolves(null);

      const { status, body } = await chai.request(app).get('/matches/99');

      expect(status).to.equal(404);
      expect(body.message).to.equal('Match 99 not found');
    });
  })

  describe('POST /matches', function() {
    it("01 - Should create a MATCH", async function() {
      sinon.stub(SequelizeMatch, 'create').resolves(validMatchMock as any);
      sinon.stub(JWTGenerator, 'verify').returns(validUserMock);

      const { 
        id, 
        homeTeamId, 
        awayTeamId, 
        homeTeamGoals, 
        awayTeamGoals, 
        inProgress,
        homeTeam,
        awayTeam
      } = validMatchMock;

      const { status, body } = await chai.request(app).post('/matches')
        .set('authorization', validTokenMock)      
        .send(validMatchTwoTeamsMock)

      expect(status).to.equal(201);
      expect(body).to.deep.equal({ id, 
        homeTeamId, 
        awayTeamId, 
        homeTeamGoals, 
        awayTeamGoals, 
        inProgress,
        homeTeam,
        awayTeam 
      });
    });

    it("02 - Shouldn't create a MATCH equal teams", async function() {
      sinon.stub(SequelizeMatch, 'create').resolves(validMatchMock as any);
      sinon.stub(JWTGenerator, 'verify').returns(validUserMock);

      const { 
        id, 
        homeTeamId, 
        awayTeamId, 
        homeTeamGoals, 
        awayTeamGoals, 
        inProgress,
        homeTeam,
        awayTeam
      } = validMatchMock;

      const { status, body } = await chai.request(app).post('/matches')
        .set('authorization', validTokenMock)      
        .send(invalidMatchEqualTeamsMock)

      expect(status).to.equal(422);
      expect(body.message).to.equal('It is not possible to create a match with two equal teams');;
    });

    it("03 - Shouldn't create a MATCH with a team that doesn't exist", async function() {
      sinon.stub(SequelizeMatch, 'create').resolves(validMatchMock as any);
      sinon.stub(JWTGenerator, 'verify').returns(validUserMock);

      const { 
        id, 
        homeTeamId, 
        awayTeamId, 
        homeTeamGoals, 
        awayTeamGoals, 
        inProgress,
        homeTeam,
        awayTeam
      } = validMatchMock;

      const { status, body } = await chai.request(app).post('/matches')
        .set('authorization', validTokenMock)      
        .send(invalidMatchOnlyOneTeamMock)

      expect(status).to.equal(404);
      expect(body.message).to.equal('There is no team with such id!');;
    });
  })

  describe('PATCH /matches', function() {
    it("01 - Should FINISH a match", async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([1]);

      const { status, body } = await chai.request(app)
        .patch('/matches/38/finish')
        .set('Authorization', validTokenMock)

      expect(status).to.equal(200);
      expect(body.message).to.equal('Finished');
    });

    it("02 - Shouldn't FINISH a match", async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([0]);

      const { status } = await chai.request(app)
        .patch('/matches/38/finish')
        .set('Authorization', validTokenMock)

      expect(status).to.equal(200);
    });

    it("03 - Shouldn't FINISH a match if TOKEN empty", async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([1]);

      const { status, body } = await chai.request(app)
        .patch('/matches/38/finish')

      expect(status).to.equal(401);
      expect(body.message).to.equal('Token not found');
    });

    it("04 - Shouldn't FINISH a match if TOKEN invalid", async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([1]);

      const { status, body } = await chai.request(app)
        .patch('/matches/38/finish')
        .set('Authorization', invalidTokenMock)

      expect(status).to.equal(401);
      expect(body.message).to.equal('Token must be a valid token');
    });

    it("05 - Should UPDATE a match", async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([1]);

      const { status, body } = await chai.request(app)
        .patch('/matches/45')
        .set('Authorization', validTokenMock)

      expect(status).to.equal(200);
      expect(body.message).to.equal('Match updated');
    });

    it("06 - Shouldn't UPDATE a match that doesn't exist", async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([1]);

      const { status, body } = await chai.request(app)
        .patch('/matches/99')
        .set('Authorization', validTokenMock)

      expect(status).to.equal(404);
      expect(body.message).to.equal('Match 99 not found');
    });

    it("07 - Shouldn't UPDATE a match twice", async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([0]);

      await chai.request(app)
        .patch('/matches/45')
        .set('Authorization', validTokenMock)

      const { status, body } = await chai.request(app)
        .patch('/matches/45')
        .set('Authorization', validTokenMock)

      expect(status).to.equal(409);
      expect(body.message).to.equal('There are no updates to perform in Match 45');
    });
  })

  afterEach(sinon.restore);
});
