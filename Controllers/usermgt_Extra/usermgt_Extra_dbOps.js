var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');

const bcrypt = require('bcrypt');


var Get_Consumer=async(req,res)=>{
  
console.log('req.params.mobileNumber:'+req.params.id)
console.log('req.params.from_userExtra:'+req.params.from_userExtra)
console.log('req.params.approval_status:'+req.params.approval_status)
console.log('req.params.seller_id:'+req.params.seller_id)
   var sp_name='sp_UsersExtra_Get'; 
 
 
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const request =  pool.request();  
    if( req.params.id){ 
       console.log('param added id:'+req.params.id);
     request.input('mobileNumber', sql.VarChar, req.params.id);//id means mobilenumber here
    }
    //from_userExtra
    if( req.params.from_userExtra){ 
      console.log('param added from_userExtra:'+req.params.from_userExtra); 
       request.input('from_userExtra', sql.Int, req.params.from_userExtra);
     }
     //approval_status
     if( req.params.approval_status){ 
      console.log('param added approval_status zero:'+req.params.approval_status); 
            request.input('approval_status', sql.VarChar, req.params.approval_status);
           }
           //seller_id
           if( req.params.seller_id){  
            console.log('param added seller_id:'+req.params.seller_id);
            request.input('seller_id', sql.Int, req.params.seller_id);
           }
    /**/  //    
   
              //------------------------
            try{ 

              var result= await request.execute(sp_name);                       
                            console.log('userextra get:'+JSON.stringify(result.recordset))         
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
 
 
   }//end of Get_Consumer
                  
   var New_Consumer=async (req,res)=>{ 
console.log('m trying to add new consumer');
console.log('req.body.mobileNumber:'+req.body.mobileNumber)
console.log('req.body.seller_id:'+req.body.seller_id)
      var sp_name='sp_New_Consumer';
    
       let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
       const request =  pool.request();  
      
       request.input('mobileNumber', sql.VarChar, req.body.mobileNumber)  
       request.input('seller_id',sql.Int,req.body.seller_id);
       request.input('otpfromsupplier', sql.VarChar, req.body.otpfromsupplier)  
       
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
   
      var RegisterOrRequest=async(req,res)=>{
        console.log('req.body:'+JSON.stringify(req.body))
        if (req.body.action=='register_request')// request from consumer for registration
        {
          console.log('m for consumer to requesting a registration');

          sendRegistrationRequest(req,res);
        }
        
        
        //approve or reject by supplier
        else if(req.body.action=='register_request_approve')
        {
          console.log('m ready to approve new consumer');

          console.log('req.body:'+JSON.stringify(req.body));

          ApproveRejectRegistrationRequest(req,res);
        }
      }




      var sendRegistrationRequest=async(req,res)=>{
        var sp_name='sp_New_Consumer_Registration_requestORapprove';
    
        let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
        const request =  pool.request();  
       
        console.log('mhashing password:'+req.body.password)
        // Generate a salt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Hash the password
req.body.password = bcrypt.hashSync(req.body.password, salt);
  //--end bcrypt for hashing 
  
        request.input('mobileNumber', sql.VarChar, req.body.mobileNumber)
        request.input('display_name',sql.VarChar,req.body.display_name);  
        request.input('consumer_address',sql.VarChar,req.body.consumer_address);
        request.input('password',sql.VarChar,req.body.password);
        request.input('action',sql.VarChar,req.body.action);
 
        
        
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
      }
      
      var ApproveRejectRegistrationRequest=async(req,res)=>{
        var sp_name='sp_New_Consumer_Registration_requestORapprove';
    
        let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
        const request =  pool.request();  
       
        request.input('mobileNumber', sql.VarChar, req.body.mobileNumber)
	request.input('seller_id',sql.VarChar,req.body.seller_id); 
	request.input('approval_status',sql.VarChar,req.body.approval_status);  
        request.input('action',sql.VarChar,req.body.action);
 
        
        
                  //------------------------
                try{ 
    
                  var result= await request.execute(sp_name);                       
                                          
                  res.status(200).json({"sp_data":result.recordset})
                    }
                  catch(error){
                   // throw new error("Some error occured in "+sp_name)
                  Utilities.logError('sqlserver',sp_name,error)
                  // console.log('Error catched:->'+error);
                 // res.status(200).json({"sp_data":null})
                 res.status(500).json({"Number":error.number,"Message":error.message})
    
                    
                  }
                  finally{
                  
                  }
                  //------------------------
      }
      
 module.exports={Get_Consumer,New_Consumer,RegisterOrRequest}