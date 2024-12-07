
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PatientPSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet:{
    default:0,
    type:Number
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender:{
    type: String,
    required: false,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  emergency_contact: {
    full_name: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    relation_to_patient: {
      type: String,
      required: true,
    } 
  },
  address: {
    type: [String],
    required: false,
  },
  cart:[{
    medicine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
    },
    quantity: {
      type: Number,
      required: false,
    },
    medicineName: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    }
    
  }],
  passwordReset: {
    type: String,
  }
});

// Hash the password before saving to the database
PatientPSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const saltRounds = 10; // Salt rounds for bcrypt
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const PatientP = mongoose.model('PatientP', PatientPSchema);

module.exports = PatientP;