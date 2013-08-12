var indexer = require('./indexer');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./all', 'utf8'));
var assert = require('assert');

var index = indexer(data);

fs.writeFileSync('index.json', JSON.stringify(index));

assert(index.kdtree);
assert(index.lunr);
