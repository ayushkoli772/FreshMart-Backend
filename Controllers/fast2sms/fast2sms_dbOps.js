var sql = require('mssql');

var sqlConfigFile=require('../../Connections/sqlConfig');
const bcrypt = require('bcrypt');
var Utilities=require('../../Utilities/Utilities');
  // Import required modules
  const usermgt_dbOps = require('../usermgt/usermgt_dbOps'); // Make sure the path is correct
const config = require('../../config');
const http = require('http');
//const SendOtp = require('sendotp');

const API_KEY = 'HKgCIgvaSDRbJBJREPT7MYPzcMKlkcQMU3AoAI960q44FzEhQatq6WOqPI0U';
//const MOBILE_NUMBER = '9890841532'; 
//const OTP_EXPIRY = 2 // 10; // OTP expiry time in minutes

/* 
var sendotp=async (req,res)=>{ 
  // console.log('req body:'+  JSON.stringify(req.body));

   const { mobileNumber } = req.body;

  try {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log('otp:'+otp)

    const postData = JSON.stringify({
      language: 'english',
      route: 'otp',
      numbers: mobileNumber,
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
        'authorization': 'cF7Uq1TiX0YPnzbHpufvRhNSGxydlKIDjkCZo4JLs69rAgtwOek5poQMJRE49tsyHnVXgmuBIjw2Kxv7',
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
   });

    request.on('error', (error) => {
      console.error('Error sending OTP:', error);
      res.status(500).json({ success: false, message: 'Error sending OTP.' });
    });

    request.write(postData);
    request.end();

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Error sending OTP.' });
  }


} */


// Function to generate a random 6-digit OTP (for demo purposes)
function generateRandomOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

var sendotpORregister=async(req,res)=>{
  if (req.params.id=='sendotp')
  {
      sendotpWithPackage(req,res);
  }
  else if (req.params.id=='register'){
  //register(req,res);
  EditUser(req,res);
  //console.log('m planning to to register......');
  //console.log(req.body.userid + ' for role:' + obj.userrole + ' with password:' + obj.password);
    //  console.log('req.body for planning register:'+JSON.stringify(req.body))
  }
}

            var sendotpWithPackage=async (req,res)=>{
              
              const { obj } = req.body;
            console.log('trying fats2sms npm...............'); console.log('to mobile:'+obj.mobileNumber)

              const fast2sms = require('fast-two-sms')

              var otp_generated=generateRandomOTP();
              
              //static otp//              otp_generated='0102';

              console.log('otp_generated:'+otp_generated)
                var options = {authorization : API_KEY , message : otp_generated ,  numbers : [obj.mobileNumber]} 

                process.env.DEBUG = true;

                //pls uncomment below line
                //its commented as we dont want to waste sms for testing
                

                ///////////////////////////////////////////////////////////////////////////
                fast2sms.sendMessage(options) 
                .then(response => {
                    console.log('response:');   console.log(response);
                      res.json({ success: true, message: 'OTP sent to new customer to sign in', otp_which_sent_to_customer:otp_generated });
                    })
                .catch(error => {console.log('error occured:');
                  console.error(error);
                    }); 
                    ///////////////////////////////////////////////////////////////////////////
                     
                    res.json({ success: true, message: 'OTP sent to new customer to sign in', otp_which_sent_to_customer:otp_generated });

            }

            
        

            // ... Other code ...
            
            var register_preserve = async (req, res) => {

              const { obj } = req.body;
              Utilities.logError('trySignup','userid',obj.id)

              console.log('m registering u now......');
              console.log(obj.userid + ' for role:' + obj.userrole + ' with password:' + obj.password);
            
              try {
                // Prepare the data to send in the request body
                const postData = JSON.stringify({
                  id:obj.id,
                  userid: obj.userid,
                  display_name: obj.display_name,
                  password: obj.password,
                  userrole: obj.userrole,
                  IsActive: obj.IsActive,
                  firm_name: '',
                  firm_addr: '',
                  CREATEDBY_username: 'self',
                  supplier_id: ''
                });
            
                // Detect the hostname from the req object
  const hostname = req.get('host').split(':')[0]; 
  Utilities.logError('trySignup','hostname is',hostname)
  // Get the port number from the configuration file

  const port = process.env.PORT;//config.port;
  Utilities.logError('trySignup','port',port)
            
                // Set the request options             
                   const options = {
                  hostname: hostname,
                  port: port,
                  path: '/api/usermgt/' + obj.id,
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length
                  }
                };
            
                // Make the HTTP PUT request
                const request = http.request(options, (response) => {
                  let data = '';
            
                  response.on('data', (chunk) => {
                    data += chunk;
                  });
            
                  response.on('end', () => {
                    console.log('Response from usermgt controller:', data);
                    Utilities.logError('trySignup','Response from usermgt controller:',data)
                    res.json({ success: true, message: 'User registered successfully' });
                  });
            
                  response.on('error', (error) => {
                    console.error('Error registering user:', error);
                    Utilities.logError('trySignup','Error registering user::',error)
                    res.status(500).json({ success: false, message: 'Error registering user' });
                  });
                });
            
                request.on('error', (error) => {
                  console.error('Error registering user:', error);
                  res.status(500).json({ success: false, message: 'Error registering user' });
                });
            
                // Write the request body data and end the request
                request.write(postData);
                request.end();
              } catch (error) {
                console.error('Error registering user:', error);
                console.error('Error registering user while call PUT request:', error);
                res.status(500).json({ success: false, message: 'Error registering user' });
              }
            };
            

          

