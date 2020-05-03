const request = require('postman-request');
const forecast = (lat,long,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=a1ea2c2cb7bce4ed89aa0e4ebf36c5e7&query='+ lat +','+ long;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location Services',undefined)
        }else{
            callback(undefined,{
             lat:lat,
             long:long,
             current_weather : response.body.current.temperature,
             weather_decp : response.body.current.weather_descriptions[0],
             wind_speed : response.body.current.wind_speed,
             pressure: response.body.current.pressure,
             visiblity : response.body.current.visiblity
            })
        }
    })

}
module.exports = forecast;