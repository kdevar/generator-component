'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('../../util.js');
var fs = require('fs');
var _ = require('lodash');



module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);
        this.argument('moduleName');
        this.option('parent');
        this.option('generateExample');
    },
        
    writing: function () {
        if (this.options.generateExample && !this.config.get("package")) {
            throw new Error("cannot create component with example unless the parent was created by yo component | or place a .yo-rc.json at root specifying package name")
        }
        var props = {
            name: this.moduleName,
            moduleName: this.moduleName,
            controllerName: _.capitalize(this.moduleName),
            tagName: this.moduleName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase(),
            className: _.capitalize(this.moduleName),
            package: this.config.get("package")
        },
            destinationPath = util.generateSrcDestinationPath(this.moduleName, this.options.parent),
            examplesPath = util.generateExamplesDestinationPath(),
            componentFiles = [{
                templatePath: "_component.js",
                destinationPath: destinationPath + '.js'
            }, {
                    templatePath: "_component.component.js",
                    destinationPath: destinationPath + '.component.js'
                }, {
                    templatePath: "_component.spec.js",
                    destinationPath: destinationPath + '.spec.js'
                }],
            exampleFiles = [{
                templatePath: 'example/_example.html',
                destinationPath: examplesPath + "/components/" + this.moduleName + "/" + this.moduleName + "-example.html"
            }, {
                    templatePath: 'example/_example.js',
                    destinationPath: examplesPath + "/components/" + this.moduleName + "/" + this.moduleName + "-example.js"
                }, {
                    templatePath: 'example/_example-section.js',
                    destinationPath: examplesPath + "/sections/" + this.moduleName + "/" + this.moduleName + "-section.js"
                }, {
                    templatePath: 'example/_example-section.component.js',
                    destinationPath: examplesPath + "/sections/" + this.moduleName + "/" + this.moduleName + "-section.component.js"
                }];

        /**
         * copy component templates over
         */
        _.forEach(componentFiles, function (componentFile) {
            this.fs.copyTpl(
                this.templatePath(componentFile.templatePath),
                this.destinationPath(componentFile.destinationPath),
                props
            );
        }.bind(this));

        /**
         * append component to imports
         */
        fs.readFile("src/components/component.imports.js", 'utf8', function (err, data) {
            var importStatement = "import " + this.moduleName + "Module from './" + this.moduleName + "/" + this.moduleName + "';\n",
                exportStatement = "\nexport { " + this.moduleName + "Module };";
            fs.writeFile("src/components/component.imports.js", importStatement + data + exportStatement, 'utf8', function (err) {
                if (err) {
                    console.log("unable to write new component in to component.imports", err);
                    return;
                }
            });


        }.bind(this));

        if (this.options.generateExample) {
            /**
             * copy example files over
             */
            _.forEach(exampleFiles, function (exampleFile) {
                this.fs.copyTpl(
                    this.templatePath(exampleFile.templatePath),
                    this.destinationPath(exampleFile.destinationPath),
                    props
                );
            }.bind(this));
            /**
             * append example section to imports
             */
            fs.readFile("src/examples/section.imports.js", 'utf8', function (err, data) {
                var importStatement = "import " + this.moduleName + "SectionModule from './sections/" + this.moduleName + "/" + this.moduleName + "-section';\n",
                    exportStatement = "\nexport { " + this.moduleName + "SectionModule }";
                fs.writeFile("src/examples/section.imports.js", importStatement + data + exportStatement, 'utf8', function (err) {
                    if (err) {
                        console.log("unable to write new component in to example.imports", err);
                        return;
                    }
                });
            }.bind(this));


        }
    },


});
