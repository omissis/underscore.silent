test("ns single level", function () {
  _.ns("Foo");
  deepEqual(Foo, {});
});

test("ns multiple level", function () {
  _.ns("Foo.Bar.Baz");
  deepEqual(Foo.Bar.Baz, {});

  _.ns("Foo.Bar");
  deepEqual(Foo.Bar, {Baz : {}});
});

test("sum", function () {
  equal(_.sum([1, 2, 3]), 6);
  equal(_.sum([1, 2, -3]), 0);
  equal(_.sum([{ value : 1}, { value : 2 }, { value : 3 }], function (item) { return item.value; }), 6);
});

test("replace", function () {
  equal(_.replace('foo %{token} baz', {token : "bar"}), "foo bar baz");
  equal(_.replace('foo baz',          {token : "bar"}), "foo baz");
});

test("percent", function () {
  equal(_.percent(1, 2), 1);
  equal(_.percent(4, 4), 1);
  equal(_.percent(5, 5, 2), 2);
  equal(_.percent(5, 15, 1, 2), 0.33);
  equal(_.percent(5, 15, 1, 4), 0.3333);
  equal(_.percent(10, 15, 1, 6), 0.666667);
});

test("round", function () {
  equal(_.round(1.2356, 0), 1);
  equal(_.round(1.2356, 1), 1.2);
  equal(_.round(1.2356, 2), 1.24);
  equal(_.round(1.2356, 3), 1.236);
});

test("rgbToHex", function () {
  equal(_.rgbToHex(),                 '#ffffff');
  equal(_.rgbToHex('rgb(0, 0, 0)'),   '#000000');
  equal(_.rgbToHex('rgb(255, 0, 0)'), '#ff0000');
  equal(_.rgbToHex('rgb(0, 255, 0)'), '#00ff00');
  equal(_.rgbToHex('rgb(0, 0, 255)'), '#0000ff');
});

test("isVoid", function () {
  equal(_.isVoid(null),      true, "null is void");
  equal(_.isVoid(undefined), true, "undefined is void");
  equal(_.isVoid(""),        false, "empty string is not void");
  equal(_.isVoid(0),         false, "number zero is not void");
  equal(_.isVoid([]),        false, "empty array is not void");
  equal(_.isVoid({}),        false, "empty object is not void");
});

test("url", function () {
  equal(_.url("foo_bar"), location.protocol + '//' + location.host + "/foo_bar");
});
