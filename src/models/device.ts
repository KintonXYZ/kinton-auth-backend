import * as mongoose from "mongoose";

interface IDevice {
  ownerId: mongoose.Types.ObjectId;
  secret: string;
  fleetId: string;
};

interface IDeviceModel extends IDevice, mongoose.Document { }

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

export const Device = mongoose.model<IDeviceModel>("Device", DeviceSchema);
