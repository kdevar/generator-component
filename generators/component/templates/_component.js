import angular from 'angular';
import 'angular-ui-router';
import <%= name %> from './<%= name %>.component.js';

/**
 *This is the sample component that was generated
 *@module <%= name %>
 */
let <%= name %>Module = angular.module('<%= name %>', [
	'ui.router'
])
.component('<%= name %>', <%= name %>);

export default <%= name %>Module;