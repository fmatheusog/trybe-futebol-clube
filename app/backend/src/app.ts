import * as express from 'express';
import AuthenticationRoutes from './routes/AuthenticationRoutes';
import TeamsRoutes from './routes/TeamsRoutes';
import MatchesRoutes from './routes/MatchesRoutes';
import LeaderboardRoutes from './routes/LeaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());

    // Routes
    this.app.use('/login', AuthenticationRoutes);
    this.app.use('/teams', TeamsRoutes);
    this.app.use('/matches', MatchesRoutes);
    this.app.use('/leaderboard', LeaderboardRoutes);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log('Rodando na porta ', PORT);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
