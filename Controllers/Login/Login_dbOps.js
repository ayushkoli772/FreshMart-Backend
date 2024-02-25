var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');
var my_user_dbUtil=require('../Users/user_dbUtil');


const jwt = require('jsonwebtoken');
var store=require('store2');

var getLoggedin=async (req,res)=>{ 

  
   //res.status(200).json({'iam':'fine'})
   
   
   if(!req.params.id){
      res.status(200).send({user:null, error:"Login By Device Or Credential not defined" });//501
   } 
      
   let user = req.body;
   if(!user){res.status(501).send({ error:"no credential passed" });}

   
//---------------------------------------------------------------------
var retUser;
   //Find user by deviceid and get user returned
   if(req.params.id=='bydeviceid'){ 

  

    retUser=await my_user_dbUtil.FindDeviceAndReturnUser(req,res,user.deviceid);
   }
   else if(req.params.id=='bycredential'){
      retUser=await my_user_dbUtil.FindCredentialAndReturnUser(req,res,user.userid,user.password);
   }
   //var retUser={'userid':'anilk','deviceid':'xyz'};

   if(retUser!=null){
     

      

   var accessToken = jwt.sign({userid:user.userid},"secret");//retUser
  
   console.log('sending accessToken:'+accessToken);console.log('user.userid:'+user.userid)
  store('userid',retUser.userid);
  
   res.status(201).json({user:retUser,accessToken:accessToken}); 
   
   
   }

   //end of Authenticate and get role string returned

  
       else
       {console.log('wrong user passO')
         res.status(401).send({user:null, error:"Wrong username or password" });//501
       }

 /**/
}//end of getLoggedIn a post method to api/login


 
   

   

   

 module.exports={getLoggedin:getLoggedin}