import equal from './fast-deep-equal-logging';

const tests = [
  {
    name: 'intsDiff',
    val1: 1,
    val2: 2
  },
  {
    name: 'intsSame',
    val1: 1,
    val2: 1
  }
];

export const runTests = () => {
  for (let test of tests) {
    console.group(test.name);
    console.info(equal(test.val1, test.val2));
    console.groupEnd(test.name);
  }
};
