const formatRequest = (req) => ({
  method: req.method,
  path: req.originalUrl,
  headers: {
    host: req.headers.host,
    'user-agent': req.headers['user-agent'],
  },
  body: req.body,
  query: req.query,
});

const formatResponse = (res) => ({
  statusCode: res.statusCode,
});

module.exports = {
  formatRequest,
  formatResponse,
};
