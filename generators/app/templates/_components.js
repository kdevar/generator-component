import angular from 'angular';
import * as components from './component.imports.js';

let modules = [];

for(let key of Object.keys(components)){
    modules.push(components[key].name);
}

let components = angular.module('<%= group %>.<%= project %>', modules);

export default components;