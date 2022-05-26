// process.env.ENV_JS ?? require('module-alias/register');
if (process.env.ENV_JS) require("module-alias/register");

import "reflect-metadata";
import {
  checkDatabaseConnection,
} from "./configs/database";
import ExpressServer from "./ExpressServer";

async function bootstrap() {
  await checkDatabaseConnection();
}

function init() {
  const expressServer = new ExpressServer();
  expressServer.start();
}

bootstrap().then(() => {
  init();
});
