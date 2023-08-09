const { Schema, model } = require("mongoose");

const catSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        Owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Cat = model("Cat", catSchema);

module.exports = Cat;
