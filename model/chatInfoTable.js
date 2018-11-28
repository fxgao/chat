let mongoose = require('mongoose');
let moment = require('moment')

const Schema = mongoose.Schema;
const chatContentItem = new Schema({
    contentId: { type: String, index: true },
    content: String,
    userId : Number,
    avarvlUrl : String,
    nickName : String,
    time : String
})
const chatSchema = new Schema({
    roomId : {type:String, index:true},
    updateTime : {type:String,default:moment().format('YYYY-MM-DD')},
    chatContent: [chatContentItem]
})

const chatInfo = mongoose.model('chatInfoTable',chatSchema,"chatInfoTables")
const chatContentItemSchema = chatContentItem;
exports.chatContentItemSchema = chatContentItemSchema;
exports.chatInfoModel = chatInfo