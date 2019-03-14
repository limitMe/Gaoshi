//Dependencies
//const PiCamera = require('pi-camera');
const OSS = require('ali-oss');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');

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
    imagemin([`${ __dirname }/test.jpg`], `${ __dirname }/compressed`, {
      plugins: [
          imageminJpegtran()
      ]
      })
      .then((result) => {
        console.log('compression complete');
        client.put('name', `${ __dirname }/compressed/test.jpg`)
        .then(function (r1) {
          console.log('put success: %j', r1);
      }).catch(function (err) {
        console.error('OSS error: %j', err);
      });
    }).catch((error) => {
        console.log('Compression error: %j', error)
    })
  })
  .catch((error) => {
    console.log('Camera error: %j', error)
  });


 

