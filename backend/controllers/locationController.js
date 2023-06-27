const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  locationPostRepository,
  locationGetRepository,
  UserlocationGetRepository,
} = require("../repository/locationRepository");
const response = require("../utils/generalResponse");
exports.postLocation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const location = await locationPostRepository(
      req.user._id,
      latitude,
      longitude
    );
    response(location, 200,req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});

exports.getLocation = catchAsyncErrors(async (req, res, next) => {
  try {
    const location = await locationGetRepository(req.user._id);
    response(location, 200,req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});

exports.getUserLocation = catchAsyncErrors(async (req, res, next) => {
  try {
  
    const  connectionId  = req.params.id;
    // console.log(req.params.id);
    // console.log(connectionId);
    const location = await UserlocationGetRepository(req.user._id, connectionId);
   
    response(location, 200,req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});
