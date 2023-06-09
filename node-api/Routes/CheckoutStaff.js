const express = require("express");

const router = express.Router();
const { spawn } = require('child_process');
const { IsCheckOut, CheckOutStaff } = require("../Controllers/Staff/CheckoutStaff");


const opencamera =  (req, res, next) => {
    const pythonProcess = spawn('python', ['add_face.py']);
  
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python script output: ${data}`);
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script error: ${data}`);
    });
  
    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      res.send(`Python script exited with code ${code}`);
      next();
    });

    

}
// POST /
router.post("/", IsCheckOut, CheckOutStaff);

module.exports = router;
