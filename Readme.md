
# monkify

  A fork of [tj's co-monk](https://github.com/tj/co-monk). co/thunkify wrappers updated for recent versions of monk.

## Installation

```
$ npm install monkify
```

## Setup

  Call `wrap()` on collections to make them generator friendly:

```js
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/test');

var users = wrap(db.get('users'));
```

## Example

  Simple example:

```js
yield users.remove({});

yield users.insert({ name: 'Tobi', species: 'ferret' });
yield users.insert({ name: 'Loki', species: 'ferret' });
yield users.insert({ name: 'Jane', species: 'ferret' });

var res = yield users.findOne({ name: 'Tobi' });
res.name.should.equal('Tobi');

yield users.removeById(res._id);

var res = yield users.find({ species: 'ferret' });
res.should.have.length(2);
```

  Parallel inserts:

```js
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
```

# License

  MIT
