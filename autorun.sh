#!/bin/sh
node app
echo "Gaoshi is now watching you"

# Add executeable right: $ chmod 777 autorun.sh
# Go rc.local $ sudo nano /etc/rc.local
# Add before exit 0 $ su pi -c "exec /home/pi/Gaoshi/autorun.sh"