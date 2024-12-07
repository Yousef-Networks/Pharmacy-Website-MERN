const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
    password: {
        type: String,
        required: true,
      },
      passwordReset: {
        type: String,
      }
    });
    // Hash the password before saving to the database

  
  const Admin = mongoose.model('Admin', adminSchema);
  
  module.exports = Admin;