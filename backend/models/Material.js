import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Notes", "Previous Paper", "Syllabus"],
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  downloads: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Material", materialSchema);