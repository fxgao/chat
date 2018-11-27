let mongoose = require('mongoose');
let moment = require('moment')

const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
const chatContentItem = new Schema({
    contentId : ObjectId,
    UserId : Number,
    avarvlUrl : String,
    nickName : String,
    time : Number
})
const chatContent = new Schema({
    ObjectId:[chatContentItem]
})
const chatSchema = new Schema({
    roomId : {type:Number, index:true},
    updateTime : {type:String,default:moment().format('YYYY-MM-DD')},
    chatContent: [chatContent]
})

const chatInfo = mongoose.model('chatInfoTable',chatSchema,"chatInfoTables")
const chatContentSchema = chatContent;
exports.chatContentSchema = chatContentSchema;
exports.chatInfoModel = chatInfo