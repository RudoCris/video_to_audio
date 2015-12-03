var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './upload/'});
var request = require('request');
var exec = require('child_process').exec;
var child;

/* GET home page. */
router.post('/', upload.single('image'), function(req, res, next) {

  var command = ["avconv -i /home/ubuntu/projects/JavaScript/video_to_audio/",req.file.path, " -vn -f wav /home/ubuntu/projects/JavaScript/video_to_audio/upload/audio/", req.file.filename,".wav"].join('');
  child = exec(command, function (error, stdout, stderr) {
    console.log(stdout);
    var murl = ['http://159.122.249.236:3000/audio/',req.file.filename,'.wav'].join('')
    request('http://romancl.eu-gb.mybluemix.net/recognize?url='+murl, function (error, response, body){
      if (!error && response.statusCode == 200) {
          res.redirect('http://romancl.eu-gb.mybluemix.net/recognize?url='+murl);
      }
    })

    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  console.log(req.file);

})
.post('/audio', upload.single('track'), function (req, res, next) {
	console.log(req.file)
	res.redirect("http://ya.ru");
});


module.exports = router;
