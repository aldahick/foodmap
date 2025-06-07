import { Injectable } from "@nestjs/common";
import type { FastifyRequest } from "fastify";
import { UserService } from "../user/user.service.js";
import { AuthTokenService } from "./auth-token.service.js";
import { AuthContext } from "./auth.context.js";

@Injectable()
export class AuthContextService {
  constructor(
    private readonly tokenService: AuthTokenService,
    private readonly userService: UserService,
  ) {}

  get(req: FastifyRequest): AuthContext | undefined {
    const [prefix, token] = req.headers.authorization?.split(" ") ?? [];
    if (prefix?.toLowerCase() !== "bearer" || !token) {
      return;
    }
    return new AuthContext(token, this.tokenService, this.userService);
  }
}
