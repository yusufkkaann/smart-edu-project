const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body); //Course modelinden yeni bir course oluşturduk
    res.status(201).redirect("/courses"); //oluşturulan course'u courses sayfasına yönlendirdik
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.category; //category query'sini aldık
    const category = await Category.findOne({ slug: categorySlug }); //categorySlug'ı eşleşen category'yi bulduk
    let filter = {}; //filtreleme işlemi için boş bir obje oluşturduk
    if (categorySlug) {
      filter = { category: category._id }; //eğer categorySlug varsa filter objesine category id'sini ekledik
    }

    const courses = await Course.find(filter).sort("-createdAt"); //tüm course'ları bulduk
    const categories = await Category.find(); //tüm kategorileri bulduk
    res.status(200).render("courses", {
      courses, //bulunan course'ları courses.ejs sayfasına gönderdik
      categories, //bulunan kategorileri courses.ejs sayfasına gönderdik
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
    const categories = await Category.find(); //tüm kategorileri bulduk
    res.status(200).render("course", {
      categories, //bulunan kategorileri course.ejs sayfasına gönderdik
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
