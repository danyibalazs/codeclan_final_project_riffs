const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let documentSchema = new Schema(
  {
    fileName: { type: String },
    fileUrl: { type: String },
    title: { type: String},
    description: {type: String}
  },
  {
    // createdAt,updatedAt fields are automatically added into records
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Document", documentSchema);

