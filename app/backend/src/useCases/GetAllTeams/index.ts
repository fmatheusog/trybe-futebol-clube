import GetAllTeamsController from './GetAllTeamsController';
import GetAllTeamsUseCase from './GetAllTeamsUseCase';
// importar repositório

// instanciar repositório

const getAllTeamsUseCase = new GetAllTeamsUseCase(); // passar repositório como parâmetro

const getAllTeamsController = new GetAllTeamsController(getAllTeamsUseCase);

export { getAllTeamsUseCase, getAllTeamsController };
