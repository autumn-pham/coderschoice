const express = require('express');
const sausage = express.Router();
const Sausage = require('../models/sausage.js')

sausage.get('/', (req, res) => {
  Sausage.find({}, (err, foundSausages) => {
    res.json(foundSausages)
  })
})

sausage.post('/', (req, res) => {
  Sausage.create(req.body, (err, createSausage) => {
    Sausage.find({}, (err, foundSausages) => {
      res.json(foundSausages)
    })
  })
})

sausage.put('/:id', (req, res) => {
  Sausage.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedSausage) => {
    if(err){
      res.send(err)
    } else {
      Sausage.find({}, (err, foundSausages) => {
        res.json(foundSausages)
      })
    }
  })
})

sausage.delete('/:id', (req, res) => {
  Sausage.findByIdAndRemove(req.params.id, (err, deleteSausage) => {
    Sausage.find({}, (err, foundSausages) => {
      res.json(foundSausages)
    })
  })
})

module.exports = sausage
