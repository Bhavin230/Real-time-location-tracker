const User = require("../models/userModel");
exports.registerRepository = async function (name, email, password) {
  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

exports.loginRepository = async function (email, password) {
  const user = await User.findOne({ email }).select("+password");
  return user;
};

exports.authRepository = async function (Data) {
  const user = await User.findById(Data);
  return user;
};

// Get User Detail
exports.getUserDetailsRepository = async function (id) {
  const user = await User.findById(id);
  return user;
};

// Get all users(
exports.getAllUserRepository = async function () {
  const users = await User.find();
  return users;
};

// Get single user
// exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(
//       new ErrorHander(`User does not exist with Id: ${req.params.id}`)
//     );
//   }

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });
