const express = require("express");

const app = express();

const port = 3000;

//template engines
app.set("view engine", "ejs");

//middleware
app.use(express.static("public"));
//routes
app.get("/", (req, res) => {
  res.status(200).render("index", { page_name: "index" });
});
app.get("/about", (req, res) => {
  res.status(200).render("about", { page_name: "about" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
