let express = require('express');
let path = require('path');
let uuidV1 = require('uuid/v1')
let moment = require('moment')

let chatInfoModel = require("./../model/chatInfoTable")
let chatInfoTableModel = chatInfoModel.chatInfoModel;
let userRoomModel = require("./../model/userRoomTable")
let userRoomTableModel = userRoomModel.userRoomTableModel;
let roomInfoModel = require("./../model/roomInfoTable")
let roomInfoTableModel = roomInfoModel.roomInfoModel;

function saveChatInfoTable() {

}

function saveRoomInfoTable() {

}

function sendMessage(parma, callBack) {

}

function updateUserRoomInfo(parma, callBack){

}

function createChat(parma, callBack){

}

function createRoom(parma, callBack) {
    let newRoomInfo = new roomInfoTableModel();
    let s_uuidV1 = uuidV1()
    newRoomInfo.roomId = s_uuidV1;
    newRoomInfo.updateTime = moment().format('YYYY-MM-DD');
    newRoomInfo.creater = parma.creater;
    newRoomInfo.type = parma.people.length > 2 ? 2 : 1;
    newRoomInfo.people = parma.people;
    newRoomInfo.save(function (err, data) {
        if (err) {
            console.log("Failed save data:" + err);
            let res = {
                code: "error",
                data: err
            }
            callBack(res)
        } else {
            console.log("Save data success!");
            let res = {
                code: 1,
                data: data
            }
            callBack(res)
        }
    })
}
exports.sendMessage = sendMessage;
exports.createChat = createChat;