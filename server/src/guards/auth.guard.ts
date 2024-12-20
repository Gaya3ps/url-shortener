import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}





  async canActivate(context: ExecutionContext):  Promise<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    
    console.log('Extracted Token:', token);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload =  await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Decoded Payloadddddddddddddd:',payload); // Debug log

      if (!payload) {
        throw new UnauthorizedException('No payload provided');
      }

      request['user'] = payload; // Attach the decoded user to the request
      return true;
    } catch (error) {
      console.error('Token verification error:', error.message); // Debug log
      throw new UnauthorizedException('Invalid token');
    }
  }




  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}






  // canActivate(context: ExecutionContext): boolean | Promise<boolean> {
  //   const request = context.switchToHttp().getRequest<Request>();
  //   const token = this.extractTokenFromHeader(request);

  //   console.log('Token received in AuthGuard:', token);
  //   if (!token) {
  //     throw new UnauthorizedException('No token provided');
  //   }

  //   try {
  //     const payload = this.jwtService.verify(token, {
  //       secret: process.env.JWT_SECRET,
  //     });
  //     console.log('Decoded Payloadddddddddddddd:', payload); // Debug log

  //     request['user'] = payload; // Attach the decoded user to the request
  //     return true;
  //   } catch (error) {
  //     console.error('Token verification error:', error.message); // Debug log
  //     throw new UnauthorizedException('Invalid token');
  //   }
  // }