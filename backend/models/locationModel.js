const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true
    // required: true,
  },
  location: {
    type: Object,
    required: true,
    coordinate: [{ latitude: Number,longitude: Number }],
  },
  userConnectionId: [],
});
module.exports = mongoose.model("Location", locationSchema);