import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, before, after, it } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teams';
import { teamExample, teamsExample } from './mocks/TeamsMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testa as rotas de times', () => {
  describe('testa se a rota /teams retorna todos os times existentes', () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(teamsExample as Team[]);
    })

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('deve retornar o código 200 e um array com times', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
      
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equals(teamsExample)
    })
  })

  describe('testa se a rota /teams/:id retorna o time correto', () => {
    before(async () => {
      sinon.stub(Team, 'findOne').resolves(teamExample as Team);
    })

    after(() => {
      (Team.findOne as sinon.SinonStub).restore();
    })

    it('deve retornar o código 200 e um objeto com as informações do time', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');
      
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equals(teamExample)
    })
  })
});
