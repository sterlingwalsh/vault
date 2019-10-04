import React, { useRef, useContext } from "react";

import { printDiff } from "./deep-equal-print";

import deepDiff from "./fast-deep-equal-logging";

let globalLoggerOptions = { collapseTopLevel: false, useTimeStamp: false };

export const setGlobalLoggerOptions = options => {
  globalLoggerOptions = options;
};

const Logger = ({ title, options = globalLoggerOptions, context }) => {
  const prevState = useRef();
  const setPrevState = prev => (prevState.current = prev);
  const values = useContext(context);

  printDiff(title, deepDiff(prevState.current, values, options), options);

  setPrevState(values);
  return null;
};

export default Logger;
