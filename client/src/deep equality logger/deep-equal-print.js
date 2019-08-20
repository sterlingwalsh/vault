import { RESULTS } from './fast-deep-equal-logging';

export const printDiff = (title, equalityDiff, options) => {
  const { prev, next, equality } = equalityDiff;

  const printGroup = (title, eq) => {
    const { diff, isEqual, note } = eq;
    let color = isEqual ? 'green' : 'red';
    if (note === RESULTS.FUNCTION_SKIPPED && !isEqual) color = 'yellow';
    logGroup(title, color, note);
    if (note === RESULTS.OBJECT_TYPE_CHANGE) {
    }

    if (diff) {
      console.log(diff);
    }
    console.groupEnd(title);
  };

  printGroup(title, equality);
};

export default function deepEquate(a, b, options = {}) {
  const equal = (a, b) => {
    if (a === b) {
      return createEntry(a, b, true, undefined, 'Strict Equal');
    }

    if (typeof a === 'function' && typeof b === 'function') {
      if (options.skipFunctions)
        return createEntry(a, b, true, undefined, 'Function Skipped');
    }

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) {
        return createEntry(a, b, false, undefined, 'Object Type Change');
      }

      if (Array.isArray(a)) {
        let length = Math.max(a.length, b.length);
        let isEq = true;
        let diff = [];
        for (let i = 0; i < length; i++) {
          let test = equal(a[i], b[i]);
          diff.push(test);
          isEq = isEq ? test.isEqual : isEq;
        }
        return createEntry(a, b, isEq, diff);
      }

      if (a instanceof Map) {
        let akeys = getKeys(a);
        let bkeys = getKeys(b);
        let isEq = true;
        let diff = [];
        let length = Math.max(akeys.length, bkeys.length);
        for (let i = 0; i < length; i++) {
          if (!a.has(bkeys[i])) {
            diff.push(
              createEntry(akeys[i], bkeys[i], false, undefined, 'Key Added')
            );
            isEq = false;
          } else if (!b.has(akeys[i]) && a.get(akeys[i])) {
            diff.push(
              createEntry(akeys[i], bkeys[i], false, undefined, 'Key Removed')
            );
            isEq = false;
          } else {
            let test = equal(a.get(akeys[i]), b.get(bkeys[i]));
            isEq = isEq ? test.isEqual : isEq;
            diff.push(test);
          }
        }
        return createEntry(a, b, isEq, diff);
      }

      if (a instanceof Set) {
        let akeys = getKeys(a);
        let bkeys = getKeys(b);
        let isEq = true;
        let diff = [];

        for (let i = 0; i < Math.max(akeys.length, bkeys.length); i++) {
          let equality = b.has(akeys[i]) && a.has(bkeys[i]);
          isEq = isEq ? equality : isEq;
          diff.push(createEntry(akeys[i], bkeys[i], isEq));
        }
        return createEntry(a, b, isEq, diff);
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
          if (a[i] !== b[i]) return createEntry(a, b, false);
        return createEntry(a, b, true);
      }

      if (a.constructor === RegExp) {
        if (a.source !== b.source) {
          return createEntry(a, b, false, undefined, 'Source Different');
        } else if (a.flags !== b.flags) {
          return createEntry(a, b, false, undefined, 'Flags Different');
        } else {
          return createEntry(a, b, true);
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

      for (let i = 0; i < length; i++) {
        if (!Object.prototype.hasOwnProperty.call(b, akeys[i])) {
          diff[akeys[i]] = createEntry(
            akeys[i],
            bkeys[i],
            false,
            undefined,
            'Property removed'
          );
          isEq = false;
        } else if (!Object.prototype.hasOwnProperty.call(a, bkeys[i])) {
          diff[bkeys[i]] = createEntry(
            bkeys[i],
            akeys[i],
            false,
            undefined,
            'Property added'
          );
          isEq = false;
        } else {
          let test = equal(a[akeys[i]], b[bkeys[i]]);
          isEq = isEq ? test.isEqual : isEq;
          diff[akeys[i]] = test;
        }
      }

      return createEntry(a, b, isEq, diff);
    }

    // true if both NaN, false otherwise
    return createEntry(a, b, a !== a && b !== b);
  };

  function getKeys(a) {
    let keys = [];
    for (let [key] of a.entries()) keys.push(key);
    return keys;
  }

  const createEntry = (
    prev = undefined,
    current = undefined,
    isEqual = true,
    diff = undefined,
    note = ''
  ) => {
    return { prev, current, isEqual, diff, note };
  };

  return { prev: a, next: b, equality: equal(a, b) };
}

const logInfo = (text, color = '', note = '') => {
  console.info(`%c ${text}`, `color: ${color}`);
};

const logGroup = (text, color = '', note = '') => {
  console.group(`%c ${text}${note ? `(${note})` : ''}`, `color: ${color}`);
};
