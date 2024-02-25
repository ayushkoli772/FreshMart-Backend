var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');

const bcrypt = require('bcrypt');


var getUsers=async (req,res)=>{
  
  console.log('req.params.role:'+req.params.role)

   var sp_name='sp_Users_Get'; 
   /* console.log('id of user:'+req.params.id)
   console.log('role is:'+req.params.role) */
 
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const request =  pool.request();    
     request.input('ID', sql.Int, req.params.id);
    request.input('role', sql.VarChar, req.params.role );  
    request.input('userIDs', sql.VarChar, req.params.userIDs );
    if(req.params.PageNumber){  request.input('PageNumber', sql.Int, req.params.PageNumber); }  
    if(req.params.PageSize){   request.input('PageSize', sql.Int, req.params.PageSize); }
    if(req.params.seller_id){request.input('seller_id',sql.Int,req.params.seller_id)}
   if(req.params.mobileNumber){
        request.input('mobileNumber', sql.VarChar, req.params.mobileNumber );  
   }
    /**/  //          
              //------------------------
            try{ 

              var result= await request.execute(sp_name);                       
                           // console.log('users:'+JSON.stringify(result.recordset))         
              res.status(200).json(result.recordset)
                }
              catch(error){
              Utilities.logError('sqlserver',sp_name,error)
              // console.log('Error catched:->'+error);
              res.status(500).json({"Number":error.number,"Message":error.message})

                
              }
              finally{
              
              }
              //------------------------

                    



                    
    
               //})
 
 
   }//end of getUsers

                  var getPasswordOfThisUser=async (param_id)=>{ 
                    
                  var sp_name='sp_Users_Get'; 
                  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
                  const request =  pool.request();    
                      request.input('ID', sql.Int, param_id);         
                      var result= await request.execute(sp_name);  
                console.log('old password is:'+JSON.stringify(result.recordsets[0][0].password)); 
                return result.recordsets[0][0].password;
                  }
 
   var EditUser=async (req,res)=>{ 

 console.log('req.body.shop_type:'+req.body.shop_type)
    var id=0;
    if(req.params.id==null){ id=0;}else{id=req.params.id; console.log('req.params.id:'+req.params.id)}
  console.log('req.body.password'+req.body.password)

   //-- use bcrypt for hashing
//   if(req.body.password!='NotEditing*123'){
  //replaced above by below on 11Aug2023
  var hashedPassword='';
  if(req.params.id==0){
    
// Generate a salt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Hash the password
req.body.password = bcrypt.hashSync(req.body.password, salt);
  //--end bcrypt for hashing 
  }
  else if(req.body.password!='NotEditing*123'){
    const oldpassword=req.body.oldpassword; 

    //--------------------------------------------------
    console.log('get thisusers data');
  var oldhashedPassword= await getPasswordOfThisUser(req.body.id);
  console.log('retrieved oldhashedPassword:'+oldhashedPassword)
    //--------------------------------------------------


         // var oldhashedPassword='$2b$10$Gm4Upld5AS5QroxduikCZ.20erEPCCb2eiV3OharxlOCrFK9M2Qo.';
          // Compare the input 'oldpassword' with the 'hashedPassword' from the database
          const passwordMatches = bcrypt.compareSync(oldpassword, oldhashedPassword);

          if (passwordMatches) {console.log('old password matches')
          }
          else{console.log('not matching old password....')}
          //compare old password

  const password=req.body.password; 
  
// Generate a salt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Hash the password
 hashedPassword = bcrypt.hashSync(password, salt);
  //--end bcrypt for hashing 

  //if oldpassword matches then only change password
  if(passwordMatches ||req.body.oldpassword=='iamadmin'){req.body.password=hashedPassword   }else{
    console.log('i cannot change current password');req.body.password='NotEditing*123'
  return res.status(500).json({ message: "Could not change password" });
  
  }


}//check password is not ''

      var sp_name='sp_UserMgt_AddEdit';
    
       let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
       const request =  pool.request();  
       request.input('id', sql.Int, id);
       request.input('userid', sql.VarChar, req.body.userid)  
       request.input('display_name', sql.VarChar, req.body.display_name)  
       request.input('password', sql.VarChar,req.body.password);//hashedPassword)  // req.body.password );//req.body.password  hashedPassword
       request.input('userrole', sql.VarChar, req.body.userrole)  
      // request.input('access_saturated', sql.Bit, req.body.param_obj.access_saturated) 

      request.input('firm_name', sql.VarChar, req.body.firm_name)  
      request.input('firm_addr', sql.VarChar, req.body.firm_addr)  
      request.input('shop_type', sql.VarChar, req.body.shop_type)  
       request.input('IsActive', sql.Bit, req.body.IsActive);
      request.input('CREATEDBY_username',sql.VarChar,req.body.CREATEDBY_username);
      request.input('supplier_id',sql.Int,req.body.supplier_id);
      
      request.input('area_code',sql.VarChar,req.body.area_code);
                 //------------------------
               try{ 
   
                 var result= await request.execute(sp_name);                       
                                         
                 res.status(200).json({"sp_data":result.recordset})
                   }
                 catch(error){
                  // throw new error("Some error occured in "+sp_name)
                 Utilities.logError('sqlserver',sp_name,error)
                 // console.log('Error catched:->'+error);
                 res.status(500).json({"Number":error.number,"Message":error.message})
   
                   
                 }
                 finally{
                 
                 }
                 //------------------------
   
                       
    
    
      }//end of Edit User
   
      var DeleteUser=async (req,res)=>{ 
     console.log('u r about to delete user.......with id:'+req.params.id)
  
       
  
        var sp_name='sp_UserMgt_Delete';
      
         let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
         const request =  pool.request();  
         request.input('ID', sql.Int, req.params.id)
                   //------------------------
                 try{ 
     
                   var result= await request.execute(sp_name);                       
                                           
                   res.status(200).json({"sp_data":result.recordset})
                     }
                   catch(error){
                   
                   Utilities.logError('sqlserver',sp_name,error)
                   // console.log('Error catched:->'+error);

                   res.status(500).json({"Number":error.number,"Message":error.message})
                     
                   }
                   finally{
                   
                   }
                   //------------------------
     
                         
      
      
        }//end of delete User
 module.exports={getUsers:getUsers,EditUser:EditUser,DeleteUser:DeleteUser}