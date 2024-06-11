import { IsNotEmpty, IsEmail, IsString, MinLength } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a correct email address" })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}