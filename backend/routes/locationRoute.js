const express = require("express");
const {
  postLocation,
  getLocation,
  getUserLocation,
} = require("../controllers/locationController");
const router = express.Router();

router.route("/getLocation").get(getLocation);
router.route("/userLocation/:id").get(getUserLocation);
router.route("/postLocation").post(postLocation);



// router.route("/location").get(getLocation);
module.exports = router;
