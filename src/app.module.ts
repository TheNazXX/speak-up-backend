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
import { ItemsModule } from './items/items.module';

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
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345',
        database: 'speak-up',
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: true,
      }),
      inject: [ConfigService],
    }),
    WordsModule,
    TextsModule,
    RepeatWordsModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleware).forRoutes('*');
  }
}
