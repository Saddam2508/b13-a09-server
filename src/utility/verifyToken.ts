import type { NextFunction, Request, Response } from "express";
import sendResponse from "./sendResponse";
import { createRemoteJWKSet, jwtVerify } from "jose";
import config from "../config";

const JWKS = createRemoteJWKSet(new URL(`${config.client_uri}/api/auth/jwks`));

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);

    // req.user = payload

    next();
  } catch (error) {
    return sendResponse(res, {
      statusCode: 403,
      success: false,
      message: "Forbidden",
    });
  }
};

export default verifyToken;
