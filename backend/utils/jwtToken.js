// Create Token and saving in cookie

const sendToken = (user) => {
  const token = user.getJWTToken();

  // options for cookie
 
    return token;
 
};

module.exports = sendToken;
