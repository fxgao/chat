let mongoose = require('mongoose');
let config = require('config-lite')(__dirname)
let chalk = require('chalk');

// mongoose.connect(config.dburl)
mongoose.Promise = global.Promise

const db = mongoose.connection
db.once('open', () => {
    console.log(chalk.green('成功连接数据库o(≧v≦)o~~'))
})
db.on('error', (error) => {
    console.error(chalk.red('Error in MongoDB connection: ' + error))
    mongoose.disconnect()
})
db.on('close', () => {
    console.log(chalk.red('数据库断开了o(>﹏<)o,快重新连接数据库'))
    mongoose.connect(databaseurl, { server: { auto_reconnect: true } })
})

exports.connect = function (callback) {
    mongoose.connect(config.dburl);
}
exports.disconnect = function (callback) {
    mongoose.disconnect(callback);
}