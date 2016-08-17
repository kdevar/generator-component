class <%= controllerName %>Controller {
    constructor(){
        if (!this.inputOne) {
            this.inputOne = "Default value of input one";
        }
        this.showInputOne = false;
    }
    
    toggleInputOneDisplay(){
        this.showInputOne = !this.showInputOne;
    }
}

/**
 * @param {Attribute} [inputOne=Default value of input one] - if passed in it will be used by component
 * @example
 * usage
 * <<%= tagName %>></<%= tagName %>>
 * <<%= tagName %> input-one="my value"></<%= tagName %>>
 *
 */

let <%= name %>Component = {
    template: `
        <div>output of my newly added component</div>
        <div ng-if="$ctrl.showInputOne">{{$ctrl.inputOne}}</div>
        <button type="button" class="btn btn-primary-outline btn-form" ng-click="$ctrl.toggleInputOneDisplay()">
            Show/Hide Input One
        </button>
    `,
    bindings:{
      "inputOne": "@"  
    },
    controller: <%= controllerName %>Controller
};

	

export default <%= name %>Component;