import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { UsersModule } from './Users/Users.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
      }))
      .forRoutes('*');
  }
}
