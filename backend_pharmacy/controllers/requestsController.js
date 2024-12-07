const multer = require('multer');
const path = require('path');
const Request = require('../models/requestsModel');

// Define storage for the uploaded files
const storage = multer.memoryStorage();

// Create an instance of Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb('Error: Only PDF files are allowed.');
  },
}).fields([
  { name: 'workingLicense', maxCount: 1 },
  { name: 'pharmacistDegree', maxCount: 1 },
  { name: 'pharmacistId', maxCount: 1 },
]);

const createRequest = async (req, res) => {
  try {
    // Call the Multer middleware to handle file uploads
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      // Extract request data from the request body
      const {
        username,
        name,
        email,
        password,
        hourly_rate,
        affiliation,
        educational_background,
        date_of_birth,
      } = req.body;

      // Access the uploaded files from req.files
      const workingLicenseFile = req.files.workingLicense[0];
      const pharmacistDegreeFile = req.files.pharmacistDegree[0];
      const pharmacistIdFile = req.files.pharmacistId[0];

      // Create a new request object
      const request = new Request({
        username,
        name,
        email,
        password,
        hourly_rate,
        affiliation,
        educational_background,
        date_of_birth,
        workingLicense: {
          data: workingLicenseFile.buffer,
          contentType: workingLicenseFile.mimetype,
        },
        pharmacistDegree: {
          data: pharmacistDegreeFile.buffer,
          contentType: pharmacistDegreeFile.mimetype,
        },
        pharmacistId: {
          data: pharmacistIdFile.buffer,
          contentType: pharmacistIdFile.mimetype,
        },
      });

      // Save the request to the database
      await request.save();

      // Respond with a success message
      res.status(201).json({ message: 'Pharmacist registration request submitted successfully.' });
    });
  } catch (error) {
    console.error('Error submitting pharmacist registration request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createRequest };

const getRequests = async (req, res) => {
  try {
    const pharmacists = await Request.find({}).sort({ createdAt: -1 });

    res.status(200).json(pharmacists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the Pharmacists' });
  }
};

const rejectrequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Finds the request by ID and updates the status to "rejected"
    const updatedRequest = await Request.findByIdAndUpdate(
      { _id: id },
      { statuss: 'rejected' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request rejected successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rejecting the request.' });
  }
};

const acceptrequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Finds the request by ID and updates the status to "rejected"
    const updatedRequest = await Request.findByIdAndUpdate(
      { _id: id },
      { statuss: 'accepted' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request rejected successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rejecting the request.' });
  }
};

module.exports = { createRequest ,getRequests,rejectrequest,acceptrequest};







