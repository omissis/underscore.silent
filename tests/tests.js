test("ns single level", function() {
  _.ns("Foo");
  deepEqual({}, Foo);
});

test("ns multiple level", function() {
  _.ns("Foo.Bar.Baz");
  deepEqual({}, Foo.Bar.Baz);

  _.ns("Foo.Bar");
  deepEqual({Baz : {}}, Foo.Bar);
});

test("replace", function() {
  equal("foo bar baz", _.replace('foo %{token} baz', {token : "bar"}));
  equal("foo baz",     _.replace('foo baz',          {token : "bar"}));
});

test("round", function() {
  equal(1,     _.round(1.2356, 0));
  equal(1.2,   _.round(1.2356, 1));
  equal(1.24,  _.round(1.2356, 2));
  equal(1.236, _.round(1.2356, 3));
});

test("isVoid", function() {
  equal(true,  _.isVoid(null),      "null is void");
  equal(true,  _.isVoid(undefined), "undefined is void");
  equal(false, _.isVoid(""),        "empty string is not void");
  equal(false, _.isVoid(0),         "number zero is not void");
  equal(false, _.isVoid([]),        "empty array is not void");
  equal(false, _.isVoid({}),        "empty object is not void");
});
