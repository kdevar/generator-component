import template from  './example.template.html!text';

class ExampleComponentController{
    
    constructor($state) {
        'ngInject';

        this.stateService = $state;        
        this.items = [];
        
        this.registerExamples();
    }
    registerExamples() {
        let examples = this.stateService.get();
        this.items.push(
            ...examples.filter((example) => { return example.hasOwnProperty("example"); })
        );
        this.items.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
    }
}

let exampleComponent = {
    template,    
    controller: ExampleComponentController
}

export default exampleComponent;