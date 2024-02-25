

const API_KEY = 'HKgCIgvaSDRbJBJREPT7MYPzcMKlkcQMU3AoAI960q44FzEhQatq6WOqPI0U';

const MOBILE_NUMBER = '9890926168'; 
console.log('trying fats2sms npm...............'); console.log('to mobile:'+MOBILE_NUMBER)

const fast2sms = require('fast-two-sms')

  var options = {authorization : API_KEY , message : 'Your OTP is 7777 -nodeAng' ,  numbers : [MOBILE_NUMBER]} 

  process.env.DEBUG = true;

  fast2sms.sendMessage(options) 
  .then((response) => {console.log('successs.......................................')
 
 console.log('wait no seconds for response.........')
 setTimeout(() => {
  console.log('response:');   console.log(response);
 }, 1);
    // Process the response here
  })
  .catch(error => {console.log('error occured:');
    console.error(error);
    // Handle the error here;
  });