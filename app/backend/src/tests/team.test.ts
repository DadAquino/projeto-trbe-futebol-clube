import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/TeamModel';
import { allTeamsMock, newTeamMock, oneTeamMock } from './mocks/team.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Test', function() {
  describe('GET /teams', function() {
    it('01 - Should return all Teams', async function() {
      sinon.stub(SequelizeTeam, 'findAll').resolves(allTeamsMock as any);

      const { status, body } = await chai.request(app).get('/teams');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(allTeamsMock);
    });

    it('02 - Should return a Team by id', async function() {
      sinon.stub(SequelizeTeam, 'findOne').resolves(oneTeamMock as any);

      const { status, body } = await chai.request(app).get('/teams/5');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(oneTeamMock);
    });

    it("03 - Should return not found if the Team doesn't exists", async function() {
      sinon.stub(SequelizeTeam, 'findOne').resolves(null);

      const { status, body } = await chai.request(app).get('/teams/20');

      expect(status).to.equal(404);
      expect(body.message).to.equal('Team 20 not found');
    });
  })

  afterEach(sinon.restore);
});