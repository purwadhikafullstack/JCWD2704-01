const messageResponse = (message: string, description: string = '') => ({
  message,
  ...(description && { description }),
});

const errorResponse = (message: string, cause: unknown = '') => ({
  message,
  cause,
});

export { messageResponse, errorResponse };
