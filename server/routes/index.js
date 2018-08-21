var express = require("express");
var router = express.Router();

var AV = require("leancloud-storage");
var APP_ID = "vX74nS33rrQb4fjh12dSChnR-gzGzoHsz";
var APP_KEY = "knPdVAcpiDn7XP2FRMzUIdze";

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

/* GET home page. */
router.get("/", function(req, res) {
  try {
    var query = new AV.Query('list');
    query.find().then(function (list) {
      let aList = list.map((data) => {
        return data.toJSON();
      })
     res.json(aList);
    }).catch((e) => {
      console.log(e)
    });
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
