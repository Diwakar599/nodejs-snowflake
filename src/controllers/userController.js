const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const path = require('path');

exports.showSignupPage = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'view', 'signup.html'));
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirm_password, phone, agree } = req.body;

    if (!name || !email || !password || !confirm_password)
      return res.status(400).send('All required fields must be filled.');

    if (password !== confirm_password)
      return res.status(400).send('Passwords do not match.');

    if (!agree)
      return res.status(400).send('You must agree to the Terms & Privacy Policy.');

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser.length > 0)
      return res.status(400).send('Email already registered.');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    console.log(`✅ New user registered: ${email}`);
    res.status(200).send('Signup successful!');

  } catch (error) {
    console.error('❌ Signup Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
