import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { User } from './interfaces/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri:
          'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_XWsl1Rhne/.well-known/jwks.json',
      }),
      issuer:
        'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_XWsl1Rhne',
      algorithms: ['RS256'],
    });
  }

  validate(payload: any): User {
    return { id: payload.sub ?? '' };
  }
}
