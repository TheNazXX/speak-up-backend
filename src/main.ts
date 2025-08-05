// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: ["https://speak-up-frontend.vercel.app/", "http://localhost:3000/"],           
    credentials: true,                       
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });


  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Speak-up API')
    .setDescription('Learn English!')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);


  SwaggerModule.setup('docs', app, document);

  await app.listen(8080);
}
bootstrap();
