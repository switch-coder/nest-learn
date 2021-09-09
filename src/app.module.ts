import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { BoardsModule } from './boards/boards.module';
import { BoardsService } from './boards/boards.service';
import { typeORMConfig } from './configs/typeorm.config';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule
  ],
  providers: [BoardsService],

})
export class AppModule { }
