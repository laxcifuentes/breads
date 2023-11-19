const express = require('express')
const breads = express.Router()

breads.get('/', (req, res) =>{
    res.send('This is an index of breads')
})

module.exports = breads