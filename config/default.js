let os = require('os')
module.exports = {
    hostname: "localhost",
    port: 80,
    dburl: 'mongodb://127.0.0.1:27017/chat',
    session: {
        name:'SID',
        secret:'SID',
        cookie:{
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        }
    }
}