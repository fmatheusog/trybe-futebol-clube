import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, before, after, it } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/matches';
import { 
  allMatchesExample,
  allFinishedMatchesExample,
  allInProgressMatchesExample,
} from './mocks/MatchesMocks';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testa as rotas de partidas', () => {
  describe('Testa a rota /matches', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(allMatchesExample as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('deve retornar status 200 e todas as partidas', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.all.keys(
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress',
        'teamHome',
        'teamAway'
      )
    })
  })

  describe('Testa a rota /matches?inProgress=false', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(allFinishedMatchesExample as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('deve retornar status 200 e todas as partidas que tem valor false no campo inProgress', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.all.keys(
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress',
        'teamHome',
        'teamAway'
      )

      chaiHttpResponse.body.forEach((match: any) => {
        expect(match.inProgress).to.be.equal(false)
      })
    })
  })

  describe('Testa a rota /matches?inProgress=true', () => {
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(allInProgressMatchesExample as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('deve retornar status 200 e todas as partidas que tem valor true no campo inProgress', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.all.keys(
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress',
        'teamHome',
        'teamAway'
      )

      chaiHttpResponse.body.forEach((match: any) => {
        expect(match.inProgress).to.be.equal(true)
      })
    })
  })
});
