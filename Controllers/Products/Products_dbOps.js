var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');

var getProductsNew=async(req,res)=>{
  //var productId=NULL;
  //var seller_id=NULL;
  //var PageNumber=NULL;
  //var PageSize=NULL;



 
let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
const request = pool.request();
                
                                               
                             
               var sp_name='sp_new_products_Get';    
          try{
            
            if(req.params.productId){  request.input('productId', sql.Int, req.params.productId)}
            else{request.input('productId',sql.Int,0)}  
            
            if(req.params.seller_id){  request.input('seller_id', sql.Int, req.params.seller_id)}
            else{request.input('seller_id',sql.Int,0)}  
            
            if(req.params.PageNumber){  request.input('PageNumber', sql.Int, req.params.PageNumber)}
            else{request.input('PageNumber',sql.Int,0)}

            if(req.params.PageSize){  request.input('PageSize', sql.Int, req.params.PageSize)}
            else{request.input('PageSize',sql.Int,0)}

           //
           if(req.params.sellerIDs){  request.input('sellerIDs', sql.VarChar, req.params.sellerIDs)}
            else{request.input('sellerIDs',sql.VarChar,"")}
          //
          if(req.params.categoryIDs){  request.input('categoryIDs', sql.VarChar, req.params.categoryIDs)}
          else{request.input('categoryIDs',sql.VarChar,"")}

            //productIds
           if(req.params.productIds){ console.log('param productIds found');  request.input('productIds', sql.VarChar, req.params.productIds)}
           else{request.input('productIds',sql.VarChar,"")}

            //partialname
            
           if(req.params.partialname){ request.input('partialname', sql.VarChar, req.params.partialname)}
           else{request.input('partialname',sql.VarChar,"")}

           //skipIdsFromCartItems 
           if(req.params.skipIdsFromCartItems){ request.input('skipIdsFromCartItems', sql.VarChar, req.params.skipIdsFromCartItems)}
           else{request.input('skipIdsFromCartItems',sql.Bit,"")}


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

}




















/* 
var getProducts=async (req,res)=>{ 

   //3 ways 
   // id exists (nonzero) return one product of that id
   // id zero,sellerid quesrystring nonzero, return sellers product
   // id zero, sellerid also zero return all product

   if(req.params.id>0){getProuctById(req,res);}
   else if(req.query.seller_id!==null && req.query.seller_id>0){getProuctsOfSeller(req,res)}
   else if(req.query.seller_id==null || req.query.seller_id==0){getProducts_All(req,res)}

                        
  
            // })
  //res.status(200).json({"isLogicalgateOpen":"1"}) //logical gate open
 
} */
var getProuctById=async (req,res)=>{ 
 
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                  
                   //var result=request.query('sp_Products_Get')//, (err, result) => {                                
                               
                 var sp_name='sp_Products_Get';    
            try{
              
              if(req.params.id){  request.input('id', sql.Int, req.params.id)}
              else{request.input('ID',sql.Int,0)}     

             
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
}//end of product by id

var getProuctsOfSeller=async (req,res)=>{ 
 
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                  
                   //var result=request.query('sp_Products_Get')//, (err, result) => {                                
                               
                 var sp_name='sp_Products_Get';    
            try{
              
              if(req.query.seller_id>0){  request.input('seller_id', sql.Int, req.query.seller_id)}
                         
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
}//end of products of one seller
var getProducts_All=async (req,res)=>{ 
 
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                  
            var sp_name='sp_Products_Get';    
            if(req.query.PageNumber!==undefined && req.query.PageSize!==undefined){    console.log('getALLPs'); 
            return  getProducts_Chunk(req,res);
            }
            try{
              
          
                         
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
}//end of all products

var getProducts_Chunk=async(req,res)=>{
  console.log('calling get in chunk')
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
         
  sp_name='sp_Products_Get_chunk';
  try{

   

              
    request.input('PageNumber', sql.Int, req.query.PageNumber);
    request.input('PageSize', sql.Int, req.query.PageSize);
                         
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
}//end of 


 
   /* var postDevice=(req,res)=>{
    
     res.status(200).json({"xyz":"xyz"})
   } */

   

  var newProduct= async(req,res)=>{
console.log('Adding new product with req.body:'+JSON.stringify(req.body)+', sellerid:'+ req.body.seller_id+'p name:'+ req.body.product_name)

var imageUrl='';
if(req.body.imageUrl!=undefined){imageUrl=req.body.imageUrl}

//console.log('req.body.seller_id:'+req.body.seller_id)
var sp_name='sp_Product_AddEdit'

let pool =await  new sql.ConnectionPool(sqlConfigFile).connect();

console.log('req.body.Allowed_customPrice:'+req.body.Allowed_customPrice)

console.log('req.body.Allowed_customQuantity:'+req.body.Allowed_customQuantity)

   const request =  await pool.request();

           request.input('id', sql.Int, req.body.id)
                   request.input('seller_id', sql.Int, req.body.seller_id);
                
                   request.input("product_name",sql.VarChar,req.body.product_name);
                   request.input("category_id",sql.Int,req.body.category_id);
                   request.input('imageUrl', sql.VarChar, imageUrl);
                   request.input('price', sql.VarChar, req.body.price);
                   request.input('description', sql.VarChar, req.body.description);
                   request.input('OutOfStock', sql.VarChar, req.body.OutOfStock);
                   
                   request.input('IsOnlyForAdvertise', sql.VarChar, req.body.IsOnlyForAdvertise);
                   
                   request.input('discount_text', sql.VarChar, req.body.discount_text);;
                   request.input('unit_id', sql.Int, req.body.unit_id);
                   
                 //  request.input('Allowed_customPrice', sql.VarChar, req.body.Allowed_customPrice);
                   request.input('Allowed_customQuantity', sql.VarChar, req.body.Allowed_customQuantity);
                   
                   request.input('CREATEDBY_username', sql.VarChar, req.body.CREATEDBY_username);

                   

                   
         
           try{
           //sp_name is sp_Users_AddEdit
             var result = await request.execute(sp_name);
             res.status(200).json({"New Users:":result})
           }
           catch(error){
           Utilities.logError('sqlserver',sp_name,error)
           // console.log('Error catched:->'+error);
             res.status(500).json({"Number":error.number,"Message":error.message})
                   
           }
           finally{
           
           }
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

 module.exports={getProductsNew:getProductsNew,newProduct:newProduct,newUsers:newUsers,editUsers:editUsers,deleteUsers:deleteUsers}