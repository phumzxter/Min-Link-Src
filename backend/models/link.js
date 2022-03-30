const mongoose = require("mongoose");
const shortid = require("shortid");
// define the schema
const Schema = mongoose.Schema;

// linkSchema
const linkSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  email: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("Link", linkSchema);
