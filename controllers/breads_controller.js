const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')

breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
      .then(foundBreads => {
          res.status(303).render('index', {
              breads: foundBreads,
              bakers: foundBakers,
              title: 'Index Page'
          })
      })
    })  
})


breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
    res.status(303).render('new', {
      bakers: foundBakers
        })
    })
})

// create
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
breads.get('/:id/edit', (req, res) => {
  Baker.find()
  .then(foundBakers => {
    Bread.findById(req.params.id)
      .then(foundBread => {
        res.status(303).render('edit', {
          bread: foundBread,
          bakers: foundBakers
        })
      })
  })
})
  
// show
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
     .populate('baker')
    .then(foundBread=> {
      const bakedBy = foundBread.getBakedBy()
      console.log(bakedBy)
      res.status(303).render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('404')
    })
})

  // delete
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
      res.status(303).redirect('/breads')
      console.log(req.params.id)
    })
  })

  // update
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true})
  .then(updatedBread => {
    console.log(updatedBread)
    res.status(303).redirect(`/breads/${req.params.id}`)
  })
})

module.exports = breads