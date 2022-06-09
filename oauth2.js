import axios from "axios";
import url from "url";

import {
  CLIENT_ID,
  CLIENT_SECRET,
  DISCORD_URL_BASE,
  PORT,
  REDIRECT_URI,
  REDIRECT_URI_BASE,
  REDIRECT_URI_ENDPOINT,
  DISCORD_TOKEN_ENDPOINT
} from "./app.js";

/**
 * Exchanges given authorization code with Discord token endpoint
 * @function exchangeCode
 * @param {string} code
 * @return {Promise<import("axios").AxiosResponse<any, any>} Response from Discord token URL
 */
export function exchangeCode(code) {
  // Note: only accepts URL encoded - JSON data is not permitted
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  const formData = new url.URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI
  });

  // Send POST to Discord token URL containing code
  const DISCORD_TOKEN_URL = DISCORD_URL_BASE + DISCORD_TOKEN_ENDPOINT;
  console.log(formData.toString());
  return axios.post(DISCORD_TOKEN_URL, formData.toString(), config);
}
