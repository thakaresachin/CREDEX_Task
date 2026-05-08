import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    companyName: String,

    role: String,

    teamSize: Number,
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;