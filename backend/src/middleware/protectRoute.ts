import jwt from "jsonwebtoken"
import { UserModel, IUser } from "../model/userModel"

import { ENV_VARS } from "../config/envVars"
import { NextFunction, Request, Response } from "express"

export interface CustomRequest extends Request {
  user?: IUser;
}

export const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" })
    }
    if (!(ENV_VARS.JWT_SECRET)) {
      return res.status(401).json({ success: false, message: "Unauthorized - ENV_VARS.JWT_SECRET Undefined" })
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET) as { userId: string };

    if (!decoded) {
      return res.status(401).json({ success: false, message: " Unauthorized - No Token Provided" })

    }

    const user = await UserModel.findById(decoded.userId).select("-password");



    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized - User Not Found" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.log("Error in protectRoute middleware")
    return res.status(500).json({ success: false, message: "Internal Server Error" });

  }

}