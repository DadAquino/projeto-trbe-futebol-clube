import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import { matches, newMatch, resultNewMatch }
  from './mocks/Matches.mocks';
// @ts-ignore

import SequelizeUser from '../../src/database/models/UserModel';
import SequelizeMatch from '../../src/database/models/MatchModel';
import Validations from '../middlewares/Validations';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Matches', function() {
  it('Deve retornar todas as partidas', async function() {
    sinon.stub(SequelizeUser, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Deve criar uma partida', async function() {
    sinon.stub(SequelizeMatch, 'create').resolves(resultNewMatch as any);
    // sinon.stub(Validations, 'validateToken').returns();
    sinon.stub(JWT, 'verify').resolves();

    const { id, ...sendData } = resultNewMatch;

  const { status, body } = await chai.request(app).post('/books')
      .set('authorization', 'validToken')
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(resultNewMatch);
  });
})