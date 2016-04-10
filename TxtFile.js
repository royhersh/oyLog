/* Dependencies */

var path = require ('path');
var fs = require ('fs');
var mkdirp = require('mkdirp');

// TXT file type class
function TxtFile(){
	
	/* CONSTRACTOR */

	
	// Initiate data.
		this.data = "";
	

	/* METHODS */
	this.addText = function(text) {
		this.data += text;
		return this;
	}

	this.newLine = function() {
		this.data += "\n\r";
		return this;
	}	
	
	//print the result as in ini file
	this.dumpFile = function(target) {
		var fileTargetPath = target;
		mkdirp.sync(path.dirname(fileTargetPath));
        fs.writeFileSync(fileTargetPath, this.data);
		
	}

	return this;
}

module.exports = TxtFile;