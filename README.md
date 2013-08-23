# placesindex

Takes a list of places and indexes it. Then, `completer.js` can be used to 
perform autocompletion & nearby queries using this index.

## Testing

The API for getting all data about buildings requires a key. I've included a
copy of the database in the github repo for easy testing (`all`). You can
test the indexing by running `test.js`

```
$ node test
```

which will do some simple tests, including a nearby query with `kdtree`. You
can also then run manual_test

```
$ node manual_test
```

for an interactive autocompletion test.

## Client-side Usage

To get place completion & nearby queries, grab the database from the 
RU Mobile API server and

```javascript
var completer = require('./completer');
var matches = completer.complete(database, "hill");
// Returns places matching Hill

matches = completer.nearby(database, 40.521800, -74.460820);
// Returns places nearby 40.521800, -74.460820
```

See [api.rutgers.edu](api.rutgers.edu) for more information.

## Projects used

[lunr.js](https://github.com/olivernn/lunr.js)
[kd-tree-javascript](https://github.com/ubilabs/kd-tree-javascript)
