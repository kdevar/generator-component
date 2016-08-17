'use strict';

function generateSrcDestinationPath(moduleName, parent) {
    var root = 'src',
        components = root + '/components',
        path = components;
    
    if (parent) {
        path += '/' + parent;
    }

    path += '/' + moduleName + '/' + moduleName;

    return path;
    
}

function generateExamplesDestinationPath() {
    var root = 'src',
        examples = root + '/examples';            
    return examples;    
}

module.exports = {
    generateSrcDestinationPath: generateSrcDestinationPath,
    generateExamplesDestinationPath: generateExamplesDestinationPath
}