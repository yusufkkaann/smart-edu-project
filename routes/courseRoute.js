const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.route("/").post(courseController.createCourse); //post request
router.route("/").get(courseController.getAllCourses); //get request
router.route("/:slug").get(courseController.getCourse); // slug'a göre get request

module.exports = router;
