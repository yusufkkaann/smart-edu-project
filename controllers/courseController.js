const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body); //Course modelinden yeni bir course oluşturduk
    res.status(201).json({
      status: "success",
      course, //oluşturulan course'u json formatında döndük
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(); //tüm course'ları bulduk
    res.status(200).render("courses", {
      courses, //bulunan course'ları courses.ejs sayfasına gönderdik
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }); //slug'ı eşleşen course'u bulduk
    res.status(200).render("course", {
      course, //bulunan course'u course.ejs sayfasına gönderdik
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
