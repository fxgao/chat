let mongoose = require('mongoose');
let moment = require('moment')

const Schema = mongoose.Schema;
const roomItem = new Schema({
    roomId : {type:Number, index:true},
    createrId: Number,
    updateTime : {type:String,default:moment().format('YYYY-MM-DD')},
    memberName : Array,
    avatralUrl: String,
    noticeNum: Number
})
const userInfoSchema = new Schema({
    userId:{type:Number, index:true},
    room:[roomItem]
})
// ContactSchema.index({ModID:1})
const userInfo = mongoose.model('userRoomTable', userInfoSchema,'userRoomTables')
exports.userRoomTableModel = userInfo