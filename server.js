// dependancies
const express = require('express')
const methodOverride = require('method-override')

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

// listen
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})

