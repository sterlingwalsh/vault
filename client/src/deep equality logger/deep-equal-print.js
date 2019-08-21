export const printDiff = (title, equalityDiff, options) => {
  const {
    prev,
    next,
    diff: { isEqual, data }
  } = equalityDiff;

  const printConsumer = (title, data) => {
    const prevExists = !!(prev && prev[title]);
    const nextExists = !!(next && next[title]);
    const noChange = !!(prevExists && nextExists && !data);
    const color = getColor(noChange);
    console.groupCollapsed(`%c ${title}`, `color: ${color}`);
    logGroup('Prev', 'darkGray', prevExists ? prev[title] : undefined);
    logGroup(
      'Diff',
      color,
      noChange ? 'No Change' : data ? data : 'Consumer Created'
    );
    logGroup('Next', 'darkgray', nextExists ? next[title] : undefined);
    console.groupEnd(title);
  };

  // console.log(equalityDiff);
  console.group(`%c ${title}`, `color: ${getColor(isEqual)}`);

  const consumers = Array.from(
    new Set(
      (prev ? Object.keys(prev) : []).concat(next ? Object.keys(next) : [])
    )
  );

  consumers.forEach(key => printConsumer(key, data[key]));
  console.groupEnd(title);
  console.log('\n');
};

const logGroup = (title, color = '', val, note = '') => {
  console.group(`%c ${title}`, `color: ${color}`);
  console.log(val);
  console.groupEnd(title);
};

const getColor = test => {
  return test ? 'green' : 'red';
};
