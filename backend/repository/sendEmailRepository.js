const User = require("../models/userModel");
const buildConnection = require("../models/buildconnectionModel");
exports.sendEmailRepository = async function(id,requestUserid) {
    let connection = await buildConnection.findOne({
        user_id: id,
        requestUserid:requestUserid ,
      });
    if(connection.status === "requested"){
        const mail = await User.findOne({_id:id});
        return mail.email;
    }
}