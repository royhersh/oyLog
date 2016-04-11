/* Dependencies */
var color = require('cli-color'); // Allow print colors to CLI
var path = require ('path');
var fs = require ('fs');
var mkdirp = require('mkdirp'); // Creating folders from a path
var TxtFile = require('./TxtFile.js'); // TXT File class. 

/* Files Declaration */


function Logger() {
    var self = this;
    
    var logFile = new TxtFile();
    var errorFile = new TxtFile();
    
    this.config = {
        appName : 'Oy Log',
        logFile: './oy-log.log',
        errorLogFile: './oy-error.log'
    };
    this.totalErrors = 0;
    
    function _start() {
        this.start_time = new Date;
        logFile.addText(this.start_time.toString()).newLine().newLine();
        errorFile.addText(this.start_time.toString()).newLine().newLine();
    }
    
    function _end() {
        this.end_time = new Date();
        this.totalMs = this.end_time.getTime() - this.start_time.getTime() ;
        logFile.newLine().addText('Total Run Time: '+ this.totalMs + "ms");
        logFile.dumpFile(this.config.logFile);
        errorFile.newLine().addText('Total Run Time: '+ this.totalMs + "ms");
        errorFile.dumpFile(this.config.errorLogFile);        
    }
    
    function _printToScreen() {
        var d = new Date();
        var now = d.toLocaleTimeString();
        switch (arguments.length) {
            case 1:
                 var msg = arguments[0];
                 var toLog = color.white(msg);
                 break;
            case 2:
                 var action = arguments[0];
                 var msg = arguments[1];
                 var toLog = color.greenBright(""+ action +": ") + color.white(msg);
        }
        console.log (color.whiteBright('[') + color.blackBright(now) + color.whiteBright('] ') + color.cyanBright(self.config.appName + ": ") + toLog);
    }
    
    function _printErrorToScreen() {
        var d = new Date();
        var now = d.toLocaleTimeString();
        switch (arguments.length) {
            case 1:
                 var msg = arguments[0];
                 var toLog = msg;
                 break;
            case 2:
                 var msg = arguments[0];
                 var inPurple = arguments[1];
                 var toLog = msg + color.magentaBright(inPurple);
        }
        console.log (color.whiteBright('[') + color.blackBright(now) + color.whiteBright('] ') + color.whiteBright.bgRed("ERROR") + ' ' + color.cyanBright(self.config.appName + ": ") + toLog);
    }    
    
    function _logMsgToFile() {
        var d = new Date();
        var now = d.toLocaleTimeString();
        switch (arguments.length) {
            case 1:
                 var msg = self.config.appName + ': ' + arguments[0];
                 break;
            case 2:
                 var msg = self.config.appName + ': ' + arguments[0]+': '+arguments[1];
        }        
        logFile.addText('[' + now + '] ' + msg + '\r\n')            
    }
    
    function _logErrorToFile() {
        var d = new Date();
        var now = d.toLocaleTimeString();
        switch (arguments.length) {
            case 1:
                 var msg = self.config.appName + ': ' + arguments[0];
                 break;
            case 2:
                 var msg = self.config.appName + ': ' + arguments[0]+': '+arguments[1];
        }        
        errorFile.addText('[' + now + '] ERROR ' + msg + '\r\n');            
    }    
    
    this.start = _start;
    this.end = _end;
    
    this.message = {
        to: {
            screen: _printToScreen,
            file:  _logMsgToFile,
            both: function(){
                _printToScreen.apply(this, arguments);
                _logMsgToFile.apply(this, arguments);
            }
        }
    };
    
    this.error = {
        to: {
            screen: function() {
                self.totalErrors++;
                _printErrorToScreen.apply(this, arguments);
            },
            file: function() {
                self.totalErrors++;
                 _logErrorToFile.apply(this, arguments);
            },
            both: function() {
                self.totalErrors++;
                _printErrorToScreen.apply(this, arguments);
                _logErrorToFile.apply(this, arguments);
            }
        }
    }
    
}

module.exports = Logger;