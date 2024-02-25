const http = require('http');
const queryString = require('querystring');
var TextLocalSMS = require('./TextLocalSMS');

const API_KEY = 'NGY2YjczNjc0YjdhNjQ2NDUwMzQzNjcxNmQ3YTYxMzk=';
const OTP_EXPIRY = 10; // OTP validity in minutes

function generateOTP() {
   // Function to generate a random 6-digit OTP
   return Math.floor(100000 + Math.random() * 900000).toString();
 }
 
function sendOtp(req,res,mobileNumber) {
   console.log(' running.........................')
  // const mobileNumber = req.body.mobileNumber;
   const message = `Your OTP is 1234 (valid for ${OTP_EXPIRY} minutes)`;
 
   const postData = queryString.stringify({
     apikey: API_KEY,
     numbers: mobileNumber,
     message: message
   });
 
   const options = {
     hostname: 'api.textlocal.in',
     path: '/send',
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Length': postData.length
     }
   };
 
   
   return new Promise((resolve, reject) => {
   const otpRequest = http.request(options, (otpResponse) => {
     let data = '';
 
     otpResponse.on('data', (chunk) => {
       data += chunk;
     });
 
     otpResponse.on('end', () => {
      // Check if the response data is not empty
      if (data) {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          console.error('Error parsing JSON data:', error);
          console.log('Response data:', data);
          reject(error);
        }
      } else {
        console.error('Empty response data received from the API');
        reject(new Error('Empty response data'));
      }
    });

   otpRequest.on('error', (error) => {
     console.error('Error sending OTP:', error);
     res.status(500).json({ error: 'Error sending OTP' });
   });
 
   otpRequest.write(postData);
   otpRequest.end();
});

})

}


var sendotp=async(req,res)=>{

  
const mobileNumber = '9503999675'; // Replace with the recipient's mobile number
//const otp = '123456'; // Replace with the OTP you want to send

//sendOtp(req,res,mobileNumber)
  /* .then((response) => {
    console.log('OTP sent successfully:', response);
  })
  .catch((error) => {
    console.error('Error sending OTP:', error.message);
  }); */


  let otp = Math.floor(100000 + Math.random() * 900000);
     let text_msg = `MyWebsite.com -  OTP : ${otp} for reset your account password .`;
     let toNumbers = ['+9198090841532'];
     let smsService = new TextLocalSMS();
     let smsSent = await smsService.sendSMS(toNumbers,text_msg);

     // database query to store OTP with user_id in your database if otp successfully send to user 
     // ...


     return res.json(smsSent);

}
module.exports = { sendOtp , sendotp};
