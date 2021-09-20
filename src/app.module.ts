import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    MorganModule
  ],
  providers: [ {
    provide: APP_INTERCEPTOR,
    useClass: MorganInterceptor("combined"),
  },
  ],

})
export class AppModule { }
