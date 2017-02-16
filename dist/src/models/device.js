"use strict";
const mongoose = require("mongoose");
;
const DeviceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    secret: String,
    fleetId: String,
});
exports.Device = mongoose.model("Device", DeviceSchema);
