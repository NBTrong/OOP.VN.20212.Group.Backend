import jwt from "jsonwebtoken";
import { Request } from "express";
import HttpError from "@n-errors/HttpError";

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "api_key") {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }

    if (token === "abc123456") {
      return Promise.resolve({
        id: 1,
        name: "Ironman",
      });
    } else {
      return Promise.reject({});
    }
  }

  if (securityName === "jwt") {
    const tokenFromHeader = request.headers.authorization;
    if (
      !tokenFromHeader ||
      tokenFromHeader.split(" ")[0] !== "Bearer" ||
      tokenFromHeader.split(" ").length < 2
    ) {
      return Promise.reject(
        new HttpError(401, "Unauthorized! The token should be valid")
      );
    }
    const token = tokenFromHeader.split(" ")[1];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new HttpError(401, "No token provided"));
      }
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        function (err: any, decoded: any) {
          if (err) {
            reject(new HttpError(401, "No token provided"));
          } else {
            // Check if JWT contains all required scopes
            // for (let scope of scopes) {
            if (scopes && scopes.length !== 0) {
              if (!decoded.role.includes(scopes[0])) {
                throw new HttpError(
                  401,
                  "JWT does not contain required scope."
                );
              }
            }
            // }
            if (!decoded.wallet_id) {
              throw new HttpError(401, "Wallet id is missing from this token.");
            }
            resolve(decoded);
            request.wallet_id = decoded.wallet_id ?? decoded;
          }
        }
      );
    });
  }
}
