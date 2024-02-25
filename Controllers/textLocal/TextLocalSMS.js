var httprequest = require('request-promise');

const API_KEY = 'NGY2YjczNjc0YjdhNjQ2NDUwMzQzNjcxNmQ3YTYxMzk=';

module.exports = class TextLocalSMS {

constructor() {
}

async callApi(METHOD,URL,BODY){
    var options = {
        method: METHOD,
        uri: URL,
        headers:{
             'Content-Type': 'application/json',
             'Cache-Control': 'no-cache'
        },
        json:true
    };
    
    let response= await httprequest(options).then((result)=>{
        console.log(`SMS API: ${URL} RESULT =`,result);
        return result; 
    }).catch(function (err) {
        console.log(`SMS API: ${URL} ERROR =`,err.message);
        return err;
    });
    return response;
}

async sendSMS(toNumbers,rawMessage){
    let url = 'https://api.textlocal.in/send/';
    let sender = encodeURIComponent('nodeAngHost');
    let encoded_message = encodeURIComponent(rawMessage);
    let body={
        apikey:'NGY2YjczNjc0YjdhNjQ2NDUwMzQzNjcxNmQ3YTYxMzk=',
        numbers:toNumbers.join(','),
        sender:sender,
        message:encoded_message
    };
    let result = await this.callApi('POST',url,body);
    return result;
}

}
