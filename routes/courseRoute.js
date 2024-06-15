const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router
  .route("/")
  .post(roleMiddleware(["teacher", "admin"]), courseController.createCourse); //post request
router.route("/").get(courseController.getAllCourses); //get request
router.route("/:slug").get(courseController.getCourse); // slug'a göre get request
router.route("/enroll").post(courseController.enrollCourse); //enroll post request
router.route("/release").post(courseController.releaseCourse); //enroll post request

module.exports = router;
