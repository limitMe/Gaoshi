# Gaoshi
Gaoshi is a Node.js console running on Raspberry Pi to capture physical data and upload it to server

Gaoshi the name came from the famous poet who was living in frontier fortress. That reveals its origin purpose: monitor physical data in rural areas. And hopefully it has high adaptability as its name literally means. (Through sometimes this word sounds like playing with shit)

# Raspberry Pi Notes

##Camera

We use cameras from Waveshare.
- for photos `raspistill -o image.jpg`
- for videos `raspivid -o video.h264 -t 10000`