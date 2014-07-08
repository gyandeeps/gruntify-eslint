var path = require("path");

module.exports = function(grunt){
    grunt.registerMultiTask("eslint", "Validate files with ESLint", function(){
        var eslint = require("eslint").cli;
        var options = this.options();

        if(this.filesSrc.length === 0){
            return console.log("No Files specified");
        }

        options._ = this.filesSrc;
        options.config = options.config ? path.resolve(options.config) : "";

        return eslint.execute(options) === 0;
    });
};