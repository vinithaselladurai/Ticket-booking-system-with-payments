const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP });
  const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXP });
  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, preferences } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, preferences });

    const tokens = generateTokens(user);
    await Token.create({ userId: user._id, token: tokens.refreshToken });

    res.json({ ...tokens, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const tokens = generateTokens(user);
    await Token.create({ userId: user._id, token: tokens.refreshToken });

    res.json({ ...tokens, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'No token' });

    const dbToken = await Token.findOne({ token });
    if (!dbToken) return res.status(403).json({ message: 'Invalid token' });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
      if (err) return res.status(403).json({ message: 'Token expired' });
      await Token.deleteOne({ token });

      const dbUser = await User.findById(user.id);
      const tokens = generateTokens(dbUser);
      await Token.create({ userId: dbUser._id, token: tokens.refreshToken });

      res.json(tokens);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { token } = req.body;
    await Token.deleteOne({ token });
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
