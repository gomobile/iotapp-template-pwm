/**
 * @file
 * A simple Node.js IoT app that generates a PWM signal using a built-in
 * PWM digital I/O pin, on select Intel IoT development boards. Optionally,
 * use the PWM signal to control the intensity of an attached LED.
 *
 * Supported Intel IoT development boards are identified in the code.
 * See the `cfg-app-platform.js` file for board configuration details.
 *
 * <https://software.intel.com/en-us/xdk/docs/using-templates-nodejs-iot>
 *
 * @author Paul Fischer, Intel Corporation
 * @author Elroy Ashtian, Intel Corporation
 * @author Dan Yocom, Intel Corporation
 *
 * @copyright (c) 2016-2017, Intel Corporation
 * @license BSD-3-Clause
 * See LICENSE.md for complete license terms and conditions.
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;



var APP_NAME = "IoT PWM" ;
var Cfg = require("./utl/cfg-app-platform.js") ;    // get Cfg() constructor
var cfg = new Cfg() ;                               // init and config I/O resources

console.log("\n\n\n\n\n\n") ;                       // poor man's clear console
console.log("Initializing " + APP_NAME) ;

process.on("exit", function(code) {                 // define up front, due to no "hoisting"
    clearInterval(intervalID) ;
    console.log(" ") ;
    console.log("Exiting " + APP_NAME + ", with code:", code) ;
    console.log(" ") ;
}) ;


// confirm that we have a version of libmraa and Node.js that works
// exit this app if we do not

cfg.identify() ;                // prints some interesting platform details to console

if( !cfg.test() ) {
    process.exit(1) ;
}

if( !cfg.init() ) {
    process.exit(2) ;
}


// configure (initialize) our I/O pins for usage (gives us an I/O object)
// configuration is based on parameters provided by the call to cfg.init()

cfg.io = new cfg.mraa.Pwm(cfg.ioPin, cfg.ioOwner, cfg.ioChipId) ;
cfg.io.enable(true) ;                   // enable the PWM pin for use

console.log("Using PWM pin number: " + cfg.ioPin) ;


// sweep thru a range of PWM duty cycles
// maintain a single PWM periodic interval

cfg.io.period_us(2000) ;                        // set PWM period in microseconds (us)
var pwmDutyCycle = 0.00 ;                       // starting PWM duty-cycle (percent/100)
var periodicActivity = function() {
    cfg.io.write(pwmDutyCycle) ;                // set PWM duty-cycle to desired value
    process.stdout.write(cfg.io.read().toFixed(2)*100 + "% ") ; // duty-cycle % to console
    pwmDutyCycle += 0.10 ;                      // add 10% for the next interval
    if( pwmDutyCycle.toFixed(2) > 1.00 )
        pwmDutyCycle = 0.00 ;                   // reset duty-cycle to zero
} ;
var intervalID = setInterval(periodicActivity, 2000) ;  // start the periodic sweep
