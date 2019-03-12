const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 1920,
  height: 1280,
  nopreview: false,
});

myCamera.snap()
  .then((result) => {
    console.log("Yes the picture has been taken")
  })
  .catch((error) => {
    console.log(error)
  });