//Dependencies
//const PiCamera = require('pi-camera');
const OSS = require('ali-oss');
var Jimp = require('jimp');

const config = require(`${ __dirname }/config.js`);

//Init dependency tool
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 1920,
  height: 1280,
  nopreview: false,
});

let client = new OSS({
  region: config.oss.region,
  accessKeyId: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
  bucket: config.oss.bucket
});

myCamera.snap()
  .then((result) => {
    console.log("A picture has been taken")
    Jimp.read(`${ __dirname }/test.jpg`)
      .then(result => {
        return result
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write(`${ __dirname }/compressed/test.jpg`); // save
      }).then(result => {
        client.put('name', `${ __dirname }/compressed/test.jpg`)
          .then(function (r1) {
            console.log('put success: %j', r1);
          }).catch(function (err) {
            console.error('OSS error: %j', err);
      })
      .catch(err => {
        console.error("Compression error: %j",err);
      });
  })
  .catch((error) => {
    console.log('Camera error: %j', error)
  });


 

