
  
const http = require('http');

const API_KEY = 'HKgCIgvaSDRbJBJREPT7MYPzcMKlkcQMU3AoAI960q44FzEhQatq6WOqPI0U';

const MOBILE_NUMBER = '9890841532'; 

try {
   // Generate a random 6-digit OTP
   const otp = Math.floor(100000 + Math.random() * 900000);

   console.log('otp:'+otp)

   const postData = JSON.stringify({
     language: 'english',
     route: 'otp',
     numbers: MOBILE_NUMBER,
     message: `Your OTP is ${otp}. Please do not share it with anyone.`,
   });

   const options = {
     hostname: 'www.fast2sms.com',
     port: 80,
     path: '/dev/bulk',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Content-Length': postData.length,
       'authorization': API_KEY,
     }
   };

   return new Promise((resolve, reject) => {
   const request = http.request(options, (response) => { let data = '';
     
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
  

   request.on('error', (error) => {
     console.error('Error sending OTP:', error);
     res.status(500).json({ success: false, message: 'Error sending OTP.' });
   });

   request.write(postData);
   request.end();
});
 } catch (error) {
   console.error('Error sending OTP:', error);
  // res.status(500).json({ success: false, message: 'Error sending OTP.' });
 }
