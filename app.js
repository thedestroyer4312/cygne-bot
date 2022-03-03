import dotenv from "dotenv";
import express from "express";
dotenv.config();

// OAuth2
import { exchangeCode } from "./oauth2.js";

const app = express();

// Init variables from .env
export const PORT = process.env.PORT || "3001";
export const CLIENT_ID = process.env.DISCORD_OAUTH2_CLIENT_ID;
export const CLIENT_SECRET = process.env.DISCORD_OAUTH2_CLIENT_ID;

// Redirect URI
export const REDIRECT_URI_BASE = process.env.REDIRECT_URI_BASE || `http://localhost:${PORT}`;
export const REDIRECT_URI_ENDPOINT = "/api/auth/discord/redirect";

// Discord URLS
export const DISCORD_URL_BASE = "https://discord.com";
export const DISCORD_BASE_AUTHORIZATION_ENDPOINT = "/api/oauth2/authorize";
export const DISCORD_TOKEN_ENDPOINT = "/api/oauth2/token";
export const DISCORD_TOKEN_REVOCATION_ENDPOINT = "/api/oauth2/token/revoke";

/**
 * @description When redirected to redirect URI, retrieves the authorization code from the user
 * and attempts to exchange for access token/refresh token pair
 */
app.get(REDIRECT_URI_ENDPOINT, (req, res) => {
  console.log(req);

  // Retrieve code from request

  const { code } = req.query;

  // If code exists, exchange code for token
  // Otherwise, bad request - 400
  if (code) {
    exchangeCode(code.toString())
      .then((data) => {
        console.log(data);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  } else {
    res.sendStatus(400);
  }
});

// Start listening on given port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
