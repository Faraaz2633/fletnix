import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateTokens, getTokenInfo } from "../utils/token";
import { User } from "../database/models/user";
import { RefreshToken } from "../database/models/refresh-token";
import { TUser } from "../types";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const user_email = await User.findOne({ email: body.email });

    if (user_email) {
      let message = "Email already exists";
      if (user_email) {
        message = "Email already exist";
      }
      return res.status(400).json({ error: true, message });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const new_user = await User.create({
      ...body,
      password: hashedPassword,
    });

    const tokens = await generateTokens({
      ...new_user,
      _id: `${new_user._id}`,
    });

    return res.status(201).json({
      error: false,
      message: "User created successfully",
      data: {
        access_token: tokens?.access_token,
        user: {
          email: new_user.email,
          age: new_user.age,
          name: new_user.name,
          _id: new_user._id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const invalid_error_object = {
      error: true,
      message: "email or password is wrong",
    };

    const user: TUser | null = await User.findOne({ email });

    if (!user || !password) {
      return res.status(400).json(invalid_error_object);
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!validPassword) {
      return res.status(400).json(invalid_error_object);
    }

    const tokens = await generateTokens(user);

    res.status(200).json({
      error: false,
      message: "User logged in successfully",
      data: {
        access_token: tokens?.access_token,
        user: {
          email: user.email,
          name: user.name,
          age: user.age,
          _id: user._id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const current_user = req.body.user;
  const user_id = JSON.parse(current_user)._id;

  try {
    const refresh_token_doc = await RefreshToken.findOne({ user_id: user_id });
    const token_info = getTokenInfo({
      token: refresh_token_doc?.refresh_token || "",
      token_type: "refresh",
    });

    if (token_info?.user && token_info?.is_valid_token) {
      const tokens = await generateTokens(token_info?.user);
      return res.status(200).json({
        error: false,
        message: "Token refreshed successfully",
        data: {
          user: token_info?.user,
          access_token: tokens?.access_token,
        },
      });
    }

    return res.status(400).json({
      error: true,
      status: 407,
      message: "Refresh token is not valid or not found. Login Again.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const validate = async (req: Request, res: Response): Promise<void> => {
  const token = req.body.access_token;

  const is_valid_token = getTokenInfo(token)?.is_valid_token;

  if (is_valid_token) {
    res.status(200).json({
      error: false,
      message: "Token is valid",
    });
  } else {
    refresh(req, res);
  }
};
