import http from "http";
import https from "https";

/**
 * @function httpsRequest
 * @param {http.RequestOptions} params
 * @param {string} postData
 * @return {Promise<http.ClientRequest>} Promisifed request
 */
export function httpsRequest(params, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(params, (res) => {
      // Reject on bad status
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`statusCode=${res.statusCode}`));
      }

      // Accumulate data (res is a readable stream)
      let body = [];
      res.on("data", (chunk) => body.push(chunk));

      // On finish, attempt to parse body into JSON object
      res.on("end", () => {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (err) {
          reject(err);
        }
        resolve(body);
      });
    });

    // If request error, reject
    req.on("error", (err) => reject(err));

    // If there is POST data, then write it to the request
    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}
