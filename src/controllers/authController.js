const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const path = require('path');

exports.showLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'view', 'login.html'));
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send('Email and password are required.');

    // Find user by email
    const users = await User.findByEmail(email);
    if (users.length === 0)
      return res.status(400).send('User not found.');

    const user = users[0];

    // Compare password
    const match = await bcrypt.compare(password, user.PASSWORD);
    if (!match)
      return res.status(401).send('Invalid password.');

    console.log(`✅ User logged in: ${email}`);
    res.status(200).send('Login successful!');
  } catch (error) {
    console.error('❌ Login Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};
