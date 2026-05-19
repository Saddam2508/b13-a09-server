import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import config from "../config";
import { client } from "../db";

import type { ROLES } from "../types";

const db = client.db("sports_booking");

const userCollection = db.collection("users");

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Check token
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!!",
        });
      }

      // 2. Verify token
      const decoded = jwt.verify(token, config.secret as string) as JwtPayload;

      // 3. Find user
      const user = await userCollection.findOne({
        email: decoded.email,
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }

      // 4. Check active status
      if (!user.is_active) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!!",
        });
      }

      // 5. Role check
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!!, This role has no access!",
        });
      }

      // Attach user to request
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
