import mongoose, { Schema, Model } from "mongoose";
import { Entry } from "../interfaces";

export interface IEntry extends Entry {}

const entrySchema = new Schema(
  {
    description: { type: String, required: true },
    status: {
      type: String,
      enum: {
        values: ["pending", "done", "in-progress"],
        message: "Status is invalid",
      },
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
