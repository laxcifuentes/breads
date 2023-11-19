const express = require('express')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) =>{
    res.send('Welcome to an awesome app about breads!')
});

const breadController = require('./controllers/breads_controller')
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

