import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WordsModule } from './words/words.module';
import { DelayMiddleware } from './middlewares/DelayMiddleware';
import { TextsModule } from './texts/texts.module';
import { RepeatWordsModule } from './repeat-words/repeat-words.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsEntity } from './words/entities/word.entity';
import { PartsOfSpeechEntity } from './entities/partOfSpeech.entity';
import { SentencesModule } from './sentences/entities/sentences.module';
import { PhrasesModule } from './phrases/phrases.module';
import { GlobalSettingsModule } from './global-settings/global-settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        TypeOrmModule.forFeature([WordsEntity, PartsOfSpeechEntity]),
      ],
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
      }),
      inject: [ConfigService],
    }),
    SentencesModule,
    WordsModule,
    TextsModule,
    RepeatWordsModule,
    PhrasesModule,
    GlobalSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleware).forRoutes('*');
  }
}
