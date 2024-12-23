import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


const JWT_SECRET = 'secret123';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  
  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      console.log(user,"👌")
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        
        
        return result;
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      console.error('Error validating user:', error.message);
      throw error;
    }
  }

  async login(user: any) {
    try {
      console.log(user,"😍")
      const { email, _id } = user._doc || user.toObject();
      console.log(email,_id,"kkkkkk")
      // const payload = { email, userId: _id };
      const payload = { email: user._doc.email, userId: user._doc._id };
            console.log(payload,"😁");
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET || JWT_SECRET, // Use the secret here
          expiresIn: '1h', // Optional expiration time
        }),
      };
    } catch (error) {
      console.error('Error generating JWT:', error.message);
      throw new Error('Error generating token');
    }
  }
}