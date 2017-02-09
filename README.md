Intel® XDK IoT Node.js* PWM App
===============================
See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

App Overview
------------
A simple Node.js application that programs an onboard digital output for
PWM (Pulse Width Modulation) mode, on select Intel IoT development boards.
The PWM duty-cycle is changed over a predefined range. Optionally, you
can attach an external LED to the PWM pin and change the duty-cycle in the
app to see how the PWM duty-cycle can be used to modify the intensity of
that LED.

The app initializes a single digital pin to PWM mode and changes the duty-cycle
every two seconds as it cycles through a range of duty-cycles. It reads the
current duty-cycle and prints the result of each read to the console. The
specific pin that is used as a PWM driver is configured in `cfg-app-platform.js`
and can be identified by looking for lines similar to the following line of
code, in the `cfg.init` method:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    io = opt.altPin ? io : 3 ;              // use alternate pin?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the example shown above, PWM "pin 3" will be used for the digital output.

**IMPORTANT:** the pin that is configured by the sample is a function of the
detected board. You **must** inspect the code to determine which pin is being
configured for use on your board!!

Once you have identified the PWM pin that is being written, you can use a jumper
wire and a scope or digital multimeter to monitor the voltage of that digital
output, by connecting one end of the jumper wire to the digital output and the
other end of the jumper to your measurement device.

Most boards have many pins that can be configured for use to create a PWM signal.
The `cfg-app-platform.js` module has been designed so you can override the pin
that is used, by passing it an alternate pin during the init call (see the module
documentation). Or, you can simply modify the code to change the default value.

Important App Files
-------------------
* main.js
* package.json

Important Project Files
-----------------------
* README.md
* LICENSE.md
* <project-name>.xdk

Tested IoT Node.js Platforms
----------------------------
* [Intel® Galileo Board](http://intel.com/galileo)
* [Intel® Edison Development Platform](http://intel.com/edison)
* [Intel® Joule™ 570x Developer Kit](http://intel.com/joule)

This sample can run on other IoT [Node.js](http://nodejs.org) development
platforms, that include the appropriate sensor hardware, but may require
changes to the I/O initialization and configuration code in order to work on
those other platforms.
