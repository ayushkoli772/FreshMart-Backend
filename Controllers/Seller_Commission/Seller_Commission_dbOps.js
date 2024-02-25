var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');


var get_Seller_Commission_Setting=async (req,res)=>{ 

 
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                                  
                               
                 var sp_name='sp_Seller_Commission_Setting_Get';    
            try{
              
              if(req.params.id){  request.input('sellerid', sql.Int, req.params.id)}
              else{request.input('id',sql.Int,0)}     

             
                var result = await request.execute(sp_name);
                res.status(200).json(result.recordset)
              }
              catch(error){
              Utilities.logError('sqlserver',sp_name,error)
              // console.log('Error catched:->'+error);
                res.status(201).json({"sp_data:":null})
                      
              }
              finally{
              
              }  
}//end of get_Seller_Commission_Setting





  var newProduct= (req,res)=>{
console.log('Adding new product with req.body:'+JSON.stringify(req.body)+', sellerid:'+ req.body.seller_id+'p name:'+ req.body.product_name)
    let pool =  new sql.ConnectionPool(sqlConfigFile)
    .connect().then((pool)=>
               {
                    const request =  pool.request();
                    request.input('seller_id', sql.Int, req.body.seller_id)
                    request.input("product_name",sql.VarChar,req.body.product_name);
                    request.input('imageUrl', sql.VarChar, req.body.imageUrl);
                  
                    
                     request.execute('sp_Product_AddEdit', (err, result) => {                                
                                 
                         if(err){console.log('this is error');  res.status(401).json({"Error in SP sp_Product_AddEdit:":err})}
                       console.log('result:'+err)
                       res.status(200).json({"New Product:":"Added"})
                     })
    
               })
  }
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

   var edit_Seller_Commission_Setting=async(req,res)=>{
console.log('m editing edit_Seller_Commission_Setting');
console.log('req.params.id:'+req.params.id);
console.log('req.body:'+JSON.stringify(req.body))
   
var sp_name='sp_Seller_Commission_Setting_AddEdit';


let pool =await  new sql.ConnectionPool(sqlConfigFile).connect();
const request =  await pool.request();

      
        request.input("sellerid",sql.VarChar,req.body.seller_id);
        request.input('commission_percent', sql.VarChar(50), req.body.commission_percent)
        request.input("credit_limit",sql.VarChar(50),req.body.credit_limit);
        request.input("RP_key",sql.VarChar(100),req.body.RP_key);
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

 module.exports={get_Seller_Commission_Setting:get_Seller_Commission_Setting,edit_Seller_Commission_Setting:edit_Seller_Commission_Setting,newProduct:newProduct,newUsers:newUsers,editUsers:editUsers,deleteUsers:deleteUsers}