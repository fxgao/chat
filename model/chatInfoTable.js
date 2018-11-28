let mongoose = require('mongoose');
let moment = require('moment')

const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
const chatContentItem = new Schema({
    contentId : ObjectId,
    userId : Number,
    avarvlUrl : String,
    nickName : String,
    time : Number
})
const chatContents = new Schema({
    ObjectId:[chatContentItem]
})
const chatSchema = new Schema({
    roomId : {type:Number, index:true},
    updateTime : {type:String,default:moment().format('YYYY-MM-DD')},
    chatContent: [chatContents]
})

const chatInfo = mongoose.model('chatInfoTable',chatSchema,"chatInfoTables")
const chatContentItemSchema = chatContentItem;
exports.chatContentItemSchema = chatContentItemSchema;
exports.chatInfoModel = chatInfo