const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const DEFAULT_LOG_FORMAT = '[{timestamp}] {level}: {message}';

module.exports = {
  LOG_LEVEL,
  DEFAULT_LOG_FORMAT,
};
