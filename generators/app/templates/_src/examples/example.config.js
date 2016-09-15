import angular from 'angular';
import exampleSectionComponent from './sections/section.component';
import * as exampleModules from './section.imports';

let modules = [];

for(let key of Object.keys(exampleModules)){
    modules.push(exampleModules[key].name);
}

function replaceText(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default 
angular.module('exampleSection', modules)
       .component('exampleSection', exampleSectionComponent)    
       .directive('prettyprint', function($timeout) {
                    return {
                        restrict: 'C',
                        scope:{
                            value:"@",
                            lang: "@"
                        },
                        link: function postLink(scope, element, attrs) {
                            var value = scope.value;                            
                            value = replaceText(value);
                            
                            element.html(prettyPrintOne(value,scope.lang,true));
                        }
                    };
                });