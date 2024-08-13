import mongoose, { Document } from "mongoose";


export interface IUser extends Document {
  username: string,
  type: string,
  email: string
  password: string,
  image?: string,
  searchHistory?: string[]
}
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  image: {
  type:String,
  default:""
  },
  searchHistory:{
   type:Array,
   default:[]
  }})




export const UserModel = mongoose.model<IUser>('User', userSchema);
