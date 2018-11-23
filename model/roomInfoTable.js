let mongoose = require('mongoose');
let moment = require('moment')

const Schema = mongoose.Schema;
const roomInfoSchema = new Schema({
    roomId : {type:Number, index:true},
    creater: Number,
    updateTime : {type:String,default:moment().format('YYYY-MM-DD')},
    type: String,
    people: Array,
})
// ContactSchema.index({ModID:1})
const roomInfo = mongoose.model('roomInfoTable',roomInfoSchema)
exports.roomInfoModel = roomInfo