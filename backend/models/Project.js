const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,

    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);