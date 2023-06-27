const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { authSchema } = require("../validator/registerValidator");
const { authschemalogin } = require("../validator/loginValidator");
const {
  registerRepository,
  loginRepository,
  getUserDetailsRepository,
  getAllUserRepository,
} = require("../repository/userRepository");
const response = require("../utils/generalResponse");
// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const value = await authSchema.validateAsync(req.body);
    const { name, email, password } = req.body;
    const user = await registerRepository(name, email, password);
    response(user, 201, req,res);
  } catch (err) {
    // response(err.message, 201, req,res);
    next(new ErrorHander(err.message, 422));
  }
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const value = await authschemalogin.validateAsync(req.body);
    const { email, password } = req.body;
    const user = await loginRepository(email, password);
    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }

    response(user, 200,req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  response("Logged Out",200,req,res);
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await getUserDetailsRepository(req.user._id);
    response(user,200,req,res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await getAllUserRepository();
  response(users,200,req,res);
  // res.status(200).json({
  //   success: true,
  //   users,
  // });
});
