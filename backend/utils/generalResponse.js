const sendToken = require("./jwtToken");
const url = require("url");
const response =async (user, statusCode,req, res) => { 
    var url_parts = url.parse(req.url);
    const tokenPaths = ["/register", "/login"];
    if (tokenPaths.includes(url_parts.pathname)) {
        const token = await sendToken(user);
        res.status(statusCode).json({
          success: true,
          user,
          token,
        });
    }  
    else{
        res.status(200).json({
            success: true,
            user,
          });
    }
  };
  
  module.exports = response;
  