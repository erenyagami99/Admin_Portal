const mongoose = require("mongoose");

const portalModel = mongoose.Schema(
  {
    appCode: { type: String, required: true },
    projectId: { type: String, required: true },
    modelId: { type: String, required: true },
    version: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Portal = mongoose.model("Portal", portalModel);

module.exports = Portal;
