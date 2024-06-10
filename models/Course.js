const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

// Course Schema oluşturuldu
const CourseSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
});
CourseSchema.pre("validate", function (next) {
  //validate işleminden önce çalışacak fonksiyon
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true }); //name'den slug oluşturduk
  }
  next(); //diğer işlemlere devam et
});
const Course = mongoose.model("Course", CourseSchema); //Course modeli oluşturuldu
module.exports = Course;
