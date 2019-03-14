//Dependencies
const PiCamera = require('pi-camera');
const OSS = require('ali-oss');
var Jimp = require('jimp');

const config = require(`${ __dirname }/config.js`);

const client = new OSS({
  region: config.oss.region,
  accessKeyId: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
  bucket: config.oss.bucket
});

function checkZero(i) 
{
    if (i < 10) {
        i = "0" + i
    }; 
    return i;
}

function generateTimeFlag() {
  let d = new Date();

  var year  = d.getFullYear();
  var month = d.getMonth() + 1;
  var day   = d.getDate(); 
  var hour = d.getHours();
  var min = d.getMinutes();

  month = month.checkZero()
  day = day.checkZero()
  hour = hour.checkZero()
  min = min.checkZero()

  return "" + year + month + day + hour + min
}

function monitor() {
  let myCamera = new PiCamera({
    mode: 'photo',
    output: `${ __dirname }/`+ picTimeFlag +`.jpg`,
    width: 1920,
    height: 1280,
    nopreview: false,
  });

  myCamera.snap()
  .then((result) => {
    console.log("A picture has been taken")
    return Jimp.read(`${ __dirname }/`+ picTimeFlag +`.jpg`)
  }).then(result => {
    console.log("Uncompressed picture read")
    return result
      .quality(50) // set JPEG quality
      .write(`${ __dirname }/compressed/`+ picTimeFlag +`.jpg`);
  }).then(result => {
    console.log("Conpression complete!")
    return client.put('name', `${ __dirname }/compressed/`+ picTimeFlag +`.jpg`)
  }).then(function (r1) {
    console.log('put success: %j', r1);
  })
}


setInterval(() => {
  monitor()
}, 60*1000);