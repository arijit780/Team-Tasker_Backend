const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePhoto: {
    type: String,
    default: 'default.jpg', // Default profile photo filename or URL
  },
  password: {
    type: String,
    required: true
  },
  assignedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification'
  }],
  // Add any other fields you need for the User model

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
