const PatientP = require('../models/PatientPModel');
const Medicine = require('../models/MedicineModel');


const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const createPatientP = async(req,res) => {
   try{ const {
        username,
        name,
        email,
        password,
        wallet,
        date_of_birth,
        gender,
        mobile_number,
        emergency_contact,
        address
        
      } = req.body;
      const newPatientP = new PatientP({
        username,
        password,
        name,
        email,
        wallet,
        date_of_birth,
        gender,
        mobile_number,
        emergency_contact,
        address

      });
      await newPatientP.save();

    res.status(201).json({ message: 'Pharmacy Patient registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the Patient' });
  }
};

const getPatientsP=async(req,res) =>{
  const patients =await PatientP.find({}).sort({createdAt:-1});
      for(let index=0;index<patients.length;index++){
         const element = [patients][index];
         //console.log(element.id);
      }
      res.status(200).json(patients)
};

const getPatientP = async (req, res) => {
    const {username} = req.body;

    try {
        const patient = await PatientP.findOne({username : username });
  
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the Patient' });
    }
  };

  const addAddress = async (req, res) => {
    const { username, address } = req.params;
  
    try {
      const updatedPatient = await PatientP.findOneAndUpdate(
        { username: username },
        { $push: { address: address } },
        { new: true, useFindAndModify: false }
      );
  
      if (!updatedPatient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      return res.status(200).json(updatedPatient);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while adding the address' });
    }
  };

  const deletePatientP = async (req, res) => {
    const { id } = req.params;
 
    try {
       // Delete the pharmacist with the specified username
       const deletedUser = await PatientP.findByIdAndDelete({ _id:id });
 
       if (!deletedUser) {
          return res.status(404).json({ message: 'Patient not found' });
       }
 
       return res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'An error occurred while deleting the Patient' });
    }
 };
 const addToCart = async (req, res) => {
  const { username, medicineId, amount } = req.body;
  

  try {
    const patient = await PatientP.findOne({ username });
    const medicine = await Medicine.findById(medicineId);

    if (!patient || !medicine) {
      return res.status(404).json({ message: 'Patient or medicine not found' });
    }
    const cartItemIndex = patient.cart.findIndex(item => item.medicine_id.toString() === medicineId);
    if (cartItemIndex > -1) {
      // Medicine already exists in the cart, increment the amount
      patient.cart[cartItemIndex].quantity += amount;
    } else {
      // Medicine does not exist in the cart, add a new item
      const cartItem = {
        medicine_id: medicineId,
        quantity: amount,
        medicineName:medicine.name,
        price: medicine.price,
      };

      patient.cart.push(cartItem);
    }

    await patient.save();

    res.status(200).json({ message: 'Medicine added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the medicine to the cart' });
  }
};
  

  
const getPatientCart = async (req, res) => {
  const { username } = req.params;

  try {
    const patient = await PatientP.findOne({ username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the patient\'s cart' });
  }
};


const getAddresses = async (req, res) => {
  const { username } = req.params;

  try {
    const patient = await PatientP.findOne({ username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json(patient.address);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while getting the addresses' });
  }
};
const getWallet = async (req, res) => {
  const { username } = req.params;

  try {
    const patient = await PatientP.findOne({ username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json(patient.wallet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while getting the wallet' });
  }
};



const updateWallet = async (req, res) => {
  const { username, amount } = req.params;

  try {
    // Fetch the user from the database
    const user = await PatientP.findOne({ username });

    // Check if the user's wallet has enough funds
    if (user.wallet < amount) {
      return res.status(400).json({ error: 'Insufficient funds in wallet' });
    }

    // Subtract the amount from the user's wallet
    user.wallet -= amount;

    // Save the updated user to the database
    await user.save();

    // Send a success response
    res.json({ message: 'Wallet updated successfully', wallet: user.wallet });
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: 'An error occurred while updating the wallet' });
  }
};

const deleteFromCart = async (req, res) => {
  const { username,medicineId } = req.params;

  try {
    const patient = await PatientP.findOneAndUpdate(
      { username },
      { $pull: { cart: { medicine_id: medicineId } } },
      { new: true }
    );
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    

    res.status(200).json(patient.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the item from the cart' });
  }
};
const updateCart = async (req, res) => {
  const { username, medicineId, newAmount } = req.params;

  try {
    const patient = await PatientP.findOne({ username });
    

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const item = patient.cart.find(item => item.medicine_id.toString() === medicineId);
    if (!item) {
      return res.status(404).json({ message: 'Medicine not found in cart' });
    }


    if (newAmount == 0) {
      const index = patient.cart.indexOf(item);
      patient.cart.splice(index, 1);
    } else {
      item.quantity = newAmount;
    }

    await patient.save();

    res.status(200).json(patient.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the cart' });
  }
};
 const getPatientByUsername = async (req, res) => {
  const { username } = req.params; // Get the username from the URL parameter
  try {
    // Find the admin by username
    const patient = await PatientP.findOne({ username:username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePasswordPatient = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    const patient = await PatientP.findOne({ username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, patient.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await PatientP.updateOne(
      {
        username: username,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    await patient.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password' });

  }
};

module.exports={createPatientP, getPatientsP, deletePatientP, getPatientP,addToCart,getPatientCart,deleteFromCart,updateCart,getPatientByUsername,updatePasswordPatient,addAddress,getAddresses,updateWallet,getWallet};
