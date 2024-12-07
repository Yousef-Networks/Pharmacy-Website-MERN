const jwt = require('jsonwebtoken');

const requireAuthPharmacist = (req, res, next) => {
  const token = req.cookies.token;


    
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        if (decodedToken.role === 'pharmacist') {
          
          next();
        } else {
          res.status(403).json({message:"You are not authorized."})
        }
      }
    });
  } else {
    res.status(401).json({message:"You are not logged in."})
  }
};
const requireAuthPatient = (req, res, next) => {
  const token = req.cookies.token;
  

    
  // check json web token exists & is verified
  if (token) {
 
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
       
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        if (decodedToken.role === 'patient') {
          
          next();
        } else {
          res.status(403).json({message:"You are not authorized."})
        }
      }
    });
  } else {
    res.status(401).json({message:"You are not logged in."})
  }
};
const requireAuthAdmin = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token.role)
    
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        if (decodedToken.role === 'admin') {
          
          next();
        } else {
          res.status(403).json({message:"You are not authorized."})
        }
      }
    });
  } else {
    res.status(401).json({message:"You are not logged in."})
  }
};


module.exports = { requireAuthPharmacist,requireAuthPatient,requireAuthAdmin };
