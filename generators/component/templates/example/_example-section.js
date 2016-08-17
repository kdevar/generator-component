import angular from 'angular';
import <%=moduleName%>SectionComponent from './<%=moduleName%>-section.component';
import <%=moduleName%>ExampleModule from '../../components/<%=moduleName%>/<%=moduleName%>-example'
import 'angular-ui-router';

let <%=moduleName%>SectionModule = angular.module('<%=moduleName%>SectionModule', ['ui.router', <%=moduleName%>ExampleModule.name]);

<%=moduleName%>SectionModule.config(function($stateProvider){
    $stateProvider.state({
        "name" : "<%=moduleName%>",
        "url": "/<%=moduleName%>",
        "template": "<<%= tagName %>-section></<%= tagName %>-section>",
        "example": true
    });
});

<%= moduleName %>SectionModule.component("<%= moduleName %>Section", <%= moduleName %>SectionComponent);

export default <%= moduleName %>SectionModule;