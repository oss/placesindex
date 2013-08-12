var _ = require('lodash');
var keypress = require('keypress');
var charm = require('charm')();
charm.pipe(process.stdout);
charm.reset();
var fs = require('fs');

var data = JSON.parse(fs.readFileSync('index.json', 'utf8'));

keypress(process.stdin);

var lunr = require('lunr');
var index = lunr.Index.load(data.lunr);

function prettyMatches (matches) {
  // make them look nice
  return _.map(matches, function (item) {
    return item.ref;
  });
}

process.stdin.resume();
process.stdin.setRawMode(true);

var size = process.stdout.getWindowSize();
var height = size[1] - 1;
var width = size[0] - 1;
var search = "";
var cursor = 1;

process.stdin.on('keypress', function (chunk, key) {
  if (key) {
    if (key.name == 'escape') process.exit();
    if (key.name == 'backspace') {
      cursor--;
      if (cursor < 1) cursor = 1;
      search = search.slice(0, -1);
    }
  }

  if (((key && key.name != 'backspace') || !key) && chunk) {
    cursor++;
    search += chunk;
  }
  charm.erase('down');

  if (search.length > 3) {
    var res = prettyMatches(index.search(search));

    _.each(res, function (item, index) {
      charm.position(0, index + 2).write(item);
    });
  }

  charm.position(0, 0).write(search);
  charm.position(cursor, 0);
});

