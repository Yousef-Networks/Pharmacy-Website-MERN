const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
//const {createPatientP,getPatientsP, deletePatientP, addAddress, getAddresses}= require("./controllers/PatientPController")
const cookieParser = require('cookie-parser');
const {createPatientP,getPatientsP, deletePatientP,addToCart,getPatientCart,deleteFromCart,updateCart,updateWallet,getWallet,getPatientByUsername,updatePasswordPatient, addAddress, getAddresses}= require("./controllers/PatientPController")
const {createRequest,getRequests,rejectrequest,acceptrequest}=require("./controllers/requestsController")
const{ addMedicine, getMedicine, deleteMedicine, updateMedicine ,getMedicines}=require("./controllers/MedicineController")
const{createAdmin,getAdmin,getAdminByUsername, updatePasswordAdmin}=require("./controllers/adminController")
const{ createPharmacist, getPharmacists, deletepharmacist,createPharmacist1,getPharmacistByUsername, updatePasswordPharmacist }=require("./controllers/PharmacistController")
const{login,logout, forgetPassword,resetPassword}=require("./controllers/userController")
const{requireAuthPharmacist,requireAuthPatient,requireAuthAdmin}=require("./Middleware/authMiddleware")
const{createOrder,cancelOrder,getPatientOrders}=require("./controllers/orderController")
const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // Replace with your frontend's URL
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//connect to DB
mongoose.connect('mongodb+srv://laylathabet:iwant28.@cluster0.vv8gqjs.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    // listen for req
app.listen(4000,()=>{
    console.log('Connected to DB & listenening on port 4000')
})

})
.catch((error)=>{
    console.log(error)
})

app.post('/register/patient',createPatientP)
app.post("/createRequest",createRequest)
app.get("/getMedicines",getMedicines)
app.post("/addMedicine",requireAuthPharmacist,addMedicine)
app.get("/getMed/:id",getMedicine)
app.put("/updateMed/:id",requireAuthPharmacist,updateMedicine)
app.post("/addAdmin",requireAuthAdmin,createAdmin)
app.get("/getPatients",requireAuthAdmin,getPatientsP)
app.delete("/deletePatient/:id",requireAuthAdmin,deletePatientP)

app.get("/getPharmacist",requireAuthAdmin,getPharmacists)
app.delete("/deletePharmacist/:id",requireAuthAdmin,deletepharmacist)
app.post("/addToCart",requireAuthPatient,addToCart)

app.get("/getRequests",requireAuthAdmin ,getRequests)
app.put("/acceptPRequest/:id",requireAuthAdmin,acceptrequest);
app.put("/rejectPRequest/:id",requireAuthAdmin,rejectrequest);
app.post("/acceptPRequest/:username/:password/:name/:email/:hourly_rate/:affiliation/:educational_background/:Working_license/:Pharmacy_degree",requireAuthAdmin,createPharmacist1)
app.put("/addAddress/:username/:address",requireAuthPatient,addAddress);
app.get("/getAddresses/:username",requireAuthPatient,getAddresses);
app.post('/login', login)
app.get('/logout', logout);
app.get("/getPatientCart/:username",requireAuthPatient,getPatientCart)
app.delete("/deleteFromCart/:username/:medicineId",requireAuthPatient,deleteFromCart)
app.put("/updateCart/:username/:medicineId/:newAmount",requireAuthPatient,updateCart)
app.get("/getPatientByUsername/:username",getPatientByUsername);
app.put("/updatePassPatient",updatePasswordPatient);
app.get("/getPharamcistByUsername/:username",getPharmacistByUsername);
app.put("/updatePassPharmacist",updatePasswordPharmacist);
app.get("/getAdminByUsername/:username",getAdminByUsername);
app.put("/updatePassAdmin",updatePasswordAdmin);
app.post("/createOrder/:username/:statuss/:shippingAddress/:paymentMethod",requireAuthPatient,createOrder);
app.put("/cancelOrder/:orderId",requireAuthPatient,cancelOrder);
app.put ("/updateWallet/:username/:amount",updateWallet);
app.get ("/getWallet/:username",getWallet);
app.get("/getPatientOrders/:username",requireAuthPatient,getPatientOrders);
app.post("/forgetPassword",forgetPassword);
app.post("/resetPassword/:username",resetPassword);
