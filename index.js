require('dotenv').config()
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Blog = require('./models/blog')

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const connectToMongoDb = require("./connection");
const {
  checkForAuthenticationCookies,
} = require("./middleware/authentication");

const app = express();
const PORT = 8001;

connectToMongoDb(process.env.Mongo_URL).then(() => {
  console.log(`mongodb connected !`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')))

app.use(checkForAuthenticationCookies("token"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  console.log(allBlogs)
  res.render("home", {
    user: req.user,
    blogs : allBlogs,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
