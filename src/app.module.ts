import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DelayMiddleware } from './middlewares/DelayMiddleware';
import { TextsModule } from './texts/texts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsOfSpeechEntity } from './entities/partOfSpeech.entity';
import { SentencesModule } from './sentences/entities/sentences.module';
import { LessonsModule } from './lessons/lessons.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, TypeOrmModule.forFeature([PartsOfSpeechEntity])],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: true,
        ssl: { rejectUnauthorized: false }
      }),
      inject: [ConfigService],
    }),
    SentencesModule,
    TextsModule,
    LessonsModule,
    VocabularyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleware).forRoutes('*');
  }
}
