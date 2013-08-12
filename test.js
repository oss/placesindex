var indexer = require('./indexer');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./all', 'utf8'));
var assert = require('assert');

var database = indexer(data);

fs.writeFileSync('index.json', JSON.stringify(database));

assert(database.kdtree);
assert(database.lunr);

var completer = require('./completer');

var data2 = JSON.parse(fs.readFileSync('index.json', 'utf8'));

var res = completer.complete(data2, "hill");
console.dir(res);

res = completer.nearby(database, 40.521800, -74.460820);
console.dir(res);
