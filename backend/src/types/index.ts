import jwt, { JwtPayload } from "jsonwebtoken";

export type TServerConfig = {
  db_url: string;
  host: string;
  log_level: string;
  port: number;
};

export type TJwtConfig = {
  algorithm: jwt.Algorithm;
  hash_salt: number;
  refresh_token_expiration_time: string;
  access_token_secret_key: string;
  refresh_token_secret_key: string;
  access_token_expiration_time: string;
  refresh_token_expiration_time_in_db: number;
};

export type TUser = {
  name: string;
  email: string;
  password?: string;
  age: number;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TPayload = string | JwtPayload | null | undefined;

export type TShowType = "TV Show" | "Movie";
