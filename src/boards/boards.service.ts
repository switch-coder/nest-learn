import { Injectable, NotFoundException } from '@nestjs/common';

import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) { }

     createBoard(createBoardDto: CreateBoardDto,user :User) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board>{
        const found = await this.boardRepository.findOne(id);
        if(!found) throw new NotFoundException(`Can't find Board with id ${id}`)
        return found
    }

    async deleteBoard(id : number, user:User) : Promise<void>{
        const query = this.boardRepository.createQueryBuilder('board');
        query.where
        const result = await this.boardRepository.delete({id,user});
        if(result.affected ===0){throw new NotFoundException(`Can not find Board with id ${id}`)}
        console.log('result :>> ', result);
    }

    
    async getAllBoards(user : User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', {userId: user.id});
        const board  = await query.getMany();
        return board;
    }

  

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //     if (!found) throw new NotFoundException(`Can't find Board with id ${id}`);
    //     return found
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter(board => board.id !== found.id);
    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board
    }

}
