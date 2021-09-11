// @ts-check

const path = require("path");

module.exports = function(grunt){
    grunt.registerMultiTask("eslint", "Validate files with ESLint", async function(){
        const ESLint = require("eslint").ESLint;
        const eslint = new ESLint();;
        const options = this.options({
            "silent": false,
            "quiet": false,
            "maxWarnings": -1,
            "format": "stylish",
            "callback": "false",
            "terminateOnCallback": "true"
        });

        // This task is async.
        var done = this.async()

        if(this.filesSrc.length === 0){
            grunt.log.writeln("No Files specified");
            return done()
        }

        /** @type {import('eslint').ESLint.LintResult[]} */
        let results;

        try{
            results = await eslint.lintFiles(this.filesSrc);
        }
        catch(err){
            grunt.warn(err);
            return done(false);
        }

        if(options.callback && options.callback.constructor === Function){
            if(options.terminateOnCallback) {
                return done(await options.callback(results));
            }
            results = (await options.callback(results)) || results;
        }

        const formatter = await eslint.loadFormatter(options.format);

        if (!formatter) {
            grunt.warn("Formatter " + options.format + " not found");
            return done();
        }

        if (options.fix) {
            await ESLint.outputFixes(results);
        }

        if (options.quiet) {
            results = ESLint.getErrorResults(results);
        }

        const report = formatter.format(results);

        if (options.outputFile) {
            grunt.file.write(options.outputFile, report);
            grunt.log.writeln('Report written to ' + options.outputFile);
        } else {
            grunt.log.writeln(report);
        }

        let warningCount = 0
        let errorCount = 0

        for (const result of results) {
            warningCount += result.warningCount
            errorCount += result.errorCount
        }

        if(options.silent){
            return done(true);
        }
        else if(options.maxWarnings > -1 && warningCount > options.maxWarnings){
            grunt.warn("More than "+options.maxWarnings+" warnings.");
            return done(false);
        }
        else{
            return done(errorCount === 0);
        }
    });
};
