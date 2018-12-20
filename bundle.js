"use strict";

const fs = require('fs');
const {Collection} = require('@iconify/json-tools');

let collection = new Collection('testapicons');
if (!collection.loadFromFile('testapicons.json')) {
    console.error('Failed to load testapicons.json');
}
let code = collection.scriptify({
    pretty: true,
    optimize: true
});

let output = 'dist/testapicons.js';



// Save code
fs.writeFileSync(output, code, 'utf8');
console.log('Saved bundle to', output, ' (' + code.length + ' bytes)');