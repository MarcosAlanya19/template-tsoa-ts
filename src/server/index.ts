import { dbConnection } from '@database/config.database';
import * as ErrorHandler from '@middlewares/err/handleErrors.err';
import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import * as swaggerUI from 'swagger-ui-express';
import { ServerConfig } from '../app';
import { RegisterRoutes } from '../routes';
import * as swaggerJson from '../swagger.json';

export class Server {
  private app: express.Application;

  constructor(private config: typeof ServerConfig) {
    this.app = express();
    this.connectDB();
    this.middlewares();
  }

  async connectDB() {
    await dbConnection();
  }

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    RegisterRoutes(this.app)
    this.app.use(errors())
    this.app.use(ErrorHandler.handlerError)
    process.on('uncaughtException',ErrorHandler.fatalError)
    process.on('unhandledRejection',ErrorHandler.fatalError)
    this.app.use(
      ['/openapi', '/docs', '/swagger'],
      swaggerUI.serve,
      swaggerUI.setup(swaggerJson)
      );
    this.app.use(ErrorHandler.notFound)
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/uploads',
      })
    );
  };

  public listen = (): void => {
    this.app.listen(this.config.port, () => {
      console.log(`Server listening on port ${this.config.port}`);
    });
  };
}
