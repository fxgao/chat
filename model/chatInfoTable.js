let mongoose = require('mongoose');
let moment = require('moment')

const Schema = mongoose.Schema;
const chatContentItem = new Schema({
    contentId : Number,
    UserId : Number,
    avarvlUrl : String,
    nickName : String,
    time : Number
})
const chatContent = new Schema({
    [contentId]:[chatContentItem]
})
const chatSchema = new Schema({
    roomId : {type:Number, index:true},
    updateTime : {type:String,default:moment().format('YYYY-MM-DD')},
    chatContent: [chatContent]
})
// ContactSchema.index({ModID:1})
const chatInfo = mongoose.model('chatInfoTable',chatSchema)
exports.chatInfoModel = chatInfo