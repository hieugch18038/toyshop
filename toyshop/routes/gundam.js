const express = require('express')
const { render } = require('../app')
const GundamModel = require('../models/GundamModel')
const router = express.Router()

router.get('/', (req, res) => {
    GundamModel.find((err, data) => {
        if (!err) {
            res.render('gundam/index', { gundams: data})
        }
    })
})
module.exports = router