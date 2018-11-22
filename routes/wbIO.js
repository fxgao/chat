let express = require('express');
let router = express.Router();
let path = require('path');
let  app = express();

/* GET users listing. */
router.get('/', function(req,res){
    res.send("gfx")
});

module.exports = router;
