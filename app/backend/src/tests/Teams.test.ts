import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Example from '../database/models/ExampleModel';

import { App } from '../../src/app';
import Teams from '../../src/database/models/TeamModel';
import { teams, team } from './mocks/Teams.mocks';

const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  it('Deve retornar todos os times', async function() {
    sinon.stub(Teams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Deve retornar o time pelo id', async function() {
    sinon.stub(Teams, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Deve retornar not found para o time que não existir', async function() {
    sinon.stub(Teams, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/999');

    expect(status).to.equal(404);
    expect(body).to.deep.equal('Team 999 not found');
  });
});