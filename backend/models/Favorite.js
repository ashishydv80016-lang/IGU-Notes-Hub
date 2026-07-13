import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate favorites
favoriteSchema.index(
  { user: 1, material: 1 },
  { unique: true }
);

const Favorite = mongoose.model(
  "Favorite",
  favoriteSchema
);

export default Favorite;