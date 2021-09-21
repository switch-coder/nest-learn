import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{

    @ApiProperty({
        example: 'bukouser',
        description: "아이디",
        required:true
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({
        example: 'bukopassword',
        description: "비밀번호",
        required:true
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //영어랑 숫자만 가능
    @Matches(/^[a-zA-Z0-9]*$/)
    password: string;
}