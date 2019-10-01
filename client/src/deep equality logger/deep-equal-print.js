import deepDiff from "./fast-deep-equal-logging";

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
    logGroup("Prev", "darkGray", prevExists ? prev[title] : undefined);
    logGroup(
      "Diff",
      color,
      noChange ? "No Change" : data ? data : "Consumer Created"
    );
    const perceivedChange = shallowDiff(
      prevExists ? prev[title] : {},
      next[title]
    );

    const onlyPerceivedChanges = Object.entries(perceivedChange).reduce(
      (acc, [key, value]) => {
        if (data && !data[key]) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    if (
      Object.keys(onlyPerceivedChanges).length
      // !deepDiff(Object.keys(data || {}), Object.keys(perceivedChange || {}))
      //   .diff.isEqual
    ) {
      console.groupCollapsed("%c Shallow Perceived Changes", "color: red");
      console.log(onlyPerceivedChanges);
      console.groupEnd("Perceived Change");
    }

    logGroup("Next", "darkgray", nextExists ? next[title] : undefined);
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
  console.log("\n");
};

const logGroup = (title, color = "", val, note = "") => {
  console.group(`%c ${title}`, `color: ${color}`);
  console.log(val);
  console.groupEnd(title);
};

const getColor = test => {
  return test ? "green" : "red";
};

const shallowDiff = (prev, next) => {
  const diff = {};

  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  const length = Math.max(prevKeys.length, nextKeys.length);

  for (let i = 0; i < length; i++) {
    if (!Object.is(prev[prevKeys[i]], next[nextKeys[i]])) {
      diff[prevKeys[i] || nextKeys[i]] = {
        prev: prev[prevKeys[i]],
        next: next[nextKeys[i]],
        isEqual: false
      };
    }
  }
  return diff;
};
