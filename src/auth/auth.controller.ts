import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { User } from './interfaces/user';

@Controller('auth')
export class AuthController {
  @Public()
  @Get('public')
  getPublicRoute() {
    return {
      message: 'This is a public route - no authentication required',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('me')
  getCurrentUser(@CurrentUser() user: User) {
    return {
      message: 'Current authenticated user information',
      user: user,
    };
  }
}
