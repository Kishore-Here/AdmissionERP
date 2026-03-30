import User from "../models/users.js";


// 🔥 SIGNUP
export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, role });

    res.json({
      message: "Signup successful",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔥 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login success",
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};