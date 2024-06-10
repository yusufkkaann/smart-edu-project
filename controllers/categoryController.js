const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body); //category modelinden yeni bir category oluşturduk
    res.status(201).json({
      status: "success",
      category, //oluşturulan course'u json formatında döndük
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
