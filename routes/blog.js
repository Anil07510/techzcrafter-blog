const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const express = require("express");

const Blog = require("../models/blog");
const comment = require("../models/comments");

router.use(express.static(path.resolve("./public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/add-new", upload.single("coverIMG"), async (req, res) => {
  const { title, body } = req.body;
  //console.log(req.user._id);
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.post("/comment/:blogId", async (req, res) => {
  await comment.create({
    content: req.body.content,
    createdBy: req.user._id,
    blogId: req.params.blogId,
  });
  res.redirect(`/blog/${req.params.blogId}`);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const allcomments = await comment.find({ blogId: req.params.id }).populate("createdBy");
  return res.render("singleblog", {
    user: req.user,
    blog,
    allcomments,
  });
});

module.exports = router;
