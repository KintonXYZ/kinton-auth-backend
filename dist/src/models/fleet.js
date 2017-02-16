"use strict";
const mongoose = require("mongoose");
;
const FleetSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    ownerId: mongoose.Schema.Types.ObjectId,
});
exports.Fleet = mongoose.model("Fleet", FleetSchema);
