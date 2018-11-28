let express = require('express');
let path = require('path');
let uuidV1 = require('uuid/v1')
let moment = require('moment')

let chatInfoModel = require("../model/chatInfoTable")
let chatInfoTableModel = chatInfoModel.chatInfoModel;
let userRoomModel = require("../model/userRoomTable")
let userRoomTableModel = userRoomModel.userRoomTableModel;
let roomInfoModel = require("../model/roomInfoTable")
let roomInfoTableModel = roomInfoModel.roomInfoModel;


function retrunchatInfo(Modules, callBack) {
    let nRoomId = Modules.roomId;
    chatInfoTableModel.find({ roomId: nRoomId }, function (err, data) {
        if (err) {
            console.error("聊天信息查询失败:" + err);
            return
        } else if (data.length) {
            console.log("聊天数据查询成功！")
            let res = {
                code: 1,
                data: data
            }
            callBack(res);
        } else {
            console.log("聊天数据不存在")
            let res = {
                code: 1201,
                data: {}
            }
            callBack(res);
        }
    })
}
//查询房间是否存在函数
function searchRoomInfo(params, nRoomId, callBack) {
    roomInfoTableModel.find({ roomId: nRoomId }, function (err, Modules) {
        if (err) {
            console.error("房间信息查询失败:" + err);
            return
        } else if (Modules.length) {
            console.log("房间数据查询成功！")
            retrunchatInfo(Modules, callBack)
        } else {
            console.log("数据不存在,创建数据ing！")
            createRoomInfo(params, callBack)
        }
    })
}
//创建房间信息函数
function createRoomInfo(parma, callBack) {
    let newRoomInfo = new roomInfoTableModel();
    let newChatInfo = new chatInfoTableModel();
    let s_uuidV1 = uuidV1()
    let nowTime = moment().format('YYYY-MM-DD')
    newRoomInfo.roomId = s_uuidV1;
    newRoomInfo.updateTime = nowTime;
    newRoomInfo.creater = parma.creater;
    newRoomInfo.type = parma.people.length > 2 ? 2 : 1;
    newRoomInfo.people = parma.people;
    newRoomInfo.save(function (err, data) {
        if (err) {
            console.log("创建房间失败:" + err);
        } else {
            console.log("创建房间成功!");
            //创建房间聊天信息
            newChatInfo.roomId = s_uuidV1;
            newChatInfo.updateTime = nowTime;
            newChatInfo.chatContent = [];
            newChatInfo.save(function (err, data) {
                if (err) {
                    console.error("保存chatInfo表失败:" + err);
                    return
                } else {
                    console.log("新建聊天信息成功！", data)
                }
            })
            //更新用户userRoom表
            userRoomTableModel.find({ userId: parma.creater }, function (err, Modules) {
                if (err) {
                    console.error("查询用户userRoom表失败:" + err);
                    return
                } else if (Modules.length) {
                    console.log("用户数据查询成功！")
                    let newRoomInfo = {
                        roomId: s_uuidV1,
                        createrId: parma.creater,
                        updateTime: nowTime,
                        memberName: parma.people,
                        avatralUrl: "default.png",
                        noticeNum: 0
                    };
                    Modules[0].room = Modules[0].room.concat(newRoomInfo)
                    userRoomTableModel.update({userId: parma.creater}, Modules[0], function (err, result) {
                        let res = {
                            code:1,
                            data:result
                        }
                        if (err) {
                            console.log("更新用户userRoom信息失败:" + err);
                        } else {
                            console.log("更新用户userRoom信息成功！");
                            callBack(res)
                        }
                    });
                } else {
                    console.log("没有查询到用户userRoom信息！")
                }
            })
        }
    })
}

//查询用户房间是否存在主函数
function checkRoomInfoExist(params, callBack) {
    let nRoomId = params.roomId;
    if (nRoomId) {
        searchRoomInfo(params, nRoomId, callBack)
    } else {
        createRoomInfo(parma, callBack)
    }
}

module.exports = checkRoomInfoExist