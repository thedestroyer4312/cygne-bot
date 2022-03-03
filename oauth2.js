import { ClientRequest } from "http";
import url from "url";

import {
  CLIENT_ID,
  CLIENT_SECRET,
  DISCORD_URL_BASE,
  PORT,
  REDIRECT_URI_BASE,
  REDIRECT_URI_ENDPOINT,
  DISCORD_TOKEN_ENDPOINT
} from "./app.js";
import { httpsRequest } from "./util.js";

/**
 * Exchanges given authorization code with Discord token endpoint
 * @function exchangeCode
 * @param {string} code
 * @return {Promise<ClientRequest>} Response from Discord token URL
 */
export function exchangeCode(code) {
  // Send POST to Discord token URL containing code
  // If not successful, throws exception
  const options = {
    hostname: DISCORD_URL_BASE,
    port: PORT,
    path: DISCORD_TOKEN_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  const data = new url.URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization-code",
    code,
    redirect_uri: REDIRECT_URI_BASE + REDIRECT_URI_ENDPOINT
  });

  // Return promisifed request
  return httpsRequest(options, data.toString());
}
