# Gaoshi
Gaoshi is a Node.js console running on Raspberry Pi to capture physical data and upload it to server

Gaoshi the name came from the famous poet who was living in frontier fortress. That reveals its origin purpose: monitoring physical data in rural areas. And hopefully it has high adaptability as its name literally means. (Through sometimes this word sounds like playing with shit)

# Raspberry Pi Notes

## Camera

We use cameras from Waveshare.
- for photos `raspistill -o image.jpg`
- for videos `raspivid -o video.h264 -t 10000`

## 4G LTE

## Node.js Environment

https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/

We also use git to pull all of our codes onto Raspberry Pi. Defaultly we use `~` folder.

`npm install rpio` We use `https://github.com/jperkin/node-rpio` as our default RPIO dependency.

`npm install ali-oss` provides cloud storage service