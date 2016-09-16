# Contribute to UIUX Components
***

## Local setup

1. Fork the project on Gitlab
2. Checkout your fork locally
3. `npm install`
4. `gulp serve`

## Generate a new component 

You can use a generator to create components

*assuming you have yeoman and generator-component installed*


```bash
yo component:component mycomponentName --generateExample
```

The generator will create a working component replete with working examples/demos/and documentation.  The idea is that you work on your component wil automatically creating documentation.

You will be see the component if you `gulp serve` 



## Structure of a component



- __src__
  
  - __components__
      - __sample__
          <blockquote>*this is where your component code lives*</blockquote>

          - readme.md
          - sample.component.js          
          - sample.js
          - sample.spec.js
  - __examples__
      - __components__
          - __sample__
              <blockquote>*this where you get to test your component while generating docs at the same time*</blockquote>

              - sample-example.html
              - sample-example.js
      - __sections__
          - __sample__
              <blockquote>*you really wouldn't have to go in here but this where the component documentation section is configured*</blockquote>

              - sample-section.component.js
              - sample-section.js

## All done?

Submit a merge request






