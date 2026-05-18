const { info, error } = require('./logger');
const { formatRequest, formatResponse } = require('./helpers');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    info('HTTP request completed', {
      request: formatRequest(req),
      response: { ...formatResponse(res), durationMs: duration },
    });
  });

  next();
};

const errorLogger = (err, req, res, next) => {
  error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    request: formatRequest(req),
  });
  next(err);
};

module.exports = {
  requestLogger,
  errorLogger,
};
