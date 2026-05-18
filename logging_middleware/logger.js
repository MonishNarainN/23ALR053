const { LOG_LEVEL, DEFAULT_LOG_FORMAT } = require('./config');

const log = (level, message, meta = {}) => {
  if (['error', 'warn', 'info', 'debug'].includes(level)) {
    const timestamp = new Date().toISOString();
    const formatted = DEFAULT_LOG_FORMAT
      .replace('{timestamp}', timestamp)
      .replace('{level}', level.toUpperCase())
      .replace('{message}', message);

    console.log(formatted, JSON.stringify(meta));
  }
};

const info = (message, meta) => log('info', message, meta);
const warn = (message, meta) => log('warn', message, meta);
const error = (message, meta) => log('error', message, meta);
const debug = (message, meta) => log('debug', message, meta);

module.exports = {
  info,
  warn,
  error,
  debug,
};
