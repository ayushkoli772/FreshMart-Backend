var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');

var getErrorLogs=async (req,res)=>{
   var sp_name='sp_getErrorLog';
 
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const request =  pool.request();                  
              //------------------------
            try{ 

              var result= await request.execute(sp_name);                       
                                      
                res.status(200).json({"sp_data":result})
                }
              catch(error){
              Utilities.logError('sqlserver',sp_name,error)
              // console.log('Error catched:->'+error);
                res.status(200).json({"sp_data:":null})
                
              }
              finally{
              
              }
              //------------------------

                    



                    
    
               //})
 
 
   }//end of test
 
   var deleteErrorLogs=async(req,res)=>{
    var sp_name='ErrorLog_Truncate';
  
     let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
     const request =  pool.request();                  
               //------------------------
             try{ 
 
               var result= await request.execute(sp_name);                       
                                       
                 res.status(200).json({"sp_data":result})
                 }
               catch(error){
               Utilities.logError('sqlserver',sp_name,error)
               // console.log('Error catched:->'+error);
                 res.status(200).json({"sp_data:":null})
                 
               }
               finally{
               
               }
               //------------------------
 
                     
 
 
 
                     
     
                //})
  
  
    }//end of DeleteErrorLog
  

   var postTest=(req,res)=>{
     var nm=req.params.id;
     res.status(200).json({"posted":"Hi !"+nm})
   }
   
 module.exports={getErrorLogs:getErrorLogs,deleteErrorLogs:deleteErrorLogs}