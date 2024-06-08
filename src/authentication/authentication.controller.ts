import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('authentication')
export class AuthenticationController {

    constructor(private authenticateService: AuthenticationService) { }

    @Post("/signup")
    signUp(@Body() SignUpDto: SignUpDto): Promise<{}> {
        return this.authenticateService.signUp(SignUpDto);
    }

    @Get('/signin')
    login(@Body() SignInDto: SignInDto): Promise<{}> {
        return this.authenticateService.signIn(SignInDto);
    }
}
