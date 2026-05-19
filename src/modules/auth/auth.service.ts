import bcrypt from "bcryptjs";

import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";

import { client } from "../../db";

const db = client.db("sports_booking");

const userCollection = db.collection("users");

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const userData = await userCollection.findOne({ email });

  if (!userData) {
    throw new Error("Invalid Credentials!");
  }

  // 2. Compare the password -> Done

  const matchPassword = await bcrypt.compare(password, userData.password);

  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }

  //3. Generate Token
  const jwtpayload = {
    id: userData.id,
    name: userData.name,
    role: userData.role,
    is_active: userData.is_active,
    email: userData.email,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(jwtpayload, config.refresh_secret as string, {
    expiresIn: "10d",
  });

  return { accessToken, refreshToken };
};

const generateFreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token as string,
    config.refresh_secret as string,
  ) as JwtPayload;

  const userData = await userCollection.findOne({ email: decoded.email });

  if (!userData) {
    throw new Error("User not found!!");
  }

  if (!userData?.is_active) {
    throw new Error("Forbidden!!");
  }

  const jwtpayload = {
    id: userData.id,
    name: userData.name,
    role: userData.role,
    is_active: userData.is_active,
    email: userData.email,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const authService = {
  loginUserIntoDB,
  generateFreshToken,
};
