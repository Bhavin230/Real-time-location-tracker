const Location = require("../models/locationModel");
const buildConnection = require("../models/buildconnectionModel");
exports.locationPostRepository = async function (id, latitude, longitude) {
  let loc = await Location.findOne({ user_id: id });
  if (!loc) {
    const locationp = await Location.create({
      user_id: id,
      location: {
        coordinate: [{ latitude: latitude, longitude: longitude }],
      },
    });
    return locationp;
  } else {
    loc.location.coordinate[0].latitude = latitude;
    loc.location.coordinate[0].longitude = longitude;
    await Location.findOneAndUpdate({ user_id: id }, loc);
    return loc;
  }
};

exports.locationGetRepository = async function (id) {
  const location = await Location.findOne({ user_id: id });
  // if(location.userConnectionId.includes(connectionid) ){
  //   return location;
  // }
  return location;
  // else{
  //   return "User is invaild";
  // }
};

exports.UserlocationGetRepository = async function (id, connectionid) {
  let connection = await buildConnection.findOne({
    user_id: id,
    requestUserid: connectionid,
  });
  if (connection) {
    if (connection.status === "accepted") {
      const location = await Location.findOne({ user_id: id });
      if (location.userConnectionId.includes(connectionid)) {
        return location.location;
      }
    }
    if (connection.status === "blocked") {
      return "Your Connection Request has been already blocked";
    }
    if (connection.status === "requested") {
      return "Your Connection Request has been already pending";
    }
  } else {
    return "First send connection request to user to access the location of user";
  }
};
