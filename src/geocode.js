const request = require('postman-request')
const geocode = (adress,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoibmVpbGtldGNodW0iLCJhIjoiY2s5bGdna3BvMDM1eDNkbzNoYWV1ajlsZSJ9.H4jZswIvUiJzeelzAbozQQ&limit=1`
    request({url:url,json:true},(error,response)=>{
       if(error){
          callback('Unable to connect to location Services',undefined)
       }else if(response.body.features.length === 0){
          callback('Unable to find location. Try another search.',undefined)
       }
       else{
          callback(undefined,{
           lat : response.body.features[0].center[1],
           long : response.body.features[0].center[0],
           place : response.body.query[0],
          })
          
       }
    })
 } 
 module.exports = geocode;