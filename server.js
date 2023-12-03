// dependancies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// configurations
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)
const app = express()

// middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// routes
// homepage route
app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Breads!')
})

const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 page route
app.get('*', (req, res) => {
    res.send('404')
})

//Connect to your mongodb and listen on port given by env
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => console.log('connected to mongo: ', process.env.MONGO_URI)
)

// listen
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})

