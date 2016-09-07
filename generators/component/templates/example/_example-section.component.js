import angular from 'angular';
import html from '../../components/<%=moduleName%>/<%=moduleName%>-example.html!text';
import doc from 'uiux/components/<%=moduleName%>/readme.md!'
import js from '../../components/<%=moduleName%>/<%=moduleName%>-example.js!text';



class <%=className%>SectionController{
    
    constructor() {
        'ngInject'
        this.name = '<%= moduleName %>';
        this.src = '';
        this.html = html;
        this.titleDoc = 'test';
        this.js = js;
        this.doc = doc;
    }
}

let <%=moduleName%>SectionComponent = {
    template: `<example-section name='{{$ctrl.name}}' 
                                src='{{$ctrl.src}}' 
                                titleDoc='{{$ctrl.titleDoc}}' 
                                html-code='{{$ctrl.html}}' 
                                js='{{$ctrl.js}}' 
                                doc='{{$ctrl.doc}}'>
                       <example-demo><<%=tagName%>-example></<%=tagName%>-example></example-demo>
                </example-section>`,
    controller: <%=className%>SectionController    
};

export default <%=moduleName%>SectionComponent;