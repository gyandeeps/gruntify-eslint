[![NPM version](https://badge.fury.io/js/grunt-contrib-eslint.svg)](http://badge.fury.io/js/grunt-contrib-eslint)

grunt-contrib-eslint
====================

Grunt plugin for Eslint

## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```bash
$ npm install --save-dev grunt-contrib-eslint
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-contrib-eslint");
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

See the grunt [docs](https://github.com/gruntjs/grunt/wiki) on how to [configure tasks](https://github.com/gruntjs/grunt/wiki/Configuring-tasks) and more advanced usage.

### Example

```js
grunt.initConfig({
	eslint: {					
		src: ["app.js"]
	}
});

grunt.loadNpmTasks("grunt-contrib-eslint");
grunt.registerTask("default", ["eslint"]);
```

### Example with custom config and rules

```js
grunt.initConfig({
	eslint: {					
		options: {
			config: "conf/eslint.json",	
			rulesdir: ["conf/rules"]		
		},
		src: ["app.js"]
	}
});

grunt.loadNpmTasks("grunt-contrib-eslint");
grunt.registerTask("default", ["eslint"]);
```

### Example with custom formatter

```js
grunt.initConfig({
	eslint: {						
		options: {
			format: "./formatter/htmlTable"
		},
		src: ["app.js"]		
	}
});

grunt.loadNpmTasks("grunt-contrib-eslint");
grunt.registerTask("default", ["eslint"]);
```

### Example with custom rules for node and browser files

```js
grunt.config.init({
  eslint: {
    nodeFiles: {
      src: ["server/**/*.js"],
      options: {
        config: "conf/eslint-node.json"
      }
    },

    browserFiles: {
      src: ["client/**/*.js"]
      options: {
        config: "conf/eslint-browser.json"
      }
    }
  }
});

grunt.loadNpmTasks("grunt-contrib-eslint");
grunt.registerTask("default", ["eslint"]);
```

### Example with silent option

```js
grunt.initConfig({
	eslint: {						
		options: {
			format: "./formatter/htmlTable",
			silent: true
		},
		src: ["app.js"]		
	}
});

grunt.loadNpmTasks("grunt-contrib-eslint");
grunt.registerTask("default", ["eslint"]);
```

  
### Options

#### config

Type: `path::String`  

#### rulesdir

Type: `[path::String]`  
Default: [built-in rules directory](https://github.com/nzakas/eslint/tree/master/lib/rules)

#### format

Type: `String`  
Default: `'stylish'`

Name of a [built-in formatter](https://github.com/nzakas/eslint/tree/master/lib/formatters) or path to a custom one.

#### silent

Type: `Boolean`

Whether the grunt task would fail on error or will it alwways pass irrespective of the results.
i.e. to supress the failure.
This option is not passed to the eslint api.

** More information about options: [Eslint options]

[Eslint options]: https://github.com/eslint/eslint/tree/master/docs/command-line-interface#options
