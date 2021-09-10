import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from 'src/boards/board.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(([BoardRepository]))
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
