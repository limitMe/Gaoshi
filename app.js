//Dependencies
//const PiCamera = require('pi-camera');
const OSS = require('ali-oss');

const config = require(`${ __dirname }/config.js`);

//Init dependency tool
/*
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 1920,
  height: 1280,
  nopreview: false,
});
*/

let client = new OSS({
  region: config.oss.region,
  accessKeyId: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
  bucket: config.oss.bucket
});

client.put('name', `${ __dirname }/test.png`).then(function (r1) {
  console.log('put success: %j', r1);
}).catch(function (err) {
  console.error('error: %j', err);
});

/*
myCamera.snap()
  .then((result) => {
    console.log("Yes the picture has been taken")
  })
  .catch((error) => {
    console.log(error)
  });
*/