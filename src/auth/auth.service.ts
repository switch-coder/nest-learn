import { HttpException, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from 'src/httpExecption.filter';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService : JwtService
    ){}

    async signUp(authCredentialsDto:AuthCredentialsDto) :Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto:AuthCredentialsDto) : Promise<{accessToken : string}>{
        const { username, password} = authCredentialsDto;

        const user = await this.userRepository.findOne({username});
        if(user && (await bcrypt.compare(password, user.password))){
         // 유저 토큰 생성 (secret + payload)
         
         const payload = {username};// 중요한 정보 ㄴㄴ
         const accessToken = await this.jwtService.sign(payload);
            
         return {accessToken };
        }
        else throw new HttpException('login failed',400);

    }
}
