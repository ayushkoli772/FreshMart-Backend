var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');
const moment = require('moment');
  var getPromotionOrders=async (req,res)=>{

    
  
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const request = pool.request();
                           
                   var sp_name='sp_Promotion_Orders_Get';    
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
 /*  function format (date) {  
    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}`
  } */
  
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
  
  function isValidDate(dateString) {
    return !isNaN(Date.parse(dateString));
  }

  var newPromotionOrder=async (req,res)=>{

    var id=0;
    if(req.params.id==null){ id=0;}else{id=req.params.id;}
   // console.log('req.body.startDate:'+formatDate(req.body.startDate));
    //console.log('isdate(req.body.startDate):'+ isValidDate( moment(req.body.startDate).toDate()));
  //  const dateObject_startDate = moment(req.body.startDate).toDate();
// Format the date object into the appropriate format for SQL Server ('YYYY-MM-DD')
//const formattedDate_startDate = moment(dateObject_startDate).format('YYYY-MM-DD HH:mm:ss');

//const formattedDate_startDate = formatDate(dateObject_startDate)
//console.log('formattedDate_startDate:'+formattedDate_startDate)
const formattedDate_startDate = moment(req.body.startDate).format('MM/DD/YYYY HH:mm:ss')
const formattedDate_endDate = moment(req.body.endDate).format('MM/DD/YYYY HH:mm:ss')
console.log('----------------------------------------------------------------')
console.log('now formattedDate_startDate is:'+formattedDate_startDate)
console.log('now formattedDate_endDate is:'+formattedDate_endDate)

const dateObject_endDate = moment(req.body.endDate).toDate();
// Format the date object into the appropriate format for SQL Server ('YYYY-MM-DD')
//const formattedDate_endDate = moment(dateObject_endDate).format('YYYY-MM-DD HH:mm:ss');
//const formattedDate_endDate = formatDate(dateObject_endDate);
//console.log('formattedDate_endDate:'+formattedDate_endDate)

    var sp_name='sp_PromotionOrder_AddEdit';
    
       let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
       const request =  pool.request();  
       request.input('id', sql.Int, id);
       request.input('seller_id', sql.Int, req.body.seller_id);
       request.input('promotionType', sql.VarChar, req.body.promoType);
       request.input('promotionName', sql.VarChar, req.body.promotionName);
       request.input('discountAmount', sql.Decimal, req.body.discountAmount);
       request.input('discountPercentage', sql.Float, req.body.discountPercentage);
       request.input('minOrderAmount', sql.Int, req.body.minOrderAmount);
     //  request.input('startDate', sql.DateTime,new Date(req.body.startDate));
      // request.input('endDate', sql.DateTime, new Date(req.body.endDate));
        
       request.input('startDate', sql.DateTime,formattedDate_startDate);
       request.input('endDate', sql.DateTime, formattedDate_endDate)
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
  var deletePromotionOrder=async (req,res)=>{

    var sp_name='sp_PromotionOrder_Delete';
    
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
 module.exports={getPromotionOrders,newPromotionOrder,deletePromotionOrder}