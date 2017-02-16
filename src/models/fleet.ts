import * as mongoose from "mongoose";

interface IFleet {
  ownerId: mongoose.Types.ObjectId;
};

interface IFleetModel extends IFleet, mongoose.Document { }

const FleetSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  ownerId: mongoose.Schema.Types.ObjectId,
});

export const Fleet = mongoose.model<IFleetModel>("Fleet", FleetSchema);
