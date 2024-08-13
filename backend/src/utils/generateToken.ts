import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars"
import { Response } from "express"
import { IUser } from "../model/userModel";

export const generateTokenAndSetCookie = (userId:string, res: Response) => {
  const jwtSecret = ENV_VARS.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined in environment variables');
  }
  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '15d' })
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 25 * 60 * 60 * 1000, // 15 days in MS
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks,make it not be accessed by JS
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: ENV_VARS.NODE_ENV !== "development",


  })

  return token;
}