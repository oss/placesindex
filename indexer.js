var lunr = require('./lunr');
var kdtree = require('./kdTree');

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

// ## index
// Indexes the building data in `data` and returns a serialized lunr store.
function index (data) {
  var idx = lunr(function () {
    this.field('title');
    this.ref('title');
  });

  var points = [];
  data.forEach(function (building) {
    var doc = {
      title: building.title,
      num: building.building_number,
      id: building.building_id
    };
    idx.add(doc);

    if (building.location && building.location.longitude) {
      var point = {
        x: toRad(Number(building.location.longitude)),
        y: toRad(Number(building.location.latitude)),
        title: building.title,
        num: building.building_number,
        id: building.building_id
      };
      points.push(point);
    }
  });

  var tree = new kdTree(points, haversine, ['x', 'y']);

  return {lunr: idx.toJSON(), kdtree: tree.toJSON()};
}

module.exports = index;
