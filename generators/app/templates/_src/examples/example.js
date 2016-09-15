import angular from 'angular';
//import navModule from 'uiux/components/navbar/navbar';
//side mneu goes here
import exampleComponent from './example.component';
import exampleSections from './example.config';
import navbarModule from 'uiux/components/navbar/navbar';
import sideMenuModule from 'uiux/components/sideMenuLayout/sideMenuLayout';
import './assets/css/example.css!css';
import './assets/js/prettify';



let examplesConfig = ($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise("/install");       
    $stateProvider.state('home', {
        url: "/",
        template: "<example></example>"
    });
};

let exampleModule = angular.module('example', [
    'ui.router',
    navbarModule.name,
    sideMenuModule.name,
    exampleSections.name,    
    'ngSanitize'
])
.config(examplesConfig)
.component('example',exampleComponent);

export default exampleModule;