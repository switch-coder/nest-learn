import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor (private authService : AuthService){}

    @ApiOperation({summary:"회원가입"})
    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto) : Promise<void>{
        return this.authService.signUp(authcredentialsDto);
    }

    @ApiOperation({summary:"로그인"})
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto) : Promise<{accessToken : string}>{
        return this.authService.signIn(authCredentialsDto)
    }
    
    @Post('/test')
    @UseGuards(AuthGuard())
    authTest(@GetUser() user: User){
        console.log('req :>> ', user);
    }
}
  