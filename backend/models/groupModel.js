const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: [true, "Please Enter Your group name"],
        unique: true,
      },
    groupMembers:[]
})

module.exports = mongoose.model("Group",groupSchema);