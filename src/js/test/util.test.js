import {assert} from 'chai';
import {rearrangeElements} from '../util';

describe(`Rearranging elements of array`, () => {
  it(`insert elements on position FROM before elements on position TO`, () => {
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 1, 2), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 1, 3), [2, 1, 3, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 1, 4), [2, 3, 1, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 1, 5), [2, 3, 4, 1, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 1, 6), [2, 3, 4, 5, 1, 6]);

    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 2, 1), [2, 1, 3, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 2, 3), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 2, 4), [1, 3, 2, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 2, 5), [1, 3, 4, 2, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 2, 6), [1, 3, 4, 5, 2, 6]);

    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 3, 1), [3, 1, 2, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 3, 2), [1, 3, 2, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 3, 4), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 3, 5), [1, 2, 4, 3, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 3, 6), [1, 2, 4, 5, 3, 6]);
    //
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 4, 1), [4, 1, 2, 3, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 4, 2), [1, 4, 2, 3, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 4, 3), [1, 2, 4, 3, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 4, 5), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 4, 6), [1, 2, 3, 5, 4, 6]);

    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 5, 1), [5, 1, 2, 3, 4, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 5, 2), [1, 5, 2, 3, 4, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 5, 3), [1, 2, 5, 3, 4, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 5, 4), [1, 2, 3, 5, 4, 6]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 5, 6), [1, 2, 3, 4, 5, 6]);

    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 6, 1), [6, 1, 2, 3, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 6, 2), [1, 6, 2, 3, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 6, 3), [1, 2, 6, 3, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 6, 4), [1, 2, 3, 6, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5, 6], 6, 5), [1, 2, 3, 4, 6, 5]);
  });

  it(`Does nothing if FROM = TO`, () => {
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5], 1, 1), [1, 2, 3, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5], 2, 2), [1, 2, 3, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5], 3, 3), [1, 2, 3, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5], 4, 4), [1, 2, 3, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5], 5, 5), [1, 2, 3, 4, 5]);
    assert.deepEqual(rearrangeElements([1, 2, 3, 4, 5], 6, 6), [1, 2, 3, 4, 5]);
  });
});
