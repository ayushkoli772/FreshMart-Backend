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
  
  
   var saveQuantityPromotionData = async (masterData, detailData) => {
      let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
      const transaction = new sql.Transaction(pool);
      try {
        await transaction.begin();
    
        
const formattedDate_startDate = moment(masterData.startDate).format('MM/DD/YYYY HH:mm:ss')
const formattedDate_endDate = moment(masterData.endDate).format('MM/DD/YYYY HH:mm:ss')
        // Save master data
        const requestMaster = transaction.request();
        requestMaster.input('QuantityPromotion_id', sql.Int, masterData.id);
        requestMaster.input('seller_id', sql.Int, masterData.seller_id);
        requestMaster.input('productId', sql.Int, masterData.productId);
        requestMaster.input('promotionName', sql.VarChar, masterData.promotionName);
        requestMaster.input('startDate', sql.DateTime, formattedDate_startDate);
        requestMaster.input('endDate', sql.DateTime, formattedDate_endDate);
    
        const masterResult = await requestMaster.execute('sp_PromotionQuantity_Edit');
        const quantityPromotionId = masterResult.recordset[0].id;
    
        // Save detail data
        for (const detail of detailData) {
          const requestDetail = transaction.request();
          requestDetail.input('QuantityPromotion_id', sql.Int, quantityPromotionId);
          requestDetail.input('quantityRangeStart', sql.Int, detail.quantityRangeStart);
          requestDetail.input('quantityRangeEnd', sql.Int, detail.quantityRangeEnd);
          requestDetail.input('discountAmount', sql.Decimal, detail.discountAmount);
          requestDetail.input('discountPercentage', sql.Float, detail.discountPercentage);
    
          await requestDetail.execute('sp_PromotionQuantity_Stages');
        }
    
        await transaction.commit();
        return true;
      } catch (error) {
        await transaction.rollback();
        Utilities.logError('sqlserver', 'saveQuantityPromotionData', error);
        return false;
      } finally {
        pool.close();
      }
    };
    
    var editPromotionQuantity = async (req, res) => {
     console.log('req.body AAAAAAAAAAAAAAAAAAAAAAA:'+JSON.stringify(req.body))
         // Extract the master and detail data
         const data = req.body;
       console.log('detail bbbbbbbbbbbbbbbbbbbbbb:'+data.quantityStagesFormArray)
         const masterData = data;
         //const detailData = data.slice(1);
         
const detailData = [];
for (let i = 1; i < data.quantityStagesFormArray.length; i++) {
  const { QuantityPromotion_stage_id, quantityRangeStart, quantityRangeEnd, discountAmount, discountPercentage } = data.quantityStagesFormArray[i];
  const detail = {
    QuantityPromotion_stage_id,
    quantityRangeStart,
    quantityRangeEnd,
    discountAmount,
    discountPercentage
  };
  detailData.push(detail);
}
       console.log('detailData:'+detailData)
         // Call the function to save the data
         const result = await saveQuantityPromotionData(masterData, detailData);
       
         if (result) {
           res.status(200).json({ success: true });
         } else {
           res.status(500).json({ success: false });
         }
       };
       
    
  
 module.exports={getPromotionQuantity,editPromotionQuantity}