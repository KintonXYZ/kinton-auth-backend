exports.DEBUG_LEVEL = (process.env.DEBUG || 'false') === 'true' ? 'debug' : 'info';
exports.PORT = process.env.PORT || 3000;
exports.MONGO_HOST = process.env.MONGO_HOST || 'mongodb';
