import { Controller, Get, Query, Response } from "@nestjs/common";
import { type FastifyReply } from "fastify";
import { type Config, InjectConfig } from "../service/config/config.service.js";
import { UserService } from "../user/user.service.js";
import { AuthGoogleService } from "./auth-google.service.js";
import { AuthTokenService } from "./auth-token.service.js";

@Controller("auth")
export class AuthController {
  constructor(
    @InjectConfig private readonly config: Config,
    private readonly googleService: AuthGoogleService,
    private readonly tokenService: AuthTokenService,
    private readonly userService: UserService,
  ) {}

  @Get("google")
  async google(
    @Query("code") code: string,
    @Query("state") state: string,
    @Response() reply: FastifyReply,
  ) {
    const email = await this.googleService.getEmail(code);
    const user = await this.userService.get({ email });
    const redirectUrl = `${this.config.WEB_URL}/admin/login`;
    if (!user) {
      await reply.redirect(`${redirectUrl}?error=no-user`, 302);
      return;
    }
    const token = this.tokenService.sign(user.id);
    const searchParams = new URLSearchParams({ token, state });
    await reply.redirect(`${redirectUrl}?${searchParams}`, 302);
  }
}
