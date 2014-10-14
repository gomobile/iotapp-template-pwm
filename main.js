/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
/*global */

/*
Pulse Width Modulation, or PWM, is a technique for getting analog results with digital means.

A simple node.js application intended to read and write analog values to fade a LED from Digital pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/

var mraa = require("mraa"); //require mraa
//Initialize PWM on Digital Pin #3 (D3) and enable the pwm pin
var pwm3 = new mraa.Pwm(3, -1, false);
pwm3.enable(true);

//set the period in microseconds.
pwm3.period_us(2000);
var value = 0.0;

setInterval(function () {
    if (value >= 1.0) {
        value = 0.0;
    }
    
    value = value + 0.03;
    pwm3.write(value); //Write duty cycle value. 

    console.log(pwm3.read());//read current value that is set before.
}, 3000);