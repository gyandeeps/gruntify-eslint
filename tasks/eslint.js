var path = require("path");

module.exports = function(grunt){
    grunt.registerMultiTask("eslint", "Validate files with ESLint", function(){
        var eslint = require("eslint").cli;
        var response;
        var silent;
        var options = this.options({
            "silent": false
        });

        if(this.filesSrc.length === 0){
            return console.log("No Files specified");
        }
        options._ = this.filesSrc;

        silent = options.silent;
        delete options.silent;

        options.config = options.config ? path.resolve(options.config) : "";
        response = eslint.execute(options);

        if(silent){
            return true;
        }
        else{
            return response === 0;
        }

    });
};