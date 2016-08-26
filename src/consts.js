exports.DEBUG_LEVEL = (process.env.DEBUG || 'false') === 'true' ? 'debug' : 'info';
exports.PORT = process.env.PORT || 3000;
