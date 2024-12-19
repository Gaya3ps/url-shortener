import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';
import corsOptions from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = new Logger('Bootstrap');
  app.enableCors(corsOptions);
 // Log MongoDB connection status
 mongoose.connection.on('connected', () => {
  logger.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  logger.error('Error connecting to MongoDB', err);
});

// Start the server
await app.listen(port);
logger.log(`Application is running on: http://localhost:${port}`);


}
bootstrap();
