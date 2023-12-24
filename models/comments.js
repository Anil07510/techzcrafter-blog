const mongoose = require("mongoose");

const comentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
  },
  { timestamps: true }
);

const comment = mongoose.model("comment", comentSchema);

module.exports = comment;
