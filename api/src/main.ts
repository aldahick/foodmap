import { ShutdownSignal } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { WinstonModule } from "nest-winston";
import winston from "winston";
import { AppModule } from "./app.module.js";
import { type Config, configToken } from "./service/config/config.service.js";

const main = async () => {
  const logger = WinstonModule.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  });
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), {
    logger,
  });
  app.enableCors();

  const config = app.get<Config>(configToken);
  await app.listen(config.PORT, "0.0.0.0");
  logger.log(`Listening for HTTP requests on port ${config.PORT}`);
};

const handleShutdown = (code: number | string) => {
  process.exit(typeof code === "number" ? code : 0);
};
for (const signal of Object.values(ShutdownSignal)) {
  process.on(signal, handleShutdown);
}

await main();
