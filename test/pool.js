var test = require('tape');
var Pool = require('../lib/Pool.js');

function Vec2()
{
  this.x = 0;
  this.y = 0;
}

test('basics', function(t) {
  t.plan(7);

  var pool = new Pool(Vec2);

  t.strictEqual(pool.count, 0, '0 initialized');
  var v = pool.aquire();
  t.strictEqual(pool.count, 1, '1 after inital request');
  t.strictEqual(pool.freeList.length, 0, '1 free');
  var v2 = pool.aquire();
  t.strictEqual(pool.freeList.length, 0, '2 free');
  t.strictEqual(pool.count, 2, '3 after second');

  pool.release(v);
  pool.release(v2);
  t.strictEqual(pool.freeList.length, 2, '3 free');
  t.strictEqual(pool.count, 2, '3 after second');
});

test('object reseting', function(t) {
  t.plan(3);

  var pool = new Pool(Vec2);

  var v = pool.aquire();
  v.x = 5;
  v.y = 10;
  pool.release(v);
  var v2 = pool.aquire();

  t.strictEqual(v, v2, 'objects are the same');
  t.strictEqual(v2.x, 0, 'x reset');
  t.strictEqual(v2.y, 0, 'y reset');
});
