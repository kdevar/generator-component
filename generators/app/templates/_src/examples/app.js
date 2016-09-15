import angular from 'angular';
import exampleModule from './example';
import 'angular-ui-router';
import 'angular-sanitize';
import 'ngaamc/aamc-ux-framework';




let exampleApp = angular.module("app", [
    'ui.router',
    exampleModule.name
]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [exampleApp.name]);
});

export default exampleApp;