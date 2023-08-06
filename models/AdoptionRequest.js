const { Schema, model } = require("mongoose");

const adoptionRequestSchema = new Schema(
    {
        ageInMonths: {
            type: Number,
        },
        gender: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        cat: {
            type: Schema.Types.ObjectId,
            ref: "Cat",
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const AdoptionRequest = model("AdoptionRequest", adoptionRequestSchema);

module.exports = AdoptionRequest;
