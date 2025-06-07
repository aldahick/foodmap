import { randomBytes } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { type Config, InjectConfig } from "../service/config/config.service.js";

@Injectable()
export class AuthGoogleService {
  constructor(@InjectConfig private readonly config: Config) {}

  get client() {
    const redirectUri = `${this.config.BASE_URL}/auth/google`;
    return new OAuth2Client({
      clientId: this.config.GOOGLE_CLIENT_ID,
      clientSecret: this.config.GOOGLE_CLIENT_SECRET,
      redirectUri,
    });
  }

  getRedirect() {
    const state = randomBytes(8).toString("hex");
    const url = this.client.generateAuthUrl({
      access_type: "online",
      scope: ["email"],
      include_granted_scopes: true,
      state,
    });
    return { url, state };
  }

  async getEmail(code: string) {
    const {
      tokens: { id_token: idToken },
    } = await this.client.getToken(code);
    if (!idToken) {
      return;
    }

    const ticket = await this.client.verifyIdToken({ idToken });
    return ticket?.getPayload()?.email;
  }
}
