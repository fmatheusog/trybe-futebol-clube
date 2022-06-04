import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, before, after, it } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';
import { tokenExample, userExample } from './mocks/UserMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testa as rotas de login', () => {
  describe('Testa se a rota /login funciona corretamente', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userExample as User);
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('login deve ser feito com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/login')
        .send({ email: 'admin@teste.com', password: 'senhasecreta' });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('user');
      expect(chaiHttpResponse.body).to.have.property('token');
    })
  })

  describe('Testa se a rota /login foi chamada com um email inválido', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('deve retornar status 401 e mensagem de erro', async () => {
      chaiHttpResponse = await chai.request(app).post('/login')
        .send({ email: 'naoexiste@teste.com', password: 'senhaincorreta' });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    })
  })

  describe('Testa se a rota /login foi chamada com campos em branco', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('deve retornar status 400 e mensageme de erro', async () => {
      chaiHttpResponse = await chai.request(app).post('/login')
        .send({ email: '', password: '' });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    })
  })

  describe('Testa se a rota /login/validate funciona corretamente', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(userExample as User);
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('deve retornar status 200 e o tipo de usuário (role)', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate')
        .set('authorization', tokenExample);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.equal('admin');
    })
  })
});
