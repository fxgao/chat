let express = require('express');
let sio = require("socket.io")
let path = require('path');

let userRoomModel = require("./../model/userRoomTable")
let userRoomTableModel = userRoomModel.userRoomTableModel;

//返回查询到的用户数据函数
function retrunUserRoomInfo(params, callBack) {
    callBack(params)
}

//创建用户userRoomInfo数据函数
function createUserRoomInfo(params, callBack) {
    let newURTM = new userRoomTableModel();
    newURTM.userId = params.userId;
    newURTM.room = [];
    newURTM.save(function (err, Modules) {
        if (err) {
            console.log("创建用户userRoom信息失败：" + err);
            let res = {
                code: "error",
                data: err
            }
            callBack(res)
        } else {
            console.log("创建用户userRoom信息成功")
            let res = {
                code: 1,
                data: Modules
            }
            callBack(res)
        }
    });
}
//查询用户是否存在主函数
function checkUserExist(params, callBack) {
    userRoomTableModel.find({ userId: params.userId }, function (err, Modules) {
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

// function checkUserLogin(parma,callBack) {
//     userRoomTableModel.find({userId:parma.userId}, function (err, Modules) {
//         if (err) {
//             console.error(err);
//             let res = {
//                 code:"error",
//                 data:err
//             }
//             callBack(res)
//         } else if (Modules.length) {
//             let res = {
//                 code:1201,
//                 data:Modules
//             }
//             callBack(res)
//         } else {
//             let newURTM = new userRoomTableModel();
//             newURTM.userId = parma.userId;
//             newURTM.room = [];
//             newURTM.save(function (err,Modules) {
//                 if (err) {
//                     console.log("Failed save data:" + err);
//                     let res = {
//                         code:"error",
//                         data:err
//                     }
//                     callBack(res)
//                 } else {
//                     let res = {
//                         code:1,
//                         data:Modules
//                     }
//                     callBack(res)
//                 }
//             });
//         }
//     })
// }

module.exports = checkUserExist