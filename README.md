# oy-log
## Log text to screen, file or both. Uses simple semantic syntax

oy-log allows you to log messages and errors to screen and/or files

## Installation

	$ npm install oy-log

## Usage

All features snippet:

```javascript
// Init
var oylog = require('oy-log');
var log = new oylog();

// Config (optional)
log.config.appName = 'my-app'; // Will be displayed for each message
log.config.logFile = './app.log'; // Hold log messages
log.config.errorLogFile = './error.log'; // Hold error messages

// Money Time
log.start(); // put current date snapshot into log files

log.message.to.screen ('Hey, i\'m a message'); 
log.message.to.screen ('Action', 'I just did something');
log.message.to.file ('This message is shown only in app.log');
log.message.to.file ('Saved', 'A file has been saved');
log.message.to.both ('Action', 'This one will appear in both, file and screen');

log.error.to.screen ('Something went wrong...'); 
log.error.to.screen ('This is what went wrong: ', 'Capitalism');
log.error.to.file ('This error is shown only in error.log');
log.error.to.file ('Can\'t save file', 'something.json');
log.error.to.both ('Can\'t connect: ', 'Inner soul');

log.end(); // Will generate the log files 
```
Result on screen:\
![alt text](https://raw.githubusercontent.com/royhersh/oyLog/master/result_sample.png "oy-log result")

app.log:
```
Mon Apr 11 2016 11:24:56 GMT+0300 (Jerusalem Daylight Time)


[11:24:56] my-app: This message is shown only in app.log
[11:24:56] my-app: Saved: A file has been saved
[11:24:56] my-app: Action: This one will appear in both, file and screen


Total Run Time: 30ms
```
error.log:
```
Mon Apr 11 2016 11:24:56 GMT+0300 (Jerusalem Daylight Time)


[11:24:56] ERROR my-app: This error is shown only in error.log
[11:24:56] ERROR my-app: Can't save file: something.json
[11:24:56] ERROR my-app: Can't connect: : Inner soul


Total Run Time: 30ms
```

