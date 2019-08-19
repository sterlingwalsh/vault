import React, { useRef, useState } from 'react';

import equal from './fast-deep-equal-logging';

const createContextLogger = ({ comparisonOptions, contexts }) => () => {
  const addConsumer = (contextsMap, values = {}) => {
    const [consumer, ...remainingContexts] = contextsMap;
    const [consumerName, consumerObject] = consumer;
    return (
      <consumerObject.Consumer>
        {value => {
          values[consumerName] = value;
          return remainingContexts.length ? (
            addConsumer(remainingContexts, values)
          ) : (
            <Logger comparisonOptions={comparisonOptions} {...values} />
          );
        }}
      </consumerObject.Consumer>
    );
  };

  return addConsumer(contexts);
};

const Logger = ({ comparisonOptions, ...values }) => {
  // const consumers = Object.entries(values);
  // const [options, setOptions] = useState({});
  // setOptions(comparisonOptions);
  const prevState = useRef();
  const setPrevState = prev => (prevState.current = prev);

  console.group('Context State');
  console.log(equal(prevState.current, values, comparisonOptions));
  console.groupEnd('Context State');

  setPrevState(values);
  return null;
};

const logGroup = (label, items) => {
  console.group(label);
  console.info(items);
  console.groupEnd(label);
};

export default createContextLogger;
