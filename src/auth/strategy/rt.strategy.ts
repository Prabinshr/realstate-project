import { PassportStrategy } from '@nestjs/passport';
import { TOKENS } from 'config';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TOKENS.REFRESH_TOKEN_SECRET,
      // passReqToCallback: true,
    });
  }

  validate(payload: any) {
    // const refreshToken = req.get('authorization');
    return payload;

    // req.user = payload
  }
}
