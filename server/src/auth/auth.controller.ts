import { Body, Controller, Post,HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authService.validateUser(body.email, body.password);
      return this.authService.login(user);
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new HttpException(error.message || 'An error occurred during login', HttpStatus.UNAUTHORIZED);
    }
  }
}
