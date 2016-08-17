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
    init: function () {



    },


    prompting: function () {

    },

    writing: function () {
        var moduleName = this.moduleName;
        var destinationPath = util.generateSrcDestinationPath(this.moduleName, this.options.parent);
        var examplesPath = util.generateExamplesDestinationPath();
        
        this.fs.copyTpl(
            this.templatePath('_component.js'),
            this.destinationPath(destinationPath + '.js'),
            { name: this.moduleName }
        );
        this.fs.copyTpl(
            this.templatePath('_component.component.js'),
            this.destinationPath(destinationPath + '.component.js'),
            { name: this.moduleName, controllerName: _.capitalize(this.moduleName), tagName: this.moduleName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase() }
        );
        this.fs.copyTpl(
            this.templatePath('_component.spec.js'),
            this.destinationPath(destinationPath + '.spec.js'),
            { name: this.moduleName }
        );

        if (this.options.generateExample) {
            this.fs.copyTpl(
                this.templatePath('example/_example.html'),
                this.destinationPath(examplesPath + "/components/" +this.moduleName + "/" + this.moduleName +"-example.html"),
                { moduleName: this.moduleName, tagName: this.moduleName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase() }
            );
            this.fs.copyTpl(
                this.templatePath('example/_example.js'),
                this.destinationPath(examplesPath + "/components/" +this.moduleName + "/" + this.moduleName +"-example.js"),
                { moduleName: this.moduleName }
            );
            this.fs.copyTpl(
                this.templatePath('example/_example-section.js'),
                this.destinationPath(examplesPath + "/sections/" +this.moduleName + "/" + this.moduleName +"-section.js"),
                { moduleName: this.moduleName, tagName: this.moduleName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()  }
            );
             this.fs.copyTpl(
                this.templatePath('example/_example-section.component.js'),
                this.destinationPath(examplesPath + "/sections/" +this.moduleName + "/" + this.moduleName +"-section.component.js"),
                { moduleName: this.moduleName, tagName: this.moduleName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase(), className: _.capitalize(this.moduleName) }
            );
             fs.readFile("src/examples/example.imports.js", 'utf8', function (err, data) {
                    var  importStatement = "import " + moduleName + "SectionModule from './sections/" + moduleName + "/" + moduleName + "-section';\n",
                     exportStatement = "\nexport { " + moduleName + "SectionModule }";
                    fs.writeFile("src/examples/example.imports.js", importStatement + data + exportStatement, 'utf8', function (err) {
                        if (err) {
                            console.log("unable to write new component in to example.imports", err);
                            return;
                       } 
                    });
                 

             });
        }
    },


});
