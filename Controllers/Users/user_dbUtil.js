
var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');

const bcrypt = require('bcrypt');


   var getAllUsers=async (req,res)=>{
   var sp_name="sp_Users_Get" //return result.recordset

//-------------
let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                  
                               
                   var sp_name="sp_Users_Get"   
            try{
             
              // when not zero need one user record of that ID

              request.input('ID',sql.Int,0) // 0 zero means all users returned by sp sp_Users_Get
              
              //sp_name is sp_Flatowner_AddEdit
                var result = await request.execute(sp_name);
               // res.status(200).json({"sp_data":result})
               return result.recordset;
              }
              catch(error){
              Utilities.logError('sqlserver',sp_name,error)
              // console.log('Error catched:->'+error);
                res.status(201).json({"sp_data:":null})
                      
              }
              finally{
              
              }             
                 
  //-----------



}

//AuthenticateAndReturnRole22
var AuthenticateAndReturnRole2=async(req,res,uname,pwd)=>{
  return 'receptionist'
}
//end of 2


//Device match here 
//below another method matching for userid, password

var FindDeviceAndReturnUser= async (req,res,deviceid)=>{
  var retUsers;
    retUsers=await getAllUsers(req,res);
  

   //At userdetails level
    if( retUsers.find(elem=>elem.deviceid==deviceid && elem.access_saturated==0 )==undefined)//need to check access_saturated==0
    { 
      
      //return 'nosuchuser'
      return null;
    }         
    //at userdevice level
    else if( retUsers.find(elem=>elem.deviceid==deviceid && elem.deviceaccess_saturated==0 )==undefined)//need to check deviceaccess_saturated==0
    { 
      //return 'nosuchuser'
      return null;
    }
    else{  
      
    return await retUsers.find(elem=> elem.deviceid==deviceid);
     
    }
    return "nosuchuser";
    //}
  }
var FindCredentialAndReturnUser= async (req,res,param_userid,param_pwd)=>{
  console.log('findinguser ')
  console.log('with passwordvlength:'+param_pwd.length)
    var retUsers;
    retUsers=await getAllUsers(req,res);
  
    if( retUsers.find(elem=>elem.userid.toLowerCase()==param_userid.toLowerCase() && elem.IsActive==true)==undefined)//need to check isactive or not
    { 
      //return 'nosuchuser'
      return null;
    }
    //added on 15Aug23
    else if(param_pwd.length==4)//userExtra 
    {
      console.log('searching in userExtra'); console.log('usercount:'+retUsers.length)
     return await retUsers.find(elem=> elem.userid.toLowerCase()==param_userid.toLowerCase() && elem.otpfromsupplier==param_pwd && elem.IsActive==true);    
//   return await retUsers.find(elem=> elem.userid==param_userid && bcrypt.compareSync(param_pwd, (elem.otpfromsupplier)) && elem.IsActive==true);
    }
    //end added on 15Aug23
    else{  
      //without hashing
//return await retUsers.find(elem=> elem.userid==param_userid && elem.password==param_pwd && elem.IsActive==true);
   return await retUsers.find(elem=> elem.userid.toLowerCase()==param_userid.toLowerCase() && bcrypt.compareSync(param_pwd, (elem.password)) && elem.IsActive==true);
   //with hashing

    }
    return "nosuchuser";
    //}
  }

var AuthenticateAndReturnRole= async (req,res,userid,pwd)=>{
    var retUsers;
    retUsers=await getAllUsers();
    

    if( retUsers.find(elem=>elem.userid==userid)==undefined)
    {
      //return 'nosuchuser'
      return null;
    }
    else{
    return await retUsers.find(elem=>elem.userid==userid && elem.password==pwd);
    }

    //if(uname=='doctor' && pwd=='doctor123'){ console.log('Role returned:'+'receptionist'); return 'receptionist';}


/* 
  if(uname=='admin' && pwd=='admin123')
  {
  return "admin";
  }
  else if(uname=='receptionist' && pwd=='receptionist123')
  {
  return "receptionist";
  }
  else if(uname=='doctor' && pwd=='doctor123')
  {
  return "doctor";
  }
  el se{*/
    return "nosuchuser";
  //}
}

module.exports={AuthenticateAndReturnRole:AuthenticateAndReturnRole,FindDeviceAndReturnUser:FindDeviceAndReturnUser,FindCredentialAndReturnUser:FindCredentialAndReturnUser}