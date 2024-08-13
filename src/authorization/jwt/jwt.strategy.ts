import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: 'https://dev-sz0lvdtr5k0znxzx.us.auth0.com/',
      audience: 'coolness-api',
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksClient.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-sz0lvdtr5k0znxzx.us.auth0.com/.well-known/jwks.json',
      }),
    });
  }

  async validate(payload: any) {
    this.logger.debug(`JWT Payload: ${JSON.stringify(payload)}`);
    return { userId: payload.sub };
  }
}
