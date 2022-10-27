const mongoose = require('mongoose')
const schema = mongoose.Schema

var HotwheelSchema = new schema(
    {
        name: String,
        seri: String,
        price: Number,
        made_in: String,
        image: String
    },
    {
        versionKey: false //optional (to remove _v: 0 when add new data)
    }
)
var HotwheelModel = mongoose.model("hotwheel", HotwheelSchema, 'hotwheel')
module.exports = HotwheelModel