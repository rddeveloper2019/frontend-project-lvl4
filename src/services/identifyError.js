const identifyError = (code) => {
  if (!code) {
    return 'fetchErrors.default';
  }
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
