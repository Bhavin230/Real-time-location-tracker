const express = require("express");
const {createGroup,addGroupMember,getGroups,getUserLocation} = require("../controllers/groupController");
const router = express.Router();


router.route("/createGroup").post(createGroup);
router.route("/addGroupMember").post(addGroupMember);
router.route("/getUserLocation/:id").post(getUserLocation);
router.route("/getGroups").get(getGroups);
module.exports = router;