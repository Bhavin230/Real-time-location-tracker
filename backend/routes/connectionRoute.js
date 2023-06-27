const express = require("express");
const {buildConnectionRequestPost,buildConnectionAcceptPost,buildConnectionBlockPost} = require("../controllers/buildConnectionController");
const router = express.Router();


router.route("/postRequest").post(buildConnectionRequestPost);
router.route("/acceptRequest").post(buildConnectionAcceptPost);
router.route("/blockRequest").post(buildConnectionBlockPost);
// router.route("/location").get(getLocation);
module.exports = router;