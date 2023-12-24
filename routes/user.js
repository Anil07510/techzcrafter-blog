const { handleLoggedInUser, handleSignupUser } = require("../controllers/user");

const router = require("express").Router();

router.post("/signup", handleSignupUser);

router.post("/login", handleLoggedInUser);

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});
router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/user/login");
});

module.exports = router;
