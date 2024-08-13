import { Request, Response } from "express";
import { IUser, UserModel } from "../model/userModel";
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken";

export async function signup(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body as IUser
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" }
      )
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(emailRegex.test(email))) {
      return res.status(400).json({ success: false, message: "Invalid Email" })
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
    }
    const existingUserByEmail = await UserModel.findOne({ email: email })
    if (existingUserByEmail) {

      return res.status(400).json({ success: false, message: "User is already existing with this email" })
    }

    const existingUserByUsername = await UserModel.findOne({ username: username })
    if (existingUserByUsername) {

      return res.status(400).json({ success: false, message: "User is already existing with this username" })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt);


    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]
    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
      email: email,
      image: image
    })


    generateTokenAndSetCookie(newUser.id, res);
    await newUser.save()

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      success: true,
      user: userWithoutPassword,
    });



    //Remove password from the response

    // Exclude password from the response


  } catch (error) {
    console.log("Error in sign up controller", error)
    return res.status(500).json({ success: false, message: "Server error" })


  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as IUser;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"

      })
    }
    const user = await UserModel.findOne({
      email: email
    })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid  credentials"
      })
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({
        success: false,
        message: "Invalid  credentials"
      })
    }

    generateTokenAndSetCookie(user.id, res);
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      success: true,
      user: userWithoutPassword,

    })
  } catch (error) {
console.log("Error in login controller")
return res.status(500).json({ success: false, message: "Server error" })

  }

}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("jwt-netflix");

    res.status(200).json({
      success: true,
      message: "Logout successfully"
    });
  } catch (error) {
    console.log("Error in Logout controller")
    return res.status(500).json({ success: false, message: "Server error" })

  }

}