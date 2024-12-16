import { Schema, model } from "mongoose";

type TUserSchema = {
  password: string;
  email: string;
  age: number;
  name: string;
};

const UserSchema = new Schema<TUserSchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUserSchema>("User", UserSchema);
