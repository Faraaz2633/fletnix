import mongoose, { Schema, Document, InferSchemaType } from "mongoose";
import { TShowType } from "../../types";

type TShowSchema = {
  show_id: string;
  type: TShowType;
  title: string;
  director?: string;
  cast?: string;
  country: string;
  date_added?: Date;
  release_year: number;
  rating?: string;
  duration: string;
  listed_in: string;
  description: string;
} & Document;

const ShowSchema: Schema = new Schema<TShowSchema>(
  {
    show_id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      default: "",
    },
    cast: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      required: true,
    },
    date_added: {
      type: Date,
    },
    release_year: {
      type: Number,
      required: true,
    },
    rating: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      required: true,
    },
    listed_in: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export type ShowSchemaType = InferSchemaType<typeof ShowSchema>;

export const Show = mongoose.model<TShowSchema>("Show", ShowSchema);
