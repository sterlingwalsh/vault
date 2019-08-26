import React, { useRef } from 'react';

import { printDiff } from './deep-equal-print';

import deepDiff from './fast-deep-equal-logging';

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
  // console.log(values);
  const prevState = useRef();
  const setPrevState = prev => (prevState.current = prev);

  // const compare = equal(prevState.current, values, comparisonOptions);

  // console.group('Context')

  printDiff(
    'Providers',
    deepDiff(prevState.current, values, comparisonOptions)
  );

  setPrevState(values);
  return null;
};

export default createContextLogger;
