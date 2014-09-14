var lunr = require('./lunr');
var KDTree = require('./kdtree').kdTree;

function toRad (x) { return x * Math.PI / 180; }

function haversine (s, t) {
  var lon1 = s.x;
  var lon2 = t.x;

  var lat1 = s.y;
  var lat2 = t.y;

  var dLat = (lat2-lat1);
  var dLon = (lon2-lon1);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
}

var index, tree;

// ## complete
// Runs autocompletion on the given index. Returns the documents matching the
// query.

function complete (database, query) {
  if (!index) index = lunr.Index.load(database.lunr);
  var res = index.search(query);
  return res.map(function (item) {
    return database.all[item.ref];
  });
}

// ## nearby
// Returns nearby buildings to a lat lon

function nearby (database, lat, lon, numResults) {
  numResults = numResults || 5;
  if (!tree) tree = new KDTree(database.kdtree, haversine, ['x', 'y']);
  var res = tree.nearest({x: toRad(Number(lon)), y: toRad(Number(lat))}, numResults);
  return res.map(function (item) {
    return database.all[item[0].id];
  });
}

exports.complete = complete;
exports.nearby = nearby;