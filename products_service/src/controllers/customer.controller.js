const { authService } = require("../services/auth.service");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await authService.findByEmail(email);
    console.log(userExist);
    if (userExist)
      return res
        .status(400)
        .json({ message: "user already exist, please log in" });
    const user = await authService.addCustomers(email, password);
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.findByEmail(email);
    if (!user) return res.status(400).json({ message: "user does not exist" });

    const confirmPwd = password === user.password;
    if (!confirmPwd)
      return res.status(400).json({ message: "Invalid Credentials" });

    return res.status(200).json({ message: "user logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
