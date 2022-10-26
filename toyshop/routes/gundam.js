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

router.get('/detail/:id', (req, res) => {
    GundamModel.findById(req.params.id, (err, gundam) => {
        if (!err) {
            res.render('gundam/detail', {gundam : gundam})
        }
    })
})
router.get('/delete/:id', (req, res) => {
    //params => truyen theo duong dan; body => chuyen theo form
    GundamModel.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        console.log(err)
      }else{
        console.log("delete success");

        // redirect ve trang /gundam(index)
        res.redirect("/gundam")
      }
    })
  })
  //render ra form Add
  router.get('/add', (req, res) => {
    res.render("gundam/add")
  })
  
  //nhận &xử lý dữ liệu từ form ADD
  router.post('/add', (req, res) => {
    var gundam = new GundamModel(req.body) ;
    gundam.save((err) => {
      if (!err) {
        console.log("Add success")
        res.redirect("/gundam")
      }
    })
  })
  
  //render ra form Edit
  router.get('/edit/:id', (req, res) => {
    GundamModel.findById(req.params.id, (err, data) => {
      if (!err) {
        //render ra file: update.hbs 
        //gửi kèm dữ liệu của object để load vào form edit
        //gundam (tên) , data (dữ liệu)
        res.render("gundam/edit", {gundam: data})
      }
    })
  })
  //nhận & xử lý dữ liệu từ form EDIT
  router.post('/edit/:id', (req, res) => {
    GundamModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (!err) {
        console.log ("Update success")
        res.redirect("/gundam")
      }
    })
  })
  
  router.post('/search', (req, res) => {
    console.log("test Search")
  
    GundamModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('gundam/index', { gundams: data })
        }
    })
  })

router.get('/list', (req, res) => {
    GundamModel.find((err, data) => {
        if(!err){
            res.render('gundam/list', {gundam: data})
        }
    })
})
router.post('/searchli', (req, res) => {
  console.log("test Search list")
  GundamModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
      if (!err) {
          res.render('gundam/list', { gundam: data })
      }
  })
})

module.exports = router