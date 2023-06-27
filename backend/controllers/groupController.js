const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  groupConnectionRepository,
  addGroupMemberRepository,
  getGroupsRepositroy,
  UserlocationGetRepository,
} = require("../repository/groupRepository");
const response = require("../utils/generalResponse");
exports.createGroup = catchAsyncErrors(async (req, res, next) => {
  try {
    const { groupName, groupMembers } = req.body;
    console.log(req.body);
    const group = await groupConnectionRepository(groupName, groupMembers);
    response(group, 200,req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});

exports.addGroupMember = catchAsyncErrors(async (req, res, next) => {
  try {
    const { groupName, groupMember } = req.body;
    console.log(req.body);
    const group = await addGroupMemberRepository(groupName, groupMember);
    response(group, 200,req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});

exports.getGroups = catchAsyncErrors(async (req, res, next) => {
  try {
    const group = await getGroupsRepositroy();
    response(group, 200,req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});

exports.getUserLocation = catchAsyncErrors(async (req, res, next) => {
  try {
    const connectionId = req.params.id;
    const { groupName, groupMember } = req.body;
    // console.log(req.params.id);
    // console.log(connectionId);
    const location = await UserlocationGetRepository(
      groupName,
      groupMember,
      connectionId
    );

    response(location, 200,req, res);
  } catch (err) {
    next(new ErrorHander(err.message, 422));
  }
});
