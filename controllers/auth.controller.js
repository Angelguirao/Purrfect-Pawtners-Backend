const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Handle user signup
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body; // Destructure the payload
    
    // Hash the password
    const salt = bcrypt.genSaltSync(13);
    const passwordHash = bcrypt.hashSync(password, salt);
    
    // Create a new user
    await User.create({ name: username, email, password: passwordHash });
    
    // Send success response
    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ errorMessage: 'Unable to create user' });
  }
};

// Handle user login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Destructure the payload
    
    // Find the user by email
    const potentialUser = await User.findOne({ email });
    if (!potentialUser) return res.status(403).json({ errorMessage: 'No user found' });
    
    // Compare the provided password with the stored hash
    const doPasswordsMatch = bcrypt.compareSync(password, potentialUser.password);
    if (!doPasswordsMatch) return res.status(403).json({ errorMessage: 'Password invalid' });
    
    // Generate JWT token
    const authToken = jwt.sign({ userId: potentialUser._id }, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '6h',
    });
    
    // Send success response with the token
    return res.status(202).json({ token: authToken });
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ errorMessage: 'Unable to login' });
  }
};

// Verify JWT token and return the current user
exports.verify = async (req, res, next) => {
  try {
    // Find the user by ID and populate related fields
    const currentUser = await User.findById(req.payload.userId)
      .populate('articles')
      .populate("cat")
      .populate("house")
      .populate("comments")
      .exec();
    
    // Mask the password in the response
    currentUser.password = '****';
    
    // Send success response with the current user
    return res.status(200).json({ message: 'Token is valid', currentUser });
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ errorMessage: 'Unable to verify token' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res, next) => {
  try {
    // Find the user by ID and populate related fields
    const user = await User.findById(req.params.id)
      .populate('articles')
      .populate("cat")
      .populate("house")
      .populate("comments");
    
    // Send success response with the user
    return res.status(200).json(user);
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ errorMessage: 'Unable to get user' });
  }
};
