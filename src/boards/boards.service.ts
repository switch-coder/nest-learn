import { Injectable, NotFoundException } from '@nestjs/common';

import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) { }

     createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise<Board>{
        const found = await this.boardRepository.findOne(id);
        if(!found) throw new NotFoundException(`Can't find Board with id ${id}`)
        return found
    }

    async deleteBoard(id : number) : Promise<void>{
        const result = await this.boardRepository.delete(id);
        console.log('result :>> ', result);
    }

    
    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
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
