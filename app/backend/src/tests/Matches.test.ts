import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, before, after, it } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/matches';
import Team from '../database/models/teams';
import { 
  allMatchesExample,
  allFinishedMatchesExample,
  allInProgressMatchesExample,
  newMatch,
} from './mocks/MatchesMocks';
import { teamsExample } from './mocks/TeamsMocks';
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

  describe('Testa a rota /matches para criação de partidas', () => {
    before(async () => {
      sinon.stub(Match, 'create').resolves(newMatch as Match);
    })

    after(() => {
      (Match.create as sinon.SinonStub).restore();
    })

    it('deve retornar status 201 e os dados da criação da partida', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          'homeTeam': 1,
          'homeTeamGoals': 2,
          'awayTeam': 2,
          'awayTeamGoals': 0,
          'inProgress': false,
        });

        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.have.property('id');
        expect(chaiHttpResponse.body.id).to.be.equal(1);
    })
  })

  describe('Testa a rota /matches/:id/finish', () => {
    before(async () => {
      sinon.stub(Match, 'update').resolves();
    })

    after(() => {
      (Match.update as sinon.SinonStub).restore();
    })

    it('deve retornar status 200 e uma mensagem de confirmação', async () => {
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1/finish');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body.id).to.be.equal('Finished');
    })
  })

  describe('Testa a rota se não é possível criar uma partida com dois times iguals', () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(teamsExample as Team[]);
    })

    after(() => {
      (Match.findOne as sinon.SinonStub).restore();
    })

    it('deve retornar status 401 e mensagem de erro', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send({
          'homeTeam': 1,
          'homeTeamGoals': 1,
          'awayTeam': 1,
          'awayTeamGoals': 3,
          'inProgress': false,
        })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.id).to.be.equal('It is not possible to create a match with two equal teams');
    })
  })

  describe('Testa a rota se não é possível criar uma partida com um time que não existe', () => {
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(null);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('deve retornar status 401 e mensagem de erro', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send({
          'homeTeam': 35,
          'homeTeamGoals': 1,
          'awayTeam': 2,
          'awayTeamGoals': 3,
          'inProgress': false,
        })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.id).to.be.equal('There is no team with such id!');
    })
  })
});
