const identifyError = (code = 'no-code') => {
  switch (code) {
    case 401: {
      return 'fetchErrors.unauthorized';
    }
    case 409: {
      return 'fetchErrors.conflict';
    }
    default: {
      return 'fetchErrors.default';
    }
  }
};
export default identifyError;
