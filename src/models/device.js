const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  secret: String,
  fleetId: String,
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
