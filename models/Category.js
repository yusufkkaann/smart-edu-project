const { name } = require("ejs");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
});

CategorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
