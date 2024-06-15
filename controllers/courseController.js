const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    }); //Course modelinden yeni bir course oluşturduk
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
    const query = req.query.search;

    let filter = {}; //filtreleme işlemi için boş bir obje oluşturduk
    if (query) {
      filter = { name: query };
    }
    if (categorySlug) {
      filter = { category: category._id }; //eğer categorySlug varsa filter objesine category id'sini ekledik
    }
    if (!categorySlug && !query) {
      (filter.name = ""), (filter.category = null);
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("user");
    const user = await User.find();

    //filtrelenmiş course'ları bulduk ve sıraladık
    const categories = await Category.find(); //tüm kategorileri bulduk

    res.status(200).render("courses", {
      courses, //bulunan course'ları courses.ejs sayfasına gönderdik
      categories, //bulunan kategorileri courses.ejs sayfasına gönderdik
      user, //session'daki user'ı courses.ejs sayfasına gönderdik
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
    const user = await User.findOne({ _id: req.session.userID });
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    ); //slug'ı eşleşen course'u bulduk
    //const user = await User.findOne({ _id: course.user }); //course'u oluşturan user'ı bulduk
    const categories = await Category.find(); //tüm kategorileri bulduk
    res.status(200).render("course", {
      categories, //bulunan kategorileri course.ejs sayfasına gönderdik
      course, //bulunan course'u course.ejs sayfasına gönderdik
      page_name: "courses",
      user, //course'u oluşturan user'ı course.ejs sayfasına gönderdik
      //user, //course'u oluşturan user'ı course.ejs sayfasına gönderdik
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);

    // Kullanıcının kurslar dizisinde kursun zaten mevcut olup olmadığını kontrol et
    const courseExists = user.courses.some((course) =>
      course._id.equals(req.body.course_id)
    );

    if (courseExists) {
      // Kurs zaten mevcutsa bir mesaj döndür
      return res.status(400).send("Bu kurs zaten kayıtlı.");
    } else {
      // Kurs mevcut değilse ekle ve kaydet
      user.courses.push({ _id: req.body.course_id });
      await user.save();

      res.status(200).redirect("/users/dashboard");
    }
  } catch (error) {
    console.error(error); // Hata loglaması
    return res.status(500).redirect("/courses");
  }
};
exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    // user.courses.pull({ _id: req.body.course_id });
    // await user.save();
    user.courses = user.courses.filter(
      (course) => !course._id.equals(req.body.course_id)
    );
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).redirect("/courses");
  }
};
