var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './upload/'});

var sys = require('sys')
var exec = require('child_process').exec;
var child;

/* GET home page. */
router.post('/', upload.single('image'), function(req, res, next) {

  var command = ["avconv -i ../",req.file.path, "-vn -f wav ../upload/audio/", req.file.filename,".wav"].join('');
  child = exec("pwd", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  console.log(req.file);
  res.json(204);
})
.post('/audio', upload.single('track'), function (req, res, next) {
	console.log(req.file)
	res.redirect("http://ya.ru");
});


module.exports = router;
