import React from 'react';

import Loading from '../loading/loading.component';

const WithLoading = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Loading /> : <WrappedComponent {...otherProps} />;
};

export default WithLoading;
