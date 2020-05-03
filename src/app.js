const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode'); 
const forecast = require('./forecast');
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if(req.query.search){
    geocode(req.query.search,(error,data)=>{
        if(error){
              res.send({error})
        }
        forecast(data.lat, data.long, (error, response) => {
              if(error){
                    res.send({
                        error
                    })
              }else{
              res.send({
                  location:data.place,
                  Data : response
              })}
            })
  })
    }
    else{
        res.send(
            {
                msg:"Error",
                search:req.query.search
            }
        )
    }  
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})