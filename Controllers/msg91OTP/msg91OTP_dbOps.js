const http = require('http');

const SendOtp = require('sendotp');

const MSG91_API_KEY = '401712AyNS4UwVVY964b674b5P1abcd';
const OTP_EXPIRY = 2 // 10; // OTP expiry time in minutes

// Function to send OTP using Msg91 OTP API
/* function sendOtp(mobileNumber, otp) {
  const msg91Endpoint = `http://api.msg91.com/api/v5/otp?authkey=${MSG91_API_KEY}&mobile=${mobileNumber}&otp=${otp}&expiry=${OTP_EXPIRY}&invisible=1`;
                      //http://api.msg91.com/api/v5/otp?authkey=YOUR_MSG91_API_KEY&mobile=MOBILE_NUMBER&otp=OTP_VALUE&expiry=OTP_EXPIRY_TIME&invisible=1

  
  console.log('sending .... OTP to mobilemuber:'); 
  console.log(mobileNumber); console.log(' and otp is:'+otp); 
  console.log('msg91Endpoint is:'+msg91Endpoint)
  
  return new Promise((resolve, reject) => {
    http.get(msg91Endpoint, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const result = JSON.parse(data);
        resolve(result);
      });

      response.on('error', (error) => { console.log('someerror / problem occured')
        reject(error);
      });
    });
  });
} */


/* 
function sendOtp(mobileNumber, otp) {
  const msg91Endpoint = `http://api.msg91.com/api/v5/otp?authkey=${MSG91_API_KEY}&mobile=${mobileNumber}&otp=${otp}&expiry=${OTP_EXPIRY}&invisible=1`;

  return new Promise((resolve, reject) => {
    http.get(msg91Endpoint, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          console.error('Error parsing JSON data:', error);
          console.log('Response data:', data);
          reject(error);
        }
      });

      response.on('error', (error) => {
        console.error('Error occurred while making the request:', error);
        reject(error);
      });
    });
  });
} */


function sendOtp(mobileNumber, otp) {
  const msg91Endpoint = `https://api.msg91.com/api/v5/otp?authkey=${MSG91_API_KEY}&mobile=${mobileNumber}&otp=${otp}&expiry=${OTP_EXPIRY}&invisible=1`;

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

var sendotp=async (req,res)=>{ 
  const { phoneNumber } = req.body;

  const otp = generateRandomOTP(); // Implement the function to generate OTP

  sendOtp(phoneNumber, otp)
    .then((response) => {
      res.json({ success: true, message: 'OTP sent successfully' });
    })
    .catch((error) => { //console.error("Error occurred:", error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    });

   /*  const sendOtp = new SendOtp(MSG91_API_KEY);
    sendOtp.send(phoneNumber, "PRIIND", "4635", function(error, data){
    

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
    
  
    }) */

}


//----------------------------------------------
 module.exports={sendotp}