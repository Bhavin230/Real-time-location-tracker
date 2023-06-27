const Group = require("../models/groupModel");
const Location = require("../models/locationModel");
exports.groupConnectionRepository = async function (groupName, groupMembers) {
  const groupc = await Group.create({
    groupName: groupName,
    groupMembers: groupMembers,
  });
  return groupc;
};

exports.addGroupMemberRepository = async function (groupName, groupMember) {
  let gru = await Group.findOne({ groupName: groupName });
  gru.groupMembers.push(groupMember);
  await Group.findOneAndUpdate({ groupName: groupName }, gru);
  return gru;
};

exports.getGroupsRepositroy = async function () {
  let gru = await Group.find();
  return gru;
};

exports.UserlocationGetRepository = async function (
  groupName,
  groupMember,
  connectionid
) {
  let gru = await Group.findOne({ groupName: groupName });
  if (gru.groupMembers.includes(groupMember)) {
    if (gru.groupMembers.includes(connectionid)) {
      const location = await Location.findOne({ user_id: groupMember });
      return location;
    } else {
      return "User is invaild";
    }
  } else {
    return "Plese enter your Id right";
  }
};
