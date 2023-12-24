const User = require("../models/user");
async function handleSignupUser(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/user/login");
}
async function handleLoggedInUser(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect('/')
  } catch (error) {
    res.render("login" ,{
      error : "Incorect Email or password",
    })
  }
}

module.exports = {
  handleSignupUser,
  handleLoggedInUser,
};
