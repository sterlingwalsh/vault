// code based on https://github.com/epoberezkin/fast-deep-equal

//options: skipFunctions

export const RESULTS = {
  STRICT_EQUAL: 'STRICT_EQUAL',
  FUNCTION_SKIPPED_UNEQUAL: 'FUNCTION_SKIPPED_UNEQUAL',
  OBJECT_TYPE_CHANGE: 'OBJECT_TYPE_CHANGE',
  VALUE_ADDED: 'VALUE_ADDED',
  VALUE_REMOVED: 'VALUE_REMOVED'
};

export default function deepDiff(a, b, options = {}) {
  const equal = (a, b) => {
    if (a === b) {
      return createEntry({
        next: a,
        isEqual: true,
        result: RESULTS.STRICT_EQUAL,
        isBottomLevel: true
      });
    }

    if (typeof a === 'function' && typeof b === 'function') {
      return createEntry({
        prev: a,
        next: b,
        isEqual: !!options.skipFunctions,
        result: options.skipFunctions ? RESULTS.FUNCTION_SKIPPED_UNEQUAL : '',
        isBottomLevel: true
      });
    }

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) {
        return createEntry({
          prev: a,
          next: b,
          isEqual: false,
          result: RESULTS.OBJECT_TYPE_CHANGE,
          note: `Type Change ${objectType(a)} -> ${objectType(b)}`,
          isBottomLevel: true
        });
      }

      if (Array.isArray(a)) {
        let length = Math.max(a.length, b.length);
        let isEq = true;
        let diff = [];
        for (let i = 0; i < length; i++) {
          let test = equal(a[i], b[i]);
          if (!test.isEqual) {
            isEq = false;
            diff.push(test.data);
          }
        }
        return createEntry({ prev: a, next: b, isEqual: isEq, diff });
      }

      if (a instanceof Map) {
        let akeys = getKeys(a);
        let bkeys = getKeys(b);
        let isEq = true;
        let diff = new Map();
        let length = Math.max(akeys.length, bkeys.length);
        for (let i = 0; i < length; i++) {
          if (!b.has(akeys[i])) {
            diff.set(
              akeys[i],
              createEntry({
                prev: akeys[i],
                next: bkeys[i],
                isEqual: false,
                results: RESULTS.VALUE_REMOVED,
                isBottomLevel: true
              }).data
            );
            isEq = false;
          } else if (!a.has(bkeys[i])) {
            diff.set(
              bkeys[i],
              createEntry({
                prev: akeys[i],
                next: bkeys[i],
                isEqual: false,
                results: RESULTS.VALUE_ADDED,
                isBottomLevel: true
              }).data
            );
            isEq = false;
          } else {
            let test = equal(a.get(akeys[i]), b.get(bkeys[i]));
            isEq = isEq ? test.isEqual : isEq;
            diff.set(akeys[i], test.data);
          }
        }
        return createEntry({ prev: a, next: b, isEqual: isEq, diff });
      }

      if (a instanceof Set) {
        let akeys = getKeys(a);
        let bkeys = getKeys(b);
        let isEq = true;
        let diff = new Set();

        for (let i = 0; i < Math.max(akeys.length, bkeys.length); i++) {
          let result, equality;
          if (!a.has(bkeys[i])) {
            equality = false;
            result = RESULTS.VALUE_ADDED;
          } else if (!b.has(akeys[i])) {
            equality = false;
            result = RESULTS.VALUE_REMOVED;
          }
          isEq = isEq ? equality : isEq;
          diff.add(
            createEntry({
              prev: akeys[i],
              next: bkeys[i],
              isEqual: isEq,
              result,
              isBottomLevel: true
            }).data
          );
        }
        return createEntry({ prev: a, next: b, isEqual: isEq, diff });
      }

      //CONTINUE HERE
      if (
        a.constructor.BYTES_PER_ELEMENT &&
        (a instanceof Int8Array ||
          a instanceof Uint8Array ||
          a instanceof Uint8ClampedArray ||
          a instanceof Int16Array ||
          a instanceof Uint16Array ||
          a instanceof Int32Array ||
          a instanceof Uint32Array ||
          a instanceof Float32Array ||
          a instanceof Float64Array)
      ) {
        let length = Math.max(a.length, b.length);
        for (let i = length; i-- !== 0; )
          if (a[i] !== b[i])
            return createEntry({
              prev: a,
              next: b,
              isEqual: false,
              isBottomLevel: true
            });
        return createEntry({
          prev: a,
          next: b,
          isEqual: true,
          isBottomLevel: true
        });
      }

      if (a.constructor === RegExp) {
        if (a.source !== b.source) {
          return createEntry({
            prev: a,
            next: b,
            isEqual: false,
            note: 'Source Different',
            isBottomLevel: true
          });
        } else if (a.flags !== b.flags) {
          return createEntry({
            prev: a,
            next: b,
            isEqual: false,
            note: 'Flags Different',
            isBottomLevel: true
          });
        } else {
          return createEntry({
            prev: a,
            next: b,
            isEqual: true,
            isBottomLevel: true
          });
        }
      }

      // if (a.valueOf !== Object.prototype.valueOf)
      // return(createEntry(a, b, a.valueOf() === b.valueOf()));
      // if (a.toString !== Object.prototype.toString)
      // return(createEntry(a, b, a.toString() === b.toString()));

      //else, both are objects
      let akeys = Object.keys(a);
      let bkeys = Object.keys(b);
      let length = Math.max(akeys.length, bkeys.length);
      let diff = {};
      let isEq = true;
      let keyInBoth = true;

      for (let i = 0; i < length; i++) {
        if (!Object.prototype.hasOwnProperty.call(b, akeys[i])) {
          keyInBoth = false;
          diff[akeys[i]] = createEntry({
            prev: akeys[i],
            next: bkeys[i],
            isEqual: false,
            result: RESULTS.VALUE_REMOVED,
            isBottomLevel: true
          }).data;
          isEq = false;
        }
        if (!Object.prototype.hasOwnProperty.call(a, bkeys[i])) {
          keyInBoth = false;
          diff[bkeys[i]] = createEntry({
            prev: akeys[i],
            next: bkeys[i],
            isEqual: false,
            result: RESULTS.VALUE_ADDED,
            isBottomLevel: true
          }).data;
          isEq = false;
        }
        if (keyInBoth) {
          let test = equal(a[akeys[i]], b[bkeys[i]]);
          if (!test.isEqual) {
            isEq = false;
            diff[akeys[i]] = test.data;
          }
        }
      }

      return createEntry({ prev: a, next: b, isEqual: isEq, diff });
    }

    // true if both NaN, false otherwise
    console.ignoredYellowBox = ['Comparing to itself is potentially pointless'];
    return createEntry({
      prev: a,
      next: b,
      isEqual: a !== a && b !== b,
      isBottomLevel: true
    });
  };

  function objectType(a) {
    return Array.isArray(a)
      ? 'Array'
      : '' || a instanceof Map
      ? 'Map'
      : '' || a instanceof Set
      ? 'Set'
      : '';
  }

  function getKeys(a) {
    let keys = [];
    for (let [key] of a.entries()) keys.push(key);
    return keys;
  }

  const createEntry = ({
    prev = undefined,
    next = undefined,
    isEqual = true,
    diff = undefined,
    result = '',
    note = '',
    isBottomLevel = false
  }) => {
    return isBottomLevel
      ? { isEqual, data: { prev, next, result, note } }
      : { isEqual, data: diff };
  };

  return { prev: a, next: b, diff: equal(a, b) };
}
