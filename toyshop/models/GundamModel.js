const mongoose = require('mongoose')
const schema = mongoose.Schema

var GundamSchema = new schema(
    {
        name: String,
        brand: String,
        grade: String,
        age_require: Number,
        made_in: String,
        image: String
    },
    {
        versionKey: false //optional (to remove _v: 0 when add new data)
    }
)
var GundamModel = mongoose.model("Gundam", GundamSchema, 'Gundam')
module.exports = GundamModel