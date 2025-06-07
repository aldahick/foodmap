import { ForbiddenException, Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import { z } from "zod";
import type { IAuthToken } from "../graphql.js";
import { type Config, InjectConfig } from "../service/config/config.service.js";

const tokenSchema = z.object({
  userId: z.string(),
  exp: z.number(),
});
export type AuthToken = z.infer<typeof tokenSchema>;

@Injectable()
export class AuthTokenService {
  constructor(@InjectConfig private readonly config: Config) {}

  sign(userId: string) {
    return jwt.sign(
      {
        userId,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      } satisfies AuthToken,
      this.config.AUTH_SECRET,
    );
  }

  verify(token: string) {
    const payload = jwt.verify(token, this.config.AUTH_SECRET, {});
    if (typeof payload === "string") {
      throw new ForbiddenException();
    }
    return payload as AuthToken;
  }

  toGql(input: AuthToken | string): IAuthToken {
    const payload = typeof input === "string" ? this.verify(input) : input;
    const token =
      typeof input === "string"
        ? input
        : jwt.sign(input, this.config.AUTH_SECRET);
    return {
      expiresAt: new Date(1000 * payload.exp),
      token,
      userId: payload.userId,
      user: {} as never,
    };
  }
}
