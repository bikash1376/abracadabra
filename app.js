require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

const PORT = process.env.PORT || 3000; // Use PORT from environment variable or default to 3000

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
    let users = await userModel.find();
    res.render("read", { users });
});

app.get("/edit/:id", async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.id });
    res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
    let { name, blogtitle, image, blog } = req.body
    let user = await userModel.findOneAndUpdate({ _id: req.params.id }, { name, blogtitle, image, blog }, {new: true})
    res.redirect("/read");
});

app.get('/about/:id', async (req, res) => {
  let aboutUser = await userModel.findOne({ _id: req.params.id });
  res.render("about", { aboutUser });
})


app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, blogtitle, image, blog } = req.body;

  let createdUser = await userModel.create({
    name,
    blogtitle,
    image,
    blog
  });

  res.redirect("/read");
});


app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
