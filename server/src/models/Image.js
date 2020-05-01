const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    binary: {
      type: Buffer,
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("image", imageSchema);

module.exports = { Image };
