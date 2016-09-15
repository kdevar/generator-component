import angular from 'angular';
import 'angular-ui-router';
import contributeTemplateHtml from  '../../../../contribute.md!';

let contributeSectionModule = angular.module('contributeSectionModule', ['ui.router']);

contributeSectionModule.config(function($stateProvider){
    $stateProvider.state({
        "name" : "contribute",
        "url": "/contribute",
        "template": "<contribute-section></contribute-section>"
    });
});

contributeSectionModule.component("contributeSection", {
    template: `
        <div class="aamc-box markdown-body">${contributeTemplateHtml}</div>
    `
});

export default contributeSectionModule;