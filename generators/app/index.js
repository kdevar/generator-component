'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the first-rate ' + chalk.red('generator-component') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'group',
      message: 'What is the name of gitlab group (e.g eras, iam, mcat)?'
    }, {
        type: 'input',
        name: 'project',
        message: 'What is the name of your project?'
      }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props['path'] = this.props.group + "/" + this.props.project;

    }.bind(this));
  },

  writing: function () {       
    this.directory("_src", "src", this.props);
    this.directory("_ssl", "ssl");
    this.copy("_Gulpfile.js", "Gulpfile.js");
    this.copy("_package.json", "package.json");    
    this.copy("_bower.json", "bower.json");
    this.copy("_contribute.md", "contribute.md");
    this.copy("_install.md", "install.md");
    this.copy("_README.md", "README.md");
    this.copy("_.gitignore", ".gitignore");
   

    this.fs.copyTpl(
      this.templatePath('_prettify.js'),
      this.destinationPath("src/examples/assets/js/prettify.js"),
      this.props,
      { delimiter: "5433%%" }
    );

    this.fs.copyTpl(
      this.templatePath('_components.js'),
      this.destinationPath("src/components/components.js"),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_config.js'),
      this.destinationPath('config.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('src/examples/index.html'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_example.template.html'),
      this.destinationPath('src/examples/example.template.html'),
      this.props
    );

    this.config.set("package", this.props.path);

    

  },

  install: function () {    
    this.installDependencies();
  }
});
