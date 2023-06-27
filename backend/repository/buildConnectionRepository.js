const buildConnection = require("../models/buildconnectionModel");
const Location = require("../models/locationModel");
const User = require("../models/userModel");
exports.buildConnectionRequestPostRepository = async function (
  id,
  req_user_id
) {
  const user = await User.findById(req_user_id);
  // console.log(user);
  if(user){
    let connection = await buildConnection.findOne({
      user_id: id,
      requestUserid: req_user_id,
    });
    if (!connection) {
      const requestConnection = await buildConnection.create({
        requestUserid: req_user_id,
        user_id: id,
      });
  
      return requestConnection;
    } else {
      if (connection.status === "accepted") {
        return "Request has been already accepted";
      }
      if (connection.status === "blocked") {
        return "Request has been already blocked";
      }
      return "Request has already sent ";
    }
  }
  else{
    return "please login or register first to send connection request to user" 
  }
};

exports.buildConnectionAcceptPostRepository = async function (id, req_user_id) {
  const user = await User.findById(req_user_id);
  // console.log(user);
  if(user){
  let connection = await buildConnection.findOne({
    user_id: id,
    requestUserid: req_user_id,
  });
  console.log(connection);
  if (connection.status === "blocked") {
    return "Request has been blocked";
  } else {
    if (connection) {
      if (connection.status === "accepted") {
        return "Request has been already accepted";
      }
      connection.status = "accepted";
     const abc= await buildConnection.findOneAndUpdate(
        { user_id: id, requestUserid: req_user_id },
        connection
      );
      console.log(abc);
      let loc = await Location.findOne({ user_id: id });
      loc.userConnectionId.push(req_user_id);
      console.log(loc);
      await Location.findOneAndUpdate({ user_id: id }, loc);
      return connection;
    }
  }
}
else{
  return "please login or register first to send connection request to user" 
}
};

exports.buildConnectionBlockPostRepository = async function (id, req_user_id) {
  const user = await User.findById(req_user_id);
  // console.log(user);
  if(user){
  let connection = await buildConnection.findOne({
    user_id: id,
    requestUserid: req_user_id,
  });
  if (connection.status === "blocked") {
    return "Request has been already blocked";
  } else {
    if (connection) {
      connection.status = "blocked";
      await buildConnection.findOneAndUpdate(
        { user_id: id, requestUserid: req_user_id },
        connection
      );
      return connection;
    }
  }
}
else{
  return "please login or register first to send connection request to user" 
}
};
