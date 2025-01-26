import { Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  age: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
