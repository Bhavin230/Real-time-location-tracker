const mongoose = require("mongoose");

const buildConnectionSchema = new mongoose.Schema({
  requestUserid: {
    type: String,
    require: true,
  },
  user_id: String,
  status: {
    type: String,
    default: "requested",
  },
});
module.exports = mongoose.model("buildConnection", buildConnectionSchema);
