const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')

breads.get('/', (req, res) => {
  Bread.find()
      .then(foundBreads => {
          res.status(303).render('index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})


breads.get('/new', (req, res) => {
    res.status(303).render('new')
})

// create
breads.post('/', (req, res) => {
    console.log(req.body)
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    res.status(303).redirect('/breads')
})

breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    console.log(req.body)
    Bread.create(req.body)
    res.status(303).redirect('/breads')
  })

  // edit
breads.get('/:indexArray/edit', (req, res) => {
  res.status(303).render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})
  
// show
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread=> {
      res.status(303).render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('404')
    })
})

  // delete
breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
  })

  // update
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.status(303).redirect(`/breads/${req.params.arrayIndex}`)
})

module.exports = breads