var lunr = require('lunr');
var _ = require('lodash');

// ## index
// Indexes the building data in `data` and returns an object with list of all
// buildings, serialized lunr store, and serialized kdtree
function index (data) {
    var buildings = _.reduce(data, function (acc, building) {
        var idx = acc.idx,
            all = acc.all,
            // Use building number + id as unique identifier
            identifier = building.building_number + "_" + building.building_id + building.title;

        building.id = identifier;

        idx.add({
            title: building.title,
            num: building.building_number,
            descr: building.description,
            code: building.building_code,
            depts: building.offices? building.offices.join(', ') : '',
            id: identifier
        });

        all[identifier] = building;
        return acc;
    }, {
        idx: lunr(function () {
            this.field('title');
            //this.field('descr');
            this.ref('id');
            this.field('code');
            this.field('depts');
        }),
        all: {}
    });

    return {
        lunr: buildings.idx.toJSON(),
        all: buildings.all
    };
}

module.exports = index;
