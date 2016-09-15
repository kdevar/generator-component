import angular from 'angular';
import 'angular-ui-router';
import installTemplateHtml from  '../../../../install.md!';

let installSectionModule = angular.module('installSectionModule', ['ui.router']);

installSectionModule.config(function($stateProvider){
    $stateProvider.state({
        "name" : "install",
        "url": "/install",
        "template": "<install-section></install-section>"
    });
});

installSectionModule.component("installSection", {
    template: `
        <div class="aamc-box markdown-body">${installTemplateHtml}</div>
    `
});

export default installSectionModule;