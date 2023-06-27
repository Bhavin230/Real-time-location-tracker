const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  buildConnectionRequestPostRepository,
  buildConnectionAcceptPostRepository,
  buildConnectionBlockPostRepository,
} = require("../repository/buildConnectionRepository");
const response = require("../utils/generalResponse");
const { sendEmailRepository } = require("../repository/sendEmailRepository");
const sendEamil = require("../utils/sendEmail");
exports.buildConnectionRequestPost = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { requestUserid } = req.body;
      const connection = await buildConnectionRequestPostRepository(
        req.user._id,
        requestUserid
      );
     if(typeof(connection) == "object"){
        const mail = await sendEmailRepository(req.user._id, requestUserid);

        const message = `UserId : ${requestUserid} send connection request for building connection with you`;
       await sendEamil({
          email: mail,
          subject: `Location tracker connection`,
          message,
        });
    }
      response(connection, 200, req, res);
    } catch (err) {
      next(new ErrorHander(err.message, 422));
    }
  }
);

exports.buildConnectionAcceptPost = catchAsyncErrors(async (req, res, next) => {
  try {
    const { requestUserid } = req.body;
    const connection = await buildConnectionAcceptPostRepository(
      req.user._id,
      requestUserid
    );
    // console.log(connection);
    response(connection, 200, req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});

exports.buildConnectionBlockPost = catchAsyncErrors(async (req, res, next) => {
  try {
    const { requestUserid } = req.body;
    const connection = await buildConnectionBlockPostRepository(
      req.user._id,
      requestUserid
    );
    response(connection, 200, req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});
