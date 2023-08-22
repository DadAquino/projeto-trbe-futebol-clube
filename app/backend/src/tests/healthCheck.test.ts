import * as chai from 'chai';
import { App } from '../app';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Route Test', function() {
  describe('GET /', () => {
    const  app  = new App().app;

    it('01 - Tests if route / is working', async () => {
      const { status, text } = await chai.request(app).get('/');

      chai.expect(status).to.be.equal(200);
      chai.expect(text).to.be.equal('{"ok":true}');
    });
  });
});