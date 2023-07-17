import { Server } from './server';
import { config } from './config';

export const ServerConfig = {
  port: config.PORT,
};

const server = new Server(ServerConfig);

server.listen();
