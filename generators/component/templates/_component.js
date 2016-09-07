import angular from 'angular';
import <%= name %> from './<%= name %>.component.js';

/**
 *This is the sample component that was generated
 *@module <%= name %>
 */
let <%= name %>Module = angular.module('<%= name %>', [])
.component('<%= name %>', <%= name %>);

export default <%= name %>Module;