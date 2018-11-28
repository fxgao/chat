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

function createUserRoomInfo(parma, callBack) {
    let newRoomInfo = new roomInfoTableModel();
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
            let res = {
                code: "error",
                data: err
            }
            return res
        } else {
            console.log("创建房间成功!");
            let res = {
                code: 1,
                data: data
            }
            //房间创建成功，更新用户userRoom表
            userRoomTableModel.find({ userId: parma.creater }, function (err, Modules) {
                if (err) {
                    console.error("查询用户userRoom表失败:" + err);
                    return
                } else if (Modules.length) {
                    console.log("用户数据查询成功！")
                    let oldValue = Modules[0];
                    let newRoomInfo = {
                        roomId: s_uuidV1,
                        createrId: parma.creater,
                        updateTime: nowTime,
                        memberName: parma.people,
                        avatralUrl: "default.png",
                        noticeNum: 0
                    };
                    let newValue = Object.assign(oldValue.room, newRoomInfo);
                    userRoomTableModel.update(oldValue, newValue, function (err, result) {
                        if (err) {
                            console.log("更新用户userRoom信息失败:" + err);
                        } else {
                            console.log("更新用户userRoom信息成功！");
                            return res
                        }
                    });
                } else {
                    console.log("没有查询到用户userRoom信息！")
                }
            })
        }
    })
}

function retrunUserRoomInfo(params,callBack) {
    
}

//查询用户房间是否存在主函数
function checkUserRoomExist(params,callBack) {
    let nRoomId = params.roomId;
    if (nRoomId) {
        //查询房间是否存在
        searchChatInfoTable(params, nRoomId, callBack)
    }else{
        createRoom(parma, callBack)
    }
}

function searchChatInfoTable(params, callBack) {
    userRoomTableModel.find({ userId: parma.userId }, function (err, Modules) {
        if (err) {
            console.error(err);
            return
        } else if (Modules.length) {
            console.log("用户数据查询成功！")
            retrunUserRoomInfo(Modules, callBack)
        } else {
            console.log("创建用户数据ing！")
            createUserRoomInfo(params, callBack)
        }
    })
}

module.exports = checkUserRoomExist