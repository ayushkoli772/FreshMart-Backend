var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');

var conn=require('../../Connections/ConnectGearHost')();

var getUsers=async (req,res)=>{ //without id only slash /
  console.log('running sp_Users_Get')
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                  
                   //var result=request.query('sp_Users_Get')//, (err, result) => {                                
                               
                 var sp_name='sp_Users_Get';    
            try{
              
              if(req.params.id){  request.input('ID', sql.Int, req.params.id)}
              else{request.input('ID',sql.Int,0)}     

              //sp_name is sp_Users_AddEdit
                var result = await request.execute(sp_name);
                res.status(200).json({"sp_data":result})
              }
              catch(error){
              Utilities.logError('sqlserver',sp_name,error)
              // console.log('Error catched:->'+error);
                res.status(201).json({"sp_data:":null})
                      
              }
              finally{
              
              }             
                        
  
            // })
  //res.status(200).json({"isLogicalgateOpen":"1"}) //logical gate open
 
}


 
   /* var postDevice=(req,res)=>{
    
     res.status(200).json({"xyz":"xyz"})
   } */

   var newUsers= (req,res)=>{

    //sp_giveAccessToDevice
   
    let pool =  new sql.ConnectionPool(sqlConfigFile)
    .connect().then((pool)=>
               {
                    const request =  pool.request();
                    request.input('ID', sql.Int, req.body.userid)
                    request.input("salutation",sql.VarChar,req.body.salutation);
                    request.input('Owner_Fname', sql.VarChar, req.body.Owner_Fname)
                    request.input("Owner_Lname",sql.VarChar,req.body.Owner_Lname);
                    request.input('FlatNo', sql.Int, req.body.FlatNo)
                    request.input("DP_base64",sql.VarChar(50),req.body.DP_base64);
                  
                    
                     request.execute('sp_Users_AddEdit', (err, result) => {                                
                                 
                         if(err){console.log('this is error');  res.status(401).json({"Error in SP sp_Register_CheckPermissionsOfDeviceid:":err})}
                       console.log('result:'+err)
                       res.status(200).json({"New Users:":"Added"})
                     })
    
               })
   }

   var editUsers=async (req,res)=>{
    var sp_name='sp_Users_AddEdit';
    var ID;
    if (req.params.id){ID=req.params.id} else ID=0;

    console.log('m here editing:salutation'+req.body.Owner_Lname)
    //sp_giveAccessToDevice
   
    let pool =await  new sql.ConnectionPool(sqlConfigFile).connect();
    const request =  await pool.request();

            request.input('ID', sql.Int, ID)
            request.input("salutation",sql.VarChar,req.body.salutation);
            request.input('Owner_Fname', sql.VarChar(50), req.body.Owner_Fname)
            request.input("Owner_Lname",sql.VarChar(50),req.body.Owner_Lname);
            request.input('FlatNo', sql.Int, req.body.FlatNo)
             request.input("DP_base64",sql.VarChar(50),req.body.DP_base64);
          
            try{
            //sp_name is sp_Users_AddEdit
              var result = await request.execute(sp_name);
              res.status(200).json({"New Users:":result})
            }
            catch(error){
            Utilities.logError('sqlserver',sp_name,error)
            // console.log('Error catched:->'+error);
              res.status(200).json({"New Users:":result})
                    
            }
            finally{
            
            }             
                        
                     
    
               
   }

   var deleteUsers=async (req,res)=>{
    var sp_name='sp_Users_Delete';
    var ID;
    if (req.params.id){ID=req.params.id} else ID=0;

    console.log('m here editing:salutation'+req.body.Owner_Lname)
    //sp_giveAccessToDevice
   
    let pool =await  new sql.ConnectionPool(sqlConfigFile).connect();
    const request =  await pool.request();

          request.input('ID', sql.Int, ID)
        
          
            try{
            //sp_name is sp_Users_AddEdit
              var result = await request.execute(sp_name);
            }
            catch(error){
            Utilities.logError('sqlserver',sp_name,error)
            // console.log('Error catched:->'+error);
              res.status(200).json({"New Users:":result})
                    
            }
            finally{
            
            }             
                        
                     
    
               
   }

 module.exports={getUsers:getUsers,newUsers:newUsers,editUsers:editUsers,deleteUsers:deleteUsers}