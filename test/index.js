
/**
 * Module dependencies.
 */

var monk = require('monk');
var wrap = require('..');
var co = require('co');
var db = monk('localhost/test');

var users = wrap(db.get('users'));

describe('queries', function(){
  it('should work', function(done){
    co(function *(){
      yield users.remove({});

      yield [
        users.insert({ name: 'Tobi', species: 'ferret' }),
        users.insert({ name: 'Loki', species: 'ferret' }),
        users.insert({ name: 'Jane', species: 'ferret' })
      ];

      var res = yield users.findOne({ name: 'Tobi' });
      res.name.should.equal('Tobi');

      yield users.removeById(res._id);

      var res = yield users.find({ species: 'ferret' });
      res.should.have.length(2);

    })(done);
  })
})
