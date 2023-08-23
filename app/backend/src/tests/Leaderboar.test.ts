import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/Sequelize.Team';
import {
  leaderboardMock,
  homeLeaderboardMock,
  awayLeaderboardMock
} from './mocks/Leaderboard.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Test', function() {
  describe('GET /leaderboard', function() {
    it('01 - Should return Leaderboard', async function() {
      sinon.stub(SequelizeTeam, 'sequelize').resolves(leaderboardMock as any);

      const { status, body } = await chai.request(app).get('/leaderboard');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(leaderboardMock);
    });

    it('02 - Should return only HOME Leaderboard', async function() {
      sinon.stub(SequelizeTeam, 'sequelize').resolves(homeLeaderboardMock as any);

      const { status, body } = await chai.request(app).get('/leaderboard/home');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(homeLeaderboardMock);
    });

    it('03 - Should return only AWAY Leaderboard', async function() {
      sinon.stub(SequelizeTeam, 'sequelize').resolves(awayLeaderboardMock as any);

      const { status, body } = await chai.request(app).get('/leaderboard/away');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(awayLeaderboardMock);
    });
  })

  afterEach(sinon.restore);
});
