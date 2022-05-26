// ecosystem.config.js
const os = require("os");
require("dotenv").config();
module.exports = {
  apps: [
    {
      port: process.env.PORT,
      name: "neko-wallet-api",
      script: "./build/src/index.js",
      //args: "run start:prod",
      // watch: true, // optional
      // ignore_watch: ["[/\\]./", "node_modules", "src", "logs"],
      instances: "max",
      exec_mode: "cluster",
      env: {
	ENV_JS: process.env.ENV_JS || true,
        JWT_SECRET: process.env.JWT_SECRET,
        APP_ENV: process.env.APP_ENV,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        DB_CRYPTO_HOST: process.env.DB_CRYPTO_HOST,
        DB_CRYPTO_DATABASE: process.env.DB_CRYPTO_DATABASE,
        DB_CRYPTO_USERNAME: process.env.DB_CRYPTO_USERNAME,
        DB_CRYPTO_PASSWORD: process.env.DB_CRYPTO_PASSWORD,
        DB_CRYPTO_PORT: process.env.DB_CRYPTO_PORT,
        DB_PRICE_HOST: process.env.DB_PRICE_HOST,
        DB_PRICE_DATABASE: process.env.DB_PRICE_DATABASE,
        DB_PRICE_USERNAME: process.env.DB_PRICE_USERNAME,
        DB_PRICE_PASSWORD: process.env.DB_PRICE_PASSWORD,
        DB_PRICE_PORT: process.env.DB_PRICE_PORT,
        ENABLE_SWAGGER: process.env.ENABLE_SWAGGER,
      },
    },
  ],
};
