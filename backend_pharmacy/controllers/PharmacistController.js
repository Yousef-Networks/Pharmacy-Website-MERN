

//create a new user
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const Pharmacist = require('../models/PharmacistModel');

const createPharmacist = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      hourly_rate,
      affiliation,
      educational_background,
      Working_license,
      Pharmacy_degree,
    } = req.body;

    const newPharmacist = new Pharmacist({
      username,
      password,
      name,
      email,
      hourly_rate,
      affiliation,
      educational_background,
      Working_license,
      Pharmacy_degree,
    });

    await newPharmacist.save();

    res.status(201).json({ message: 'Pharmacist registered successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while registering the Pharmacist' });
  }
};

const createPharmacist1 = async(req,res) => {
  try {
    // Extract data from the request body
    const {
      username,
      password,
      name,
      email,
      hourly_rate,
      affiliation,
      educational_background,
      Working_license,
      Pharmacy_degree
    } = req.params;

    // Create a new doctor record
    const newPharmacist = new Pharmacist({
      username,
      password,
      name,
      email,
      hourly_rate,
      affiliation,
      educational_background,
      Working_license,
      Pharmacy_degree
    });

    // Save the new doctor to the database
    await newPharmacist.save();

    res.status(201).json({ message: 'Pharmacist registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the pharmacist.' });
  }
};



const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find({}).sort({ createdAt: -1 });

    res.status(200).json(pharmacists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the Pharmacists' });
  }
};



  //const updatepharmacist = async (req, res) => {
  //  const { username } =  req.body;
 
  //  try {
       // Delete the pharmacist with the specified username
  //     const deletedUser = await userModel.findOneAndDelete({ username });
 
  //     if (!deletedUser) {
   //       return res.status(404).json({ message: 'Pharmacist not found' });
   //    }
 
   //    return res.status(200).json({ message: 'Pharmacist deleted successfully' });
   // } catch (error) {
   //    console.error(error);
    //   return res.status(500).json({ error: 'An error occurred while deleting the pharmacist' });
    //}
 //};


  const deletepharmacist = async (req, res) => {
    const { id } =  req.params;
 
    try {
       // Delete the pharmacist with the specified username
       const deletedUser = await Pharmacist.findByIdAndDelete({ _id:id });
 
       if (!deletedUser) {
          return res.status(404).json({ message: 'Pharmacist not found' });
       }
 
       return res.status(200).json({ message: 'Pharmacist deleted successfully' });
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'An error occurred while deleting the pharmacist' });
    }
 };
 const getPharmacistByUsername = async (req, res) => {
  const {username} = req.params;

  try {
      const pharmacist = await Pharmacist.findOne({username : username });

    res.status(200).json(pharmacist);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the Pharmacist' });
  }
};


const updatePasswordPharmacist = async (req, res) => {
try {
  const { username, currentPassword, newPassword } = req.body;
  const pharmacist = await Pharmacist.findOne({ username });

  if (!pharmacist) {
    return res.status(404).json({ message: 'Pharmacist not found' });
  }

  const isMatch = await bcrypt.compare(currentPassword, pharmacist.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid current password' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await Pharmacist.updateOne(
    {
      username: username,
    },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );
  await pharmacist.save();

  res.status(200).json({ message: 'Password updated successfully' });
} catch (error) {
  console.error('Error updating password:', error);
  res.status(500).json({ message: 'Error updating password' });
}
};

module.exports = { createPharmacist, getPharmacists, deletepharmacist, createPharmacist1,getPharmacistByUsername,updatePasswordPharmacist };
