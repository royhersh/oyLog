var Logger = require ('./index.js');
var log = new Logger;

log.start();
log.config.appName = "AutoAdi";
log.config.logFile = "./Hello.log";

//log.error.to.both ('oh No!');
log.message.to.screen('Only text without action');
log.message.to.file('Saying','Hello World');
log.error.to.screen("Something went wrong ","for real");
log.error.to.file("Just an error message without any other param");
console.log ("Total Errors: ", log.totalErrors);
log.end();