import * as express from 'express';
import * as cors from 'cors';

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
    this.app.use(cors());

    this.app.get('/', async (_req, res) => { res.status(200).json({ teste: 'ok' }); });
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
