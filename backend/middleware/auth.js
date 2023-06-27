const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const url = require("url");
const { authRepository } = require("../repository/userRepository");
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  try {
    var url_parts = url.parse(req.url);
    // console.log(url_parts.pathname);
    // console.log(req.path);
    const nonSecurePaths = ["/api/v1/register", "/api/v1/login"];
    if (nonSecurePaths.includes(url_parts.pathname)) {
      return next();
    } else {
      var token;
      const  authHeader  = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
      }

      if (!token) {
        return next(
          new ErrorHander("Please Login to access this resource", 401)
        );
      }

      const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await authRepository(decodedData.id);
      next();
    }
  } catch (err) {
    return next(new ErrorHander(err.message, 401));
  }
});
