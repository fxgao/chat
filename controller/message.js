let express = require('express');
let path = require('path');
let uuidV1 = require('uuid/v1')
let moment = require('moment')

let chatInfoModel = require("./../model/chatInfoTable")
let chatContentItemSchema = chatInfoModel.chatContentItemSchema;
let chatInfoTableModel = chatInfoModel.chatInfoModel;
let userRoomModel = require("./../model/userRoomTable")
let userRoomTableModel = userRoomModel.userRoomTableModel;
let roomInfoModel = require("./../model/roomInfoTable")
let roomInfoTableModel = roomInfoModel.roomInfoModel;

function saveMessage(parmas, Modules, callBack) {
    let newchatInfoItem = {
        contentId: parmas.roomId + parmas.time,
        content: parmas.content,
        userId: parmas.userId,
        avarvlUrl: parmas.avarvlUrl || "default.png",
        nickName: parmas.nickName,
        time: parmas.time
    }
    Modules[0].chatContent = Modules[0].chatContent.concat(newchatInfoItem)
    chatInfoTableModel.findOneAndUpdate({ roomId: parmas.roomId }, Modules[0], { new: true }, function (err) {
        if (err) {
            console.log("更新chatInfo信息失败:" + err);
        } else {
            console.log("更新chatInfo信息成功！");
            chatInfoTableModel.find({ roomId: parmas.roomId, contentId: (parmas.roomId + parmas.time)},function (err,data) {
                let res = {
                    code: 1,
                    data: data
                }
                callBack(res)
            })
        }
    })
}

//用户未收到信息时，更新userRoom表中数据
function updateUserRoom(parma, callBack) {
    userRoomTableModel.find({ userId: parma.userId, roomId: parma.roomId }, function (err, Modules) {
        if (err) {
            console.error("查询用户userRoom表失败:" + err);
            return
        } else if (Modules.length) {
            console.log("用户数据查询成功！")
            let newRoomInfo = {
                updateTime: moment().format('YYYY-MM-DD'),
                noticeNum: Modules[0].noticeNum + 1
            };
            Modules[0] = Object.assign(Modules[0], newRoomInfo)
            userRoomTableModel.findOneAndUpdate({ userId: parma.userId, roomId: parma.roomId }, Modules[0], { new: true }, function (err, result) {
                if (err) {
                    console.log("更新用户userRoom信息失败:" + err);
                } else {
                    console.log("更新用户userRoom信息成功！");
                    let res = {
                        code: 1,
                        data: result
                    }
                    callBack(res)
                }
            });
        } else {
            console.log("没有查询到用户userRoom信息！")
        }
    })
}

//用户发送消息主函数,默认肯定能取到房间roomid
function sendMessage(parmas, callBack) {
    chatInfoTableModel.find({ roomId: parmas.roomId }, function (err, Modules) {
        if (err) {
            console.error("查询用户chatInfo表失败:" + err);
            return
        } else if (Modules.length) {
            console.log("用户chatInfo数据查询成功！")
            saveMessage(parmas, Modules, callBack)
        } else {
            console.log("没有查询到用户userRoom信息！")
        }
    })
}

exports.updateUserRoom = updateUserRoom
exports.sendMessage = sendMessage;