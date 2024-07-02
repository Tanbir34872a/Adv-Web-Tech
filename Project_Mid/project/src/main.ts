import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'Patch'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  });
  await app.listen(4000);
}
bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { json, urlencoded } from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   // Some Configuration for API (Not about Swagger)
//   app.use(json({ limit: '50mb' }));
//   app.use(urlencoded({ extended: true, limit: '50mb' }));

//   // Setting API Path
//   const apiPath = 'api';
//   app.setGlobalPrefix(apiPath);

//   // Swagger Options
//   const options = new DocumentBuilder()
//     .addBearerAuth()
//     .setTitle('Nest-js Swagger Example API')
//     .setDescription('Swagger Example API API description')
//     .setVersion('1.0')
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   // Swagger path: http://localhost:3200/api/docs
//   SwaggerModule.setup(`${apiPath}/docs`, app, document);

//   await app.listen(3200);
// }
// bootstrap();