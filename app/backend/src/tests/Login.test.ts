import * as sinon from 'sinon';

import * as chai from 'chai';

// @ts-ignore

import chaiHttp = require('chai-http');

import { App } from '../../src/app';

import { invalidEmailLoginBody, invalidPasswordLoginBody,

  validLoginBody, userRegistered }

  from './mocks/Users.mocks';

import JWT from '../../src/utils/JWT';

import Validations from '../../src/middlewares/Validations';




// @ts-ignore




import SequelizeUser from '../../src/database/models/UserModel';




chai.use(chaiHttp);




const { expect } = chai;




const { app } = new App();




describe('Login', function() {

  it('Não deve fazer login com dados do body inválidos', async function() {

    const { status, body } = await chai.request(app).post('/login')

      .send({});




    expect(status).to.equal(400);

    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });

  });




  it('Não deve fazer login com email inválido', async function() {

    const { status, body } = await chai.request(app).post('/login')

      .send(invalidEmailLoginBody);




    expect(status).to.equal(401);

    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });

  });




  it('Não deve fazer login com senha inválida', async function() {

    const { status, body } = await chai.request(app).post('/login')

      .send(invalidPasswordLoginBody);




    expect(status).to.equal(401);

    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });

  });




  it('Não deve fazer login quando o usuário não for encontrado', async function() {

    sinon.stub(SequelizeUser, 'findOne').resolves(null);




    const { status, body } = await chai.request(app)

      .post('/login')

      .send(validLoginBody);

    expect(status).to.equal(404);

    expect(body).to.be.deep.equal({ message: 'User not found' });

  });




  it('Deve retornar um token quando o login for concluído', async function() {

    sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);

    sinon.stub(JWT, 'sign').returns('validToken');

    sinon.stub(Validations, 'validateLogin').returns();




    const { status, body } = await chai.request(app)

      .post('/login')

      .send(validLoginBody);




    expect(status).to.equal(200);

    expect(body).to.have.key('token');

  });




  afterEach(sinon.restore);

})