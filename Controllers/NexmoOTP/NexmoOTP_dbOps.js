
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'a795a2e9',
  apiSecret: 'ZUtCrULQopxzzbo4',
});
function sendOtp(phoneNumber) {
   //v
//   const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
   const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
 
   nexmo.message.sendSms(
     '9890841532',//'YOUR_VIRTUAL_NUMBER',
     phoneNumber,
     `Your OTP is: ${otp}`,
     { type: 'unicode' },
     (err, responseData) => {
       if (err) {
         console.error(err);
       } else {
         console.log(responseData);
       }
     }
   );
 }
 

var sendotp=async (req,res)=>{ 

   console.log('senddddddddddddddddddddddddddddddddddddddddd otp to:'+req.body.phoneNumber)
   const { phoneNumber } = req.body;

   sendOtp(phoneNumber);
 
   res.json({ message: 'OTP sent successfully' });

}


//----------------------------------------------
 module.exports={sendotp}