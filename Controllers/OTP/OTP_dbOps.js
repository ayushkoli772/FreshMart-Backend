var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');
const twilio = require('twilio');
const accountSid = 'AC396b23de230c44318fe5c8f456e8eb4f';
const authToken = '8681443534c1260066bec0106d38bcd5';
const client = twilio(accountSid, authToken);


var sendotp=async (req,res)=>{ 
  const { phoneNumber } = req.body; // Get the recipient's phone number from the request body

  client.messages
    .create({
      body: 'Your OTP is 123456', // Replace with the actual OTP
      from: '9890841532', // Replace with your Twilio phone number
      to: phoneNumber
    })
    .then(message => {
      console.log('OTP sent successfully');
      res.status(200).json({ message: 'OTP sent successfully' });
    })
    .catch(error => {
      console.error('Failed to send OTP');
      console.error(error);
      res.status(500).json({ error: 'Failed to send OTP' });
    });


}


//----------------------------------------------
 module.exports={sendotp}