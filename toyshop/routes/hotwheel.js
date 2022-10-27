const express = require('express')
const HotwheelModel = require('../models/HotwheelModel')
const router = express.Router()

router.get('/', (req, res) => {
    HotwheelModel.find((err, data) => {
        if (!err) {
            res.render('hotwheel/index', { hotwheels: data})
        }
    })
})
router.get('/detail/:id', (req, res) => {
    HotwheelModel.findById(req.params.id, (err, hotwheel) => {
        if (!err) {
            res.render('hotwheel/detail', {hotwheel : hotwheel})
        }
    })
})
router.get('/delete/:id', (req, res) => {
    //params => truyen theo duong dan; body => chuyen theo form
    HotwheelModel.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        console.log(err)
      }else{
        console.log("delete success");

        // redirect ve trang /(index)
        res.redirect("/hotwheel")
      }
    })
  })
//render ra form Add
router.get('/add', (req, res) => {
    res.render("hotwheel/add")
  })
  
  //nhận &xử lý dữ liệu từ form ADD
  router.post('/add', (req, res) => {
    var hotwheel = new HotwheelModel(req.body) ;
    hotwheel.save((err) => {
      if (!err) {
        console.log("Add success")
        res.redirect("/hotwheel")
      }
    })
  })

//render ra form Edit
router.get('/edit/:id', (req, res) => {
    HotwheelModel.findById(req.params.id, (err, data) => {
      if (!err) {
        //render ra file: update.hbs 
        //gửi kèm dữ liệu của object để load vào form edit
        //gundam (tên) , data (dữ liệu)
        res.render("hotwheel/edit", {hotwheel: data})
      }
    })
  })
  //nhận & xử lý dữ liệu từ form EDIT
  router.post('/edit/:id', (req, res) => {
    HotwheelModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (!err) {
        console.log ("Update success")
        res.redirect("/hotwheel")
      }
    })
  })
router.get('/list', (req, res) => {
    HotwheelModel.find((err, data) => {
        if(!err){
            res.render('hotwheel/list', {hotwheel: data})
        }
    })
})
module.exports = router