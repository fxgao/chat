let mongoose = require('mongoose');
let moment = require('moment')

const Schema = mongoose.Schema;
const roomInfoSchema = new Schema({
    roomId : {type:String, index:true},
    creater: Number,
    updateTime : {type:String,default:moment().format('YYYY-MM-DD')},
    type: {type:String,default: 1},
    people: {type:Array,default: []},
})
// ContactSchema.index({ModID:1})
const roomInfo = mongoose.model('roomInfoTable',roomInfoSchema,"roomInfoTables")
exports.roomInfoModel = roomInfo