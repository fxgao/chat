let os = require('os')
console.log(os.hostname())
module.exports = {
    hostname: os.hostname(),
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