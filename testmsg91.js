
const http = require('http');

const MSG91_API_KEY = '401712AyNS4UwVVY964b674b5P1';
const OTP_EXPIRY = 2

const otp = generateRandomOTP(); // Implement the function to generate OTP

  
function sendOtp(mobileNumber, otp) {
   const msg91Endpoint = `http://api.msg91.com/api/v5/otp?authkey=${MSG91_API_KEY}&mobile=${mobileNumber}&otp=${otp}&expiry=${OTP_EXPIRY}&invisible=1`;
 
   console.log('sending otp:'+otp+' to mobile:'+mobileNumber+' by using msg91Endpoint:'+msg91Endpoint)
 
   return new Promise((resolve, reject) => {
     http.get(msg91Endpoint, (response) => {
       let data = '';
       
       response.on('data', (chunk) => {
         data += chunk;
       });
 
       response.on('end', () => {
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
 
       response.on('error', (error) => {
         console.error('Error occurred while making the request:', error);
         reject(error);
       });
     });
   });
 }
 
 

// Function to generate a random 6-digit OTP (for demo purposes)
function generateRandomOTP() {
   return Math.floor(100000 + Math.random() * 900000).toString();
 }
/*
   sendOtp('919890841532', '1234')
    .then((response) => {
      res.json({ success: true, message: 'OTP sent successfully' });
    })
    .catch((error) => { //console.error("Error occurred:", error);
    //  res.status(500).json({ success: false, message: 'Failed to send OTP' });

    console.log('error here:'+error)
    }); */


    
const SendOtp = require('sendotp');
    const objsendOtp = new SendOtp(MSG91_API_KEY);
    objsendOtp.send('919890841532', "PRIIND", "4635", function(error, data){
    

      if (error) {
        console.error("Error occurred:", error);
      } else {
        // Check if the response contains an OTP-like message
        if (data.message && data.message.match(/^\d+$/)) {
          // The response is likely an OTP, which indicates an error
          console.error("Error occurred:", data);
        } else {
          // API call was successful, proceed with using the data response
          console.log("Response data:", data);
        }
      }
    
  
    })