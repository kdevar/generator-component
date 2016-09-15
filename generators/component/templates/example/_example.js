import angular from 'angular';
import template from './<%= moduleName %>-example.html!text';
import <%= moduleName %>Component from '<%= package %>/<%= moduleName %>/<%= moduleName %>';


let <%=moduleName %>ExampleModule = angular.module('<%= moduleName %>Example', [<%= moduleName %>Component.name]);

<%=moduleName%>ExampleModule.component('<%=moduleName%>Example',{ template });

export default <%=moduleName%>ExampleModule;