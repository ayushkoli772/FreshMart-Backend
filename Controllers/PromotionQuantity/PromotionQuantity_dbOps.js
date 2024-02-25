var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');
const moment = require('moment');
  var getPromotionQuantity=async (req,res)=>{
 
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const request = pool.request();
                           
                   var sp_name='sp_Promotion_Quantity_Get';    
              try{
                
                request.input('id', sql.Int, req.params.id);
                request.input('seller_id', sql.Int, req.params.seller_id);     
  
               
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

 var formatDate=(date)=> {
  if (!(date instanceof Date)) {
    // Handle the case where `date` is not a valid Date object
    throw new Error('Invalid date object');
  }

  const day = date.getDate()+1;
  const month = date.getMonth() + 1; // Months are zero-based

  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  //const formattedDate = `${formattedDay}-${formattedMonth}-${date.getFullYear()}`;
    const formattedDate = `${date.getFullYear()}-${formattedMonth}-${formattedDay} 00:00:00.000`;
  return formattedDate;
  }
  
  var editPromotionQuantity=async (req,res)=>{

    var id=0;
    if(req.params.id==null){ id=0;}else{id=req.params.id;}
    

const formattedDate_startDate = moment(req.body.startDate).format('MM/DD/YYYY HH:mm:ss')
const formattedDate_endDate = moment(req.body.endDate).format('MM/DD/YYYY HH:mm:ss')

const dateObject_endDate = moment(req.body.endDate).toDate();


var sp_name='sp_PromotionQuantity_Edit AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaa';
    
       let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
       const request =  pool.request();  
       request.input('id', sql.Int, id);
       request.input('seller_id', sql.Int, req.body.seller_id);
       request.input('productId', sql.Int, req.body.productId);
       request.input('promotionType', sql.VarChar, req.body.promoType);
       request.input('promotionName', sql.VarChar, req.body.promotionName);
       request.input('buyX', sql.Int, req.body.buyX);
       request.input('getY', sql.Int, req.body.getY);
       request.input('discountAmount', sql.Decimal, req.body.discountAmount);
       request.input('discountPercentage', sql.Float, req.body.discountPercentage);

      // request.input('startDate', sql.Date, req.body.startDate);
      // request.input('endDate', sql.Date, req.body.endDate);
       request.input('startDate', sql.DateTime,formattedDate_startDate);
       request.input('endDate', sql.DateTime, formattedDate_endDate);

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
  var deletePromotionProduct=async (req,res)=>{

    var sp_name='sp_PromotionProduct_Delete';
    
       let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
       const request =  pool.request();  
       request.input('id', sql.Int, req.params.id);
      
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
 module.exports={getPromotionQuantity,editPromotionQuantity,deletePromotionProduct}