var register = async (req, res) => {
  Utilities.logError('trySignup','m in register method:','yes')
  const { obj } = req.body;

  console.log('m registering u now......');
  console.log(obj.userid + ' for role:' + obj.userrole + ' with password:' + obj.password);

  // Call the editUser method from usermgt.js
  try {
    // Make sure to pass the correct parameters required by the editUser method
    const editUserResult = await usermgt_dbOps.EditUser(req, res);
    // Use editUserResult as needed
  } catch (error) {
    // Handle any errors that may occur during the editUser method call
    console.error('Error calling editUser:', error);
    Utilities.logError('trySignup','Error from calling editUser:',error)
    // Respond with an error message or return an appropriate response
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};



var EditUser=async (req,res)=>{ 
  const { obj } = req.body;
 // console.log(' req.body.userrole: '+ req.body.userrole+' req.body.userid:'+req.body.userid)
   // var id=0;
  //  if(req.params.id==null){ id=0;}else{id=req.params.id; console.log('req.params.id:'+req.params.id)}
  //console.log('req.body.password'+req.body.password)

   //-- use bcrypt for hashing
  //const password=req.body.password; 
  
// Generate a salt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Hash the password
const hashedPassword = bcrypt.hashSync(obj.password, salt);
  //--end bcrypt for hashing 

      var sp_name='sp_UserMgt_AddEdit';
    
       let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
       const request =  pool.request();  
       request.input('id', sql.Int, obj.id);
       request.input('userid', sql.VarChar, obj.userid)  
       request.input('display_name', sql.VarChar, obj.display_name)  
       request.input('password', sql.VarChar,hashedPassword)  // req.body.password );//req.body.password  hashedPassword
       request.input('userrole', sql.VarChar, obj.userrole)  
      // request.input('access_saturated', sql.Bit, req.body.param_obj.access_saturated) 

      request.input('firm_name', sql.VarChar, '')  
      request.input('firm_addr', sql.VarChar, '')  
      request.input('shop_type', sql.VarChar, '')  
       request.input('IsActive', sql.Bit, obj.IsActive);
      request.input('CREATEDBY_username',sql.VarChar,'self');
      request.input('supplier_id',sql.Int,0);
                 //------------------------
               try{ 
   
                 var result= await request.execute(sp_name);                       
                                         
                 res.status(200).json({"sp_data":result.recordset})
                   }
                 catch(error){
                  // throw new error("Some error occured in "+sp_name)
                 Utilities.logError('sqlserver',sp_name,error)
                 // console.log('Error catched:->'+error);
                 res.status(200).json({"sp_data":null})
   
                   
                 }
                 finally{
                 
                 }
                 //------------------------
   
                       
    
    
      }//end of Edit User
//----------------------------------------------
 module.exports={sendotpORregister,EditUser}