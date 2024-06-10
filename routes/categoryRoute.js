const express = require("express");
const courseController = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(courseController.createCategory); //post request

module.exports = router;
