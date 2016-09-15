import angular from 'angular';

class ExampleSectionController{    
    constructor($transclude, $element) {
        'ngInject';
        this.transcludeService = $transclude;        
    }
    hasTranscludedItem() {
        return this.transcludeService.isSlotFilled('example')
    }
};

let exampleSectionComponent = {
    template: `
    <div class="aamc-box">
        <div class="card card-open">
            <div class="card-block">
                <div class="card-title">
                    <h1>{{$ctrl.name}}</h1>
                </div>
                <div class="card-text">
                    <div id="example" class="section">
                        <h2 class="title">Example</h2>
                        <div class="live-example" ng-transclude="demo"></div>
                    </div>
                    <div id="code" class="section" ng-if="$ctrl.htmlCode || $ctrl.js">
                        <h2 class="title">Code</h2>
                        <tabs>
                            <tab-item name="HTML">
                                <pre ng-if="$ctrl.htmlCode" class="prettyprint linenums lang-html" value="{{$ctrl.htmlCode}}" lang="html"></pre>
                            </tab-item>
                            <tab-item name="ES6 JS">
                                <pre ng-if="$ctrl.js" class="prettyprint linenums lang-js" value="{{$ctrl.js}}" lang="js"></pre>
                            </tab-item>
                        </tabs>
                        
                    </div>
                    <div id="api" class="section markdown" ng-if="$ctrl.doc">
                        <h2 class="title">API</h2>
                        <div class="item list-container" ng-bind-html="$ctrl.doc" ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    bindings: {
        name: "@",
        src: "@",
        htmlCode: "@",
        js: "@",
        titleDoc :"@",
        doc: "@"
    },
    transclude: {
        demo: "?exampleDemo"    
    },
    controller: ExampleSectionController
};

export default exampleSectionComponent;