let express = require('express');
let sio = require("socket.io")
let path = require('path');

let userRoomModel = require("./../model/userRoomTable")
let userRoomTableModel = userRoomModel.userRoomTableModel;

function checkUserLogin(parma,callBack) {
    userRoomTableModel.find({userId:parma.userId}, function (err, Modules) {
        if (err) {
            console.error(err);
            let res = {
                code:"error",
                data:err
            }
            callBack(res)
        } else if (Modules.length) {
            let res = {
                code:1201,
                data:Modules
            }
            callBack(res)
        } else {
            let newURTM = new userRoomTableModel();
            newURTM.userId = parma.userId;
            newURTM.room = [];
            newURTM.save(function (err,Modules) {
                if (err) {
                    console.log("Failed save data:" + err);
                    let res = {
                        code:"error",
                        data:err
                    }
                    callBack(res)
                } else {
                    let res = {
                        code:1,
                        data:Modules
                    }
                    callBack(res)
                }
            });
        }
    })
}

module.exports = checkUserLogin