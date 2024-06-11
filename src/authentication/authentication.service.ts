import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    SignUpDto: SignUpDto,
  ): Promise<{ message: string; token: string }> {
    const { username, email, password } = SignUpDto;

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException(
        'Email already exists, please try with different email address.',
      );
    }

    const user = new this.userModel({
      username,
      email,
      password,
    });

    await user.save();

    const token = this.jwtService.sign({ id: user._id });

    return { message: 'You have successfully Signup', token };
  }

  async signIn(
    SignInDto: SignInDto,
  ): Promise<{ username: string; email: string; token: string }> {
    const { email, password } = SignInDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(
        'The details entered do not match our records',
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException(
        'The details entered do not match our records',
      );
    }

    const token = this.jwtService.sign({ id: user._id });

    return { username: user.username, email, token };
  }

  async validateToken(
    token: string,
  ): Promise<{ valid: boolean; message?: string }> {
    try {
      this.jwtService.verify(token);
      return { valid: true };
    } catch (error) {
      return { valid: false, message: 'Token is invalid or expired' };
    }
  }
}
