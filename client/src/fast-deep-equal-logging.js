'use strict';

// code based on https://github.com/epoberezkin/fast-deep-equal

module.exports = function equal(a, b) {
  // if (a === b) {
  //   return { isEqual: true, text: [fancyPrint(a, b, true)] };
  // }

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) {
      return {
        isEqual: false,
        log: [
          {
            type: 'info',
            text: [fancyPrint(a, b, false, 'Object different type')]
          }
        ]
      };
    }

    let length, i, key;
    let prints = [];

    if (Array.isArray(a)) {
      let blength = b.length;
      length = Math.max(a.length, blength);
      let isEq = true;
      for (i = 0; i < length; i++) {
        let test = equal(a[i], b[i]);
        isEq = isEq ? test.isEqual : isEq;
        prints = prints.concat(test.log);
      }
      let groupText = `Array[${blength}]`;
      return {
        isEqual: isEq,
        log: [
          { type: 'group', text: getColored(groupText, isEq) },
          ...prints,
          { type: 'groupEnd', text: getColored(groupText, isEq) }
        ]
      };
    }

    if (a instanceof Map) {
      let akeys = getKeys(a);
      let bkeys = getKeys(b);
      let isEq = true;
      for (i = 0; i < length; i++) {
        if (!b.has(akeys[i]) || !a.has(bkeys[i])) {
          prints.push({
            type: 'info',
            text: fancyPrint(
              [akeys[i], a.get(akeys[i])],
              [bkeys[i], b.get(bkeys[i])],
              false
            )
          });
          isEq = false;
        } else {
          let test = equal(a.get(key), b.get(key));
          isEq = isEq ? test.isEqual : isEq;
          prints = prints.concat(test.log);
        }
      }
      let groupText = `Map[${bkeys.length}]`;
      return {
        isEqual: isEq,
        log: [
          { type: 'group', text: getColored(groupText, isEq) },
          ...prints,
          { type: 'groupEnd', text: getColored(groupText, isEq) }
        ]
      };
    }

    if (a instanceof Set) {
      let akeys = getKeys(a);
      let bkeys = getKeys(b);
      let isEq = true;

      for (let i = 0; i < Math.max(akeys.length, bkeys.length); i++) {
        let equality = b.has(akeys[i]) && a.has(bkeys[i]);
        isEq = isEq ? equality : isEq;
        prints.push({
          type: 'info',
          text: fancyPrint(
            [akeys[i], a.get(akeys[i])],
            [bkeys[i], b.get(bkeys[i])],
            equality
          )
        });
      }
      let groupText = `Set[${bkeys.length}]`;
      return {
        isEqual: isEq,
        log: [
          { type: 'group', text: getColored(groupText, isEq) },
          ...prints,
          { type: 'groupEnd', text: getColored(groupText, isEq) }
        ]
      };
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
      length = a.length;
      for (i = length; i-- !== 0; ) if (a[i] !== b[i]) fancyPrint(a, b, false);
      fancyPrint(a, b, true);
    }

    if (a.constructor === RegExp) {
      if (a.source !== b.source) {
        fancyPrint(a, b, false, 'Source Different');
      } else if (a.flags !== b.flags) {
        fancyPrint(a, b, false, 'Flags Different');
      } else {
        fancyPrint(a, b, true);
      }
    }

    if (a.valueOf !== Object.prototype.valueOf)
      fancyPrint(a, b, a.valueOf() === b.valueOf());
    if (a.toString !== Object.prototype.toString)
      fancyPrint(a, b, a.toString() === b.toString());

    let akeys = Object.keys(a);
    let bkeys = Object.keys(b);
    length = Math.max(akeys.length, bkeys.length);

    for (i = 0; i < length; i++) {
      if (
        !Object.prototype.hasOwnProperty.call(b, akeys[i]) ||
        !Object.prototype.hasOwnProperty.call(a, bkeys[i])
      ) {
        fancyPrint(a, b, false);
      } else {
        equal(a[key], b[key]);
      }
    }

    // true if both NaN, false otherwise
    fancyPrint(a, b, a !== a && b !== b);
  }
};

function getKeys(a) {
  let keys = [];
  for (let [key] of a.entries()) keys.push(key);
  return keys;
}

function fancyPrint(prevVal = null, newVal, isEqual, note = '') {
  return getColored(`${isEqual ? '' : prevVal + ' --> '}${newVal}`, isEqual);
}

function getColored(text, isEqual) {
  return [`%c${text}`, `color:${isEqual ? 'green' : 'red'}`];
}
