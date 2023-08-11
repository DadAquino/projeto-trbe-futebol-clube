import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import { users, userWithoutPassword }
  from './mocks/Users.mocks';
// @ts-ignore

import SequelizeUser from '../../src/database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Users', function() {
  it('Deve retornar todos os usuários', async function() {
    sinon.stub(SequelizeUser, 'findAll').resolves(users as any);

    const { status, body } = await chai.request(app).get('/users');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(users);
  });

  it('Deve retornar o usuário pelo id', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(userWithoutPassword as any);

    const { status, body } = await chai.request(app).get('/users/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(userWithoutPassword);
  });

  it('Deve retornar mensagem not found para id não encontrado', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/users/999');

    expect(status).to.equal(404);
    expect(body.message).to.equal('User not found');
  });
})