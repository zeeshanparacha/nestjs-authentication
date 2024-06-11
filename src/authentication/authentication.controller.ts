import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticateService: AuthenticationService) {}

  @Post('/sign-up')
  signUp(@Body() SignUpDto: SignUpDto): Promise<{message: string; token: string}> {
    return this.authenticateService.signUp(SignUpDto);
  }

  @Post('/sign-in')
  signIn(@Body() SignInDto: SignInDto): Promise<{username: string; email: string; token: string}> {
    return this.authenticateService.signIn(SignInDto);
  }

  @Post('/validate-token')
  validateToken(@Body("token") token: string): Promise<{valid: boolean; message?: string}> {
    return this.authenticateService.validateToken(token);
  }
}
