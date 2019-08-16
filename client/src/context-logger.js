import React, { useRef } from 'react';

const ContextLogger = ({ contexts }) => {
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
            <Logger {...values} />
          );
        }}
      </consumerObject.Consumer>
    );
  };

  return addConsumer(contexts);
};

const Logger = values => {
  const consumers = Object.entries(values);
  const prevState = useRef();
  const setPrevState = prev => (prevState.current = prev);

  console.group('Context State');
  consumers.forEach(consumer => logGroup(consumer[0], consumer[1]));
  console.groupEnd('Context State');

  setPrevState(values);
  return null;
};

const logGroup = (label, items) => {
  console.group(label);
  console.info(items);
  console.groupEnd(label);
};

export default ContextLogger;
