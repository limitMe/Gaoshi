//Dependencies
const PiCamera = require('pi-camera');
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
    return Jimp.read(`${ __dirname }/test.jpg`)
  }).then(result => {
    console.log("Uncompressed picture read")
    return result
      .quality(50) // set JPEG quality
      .write(`${ __dirname }/compressed/test.jpg`);
  }).then(result => {
    console.log("Conpression complete!")
    return client.put('name', `${ __dirname }/compressed/test.jpg`)
  }).then(function (r1) {
    console.log('put success: %j', r1);
  })