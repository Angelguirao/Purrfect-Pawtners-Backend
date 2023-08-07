const { Schema, model } = require("mongoose");


const HomeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    /* Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // Friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Cat'
    }]
    */
});

const Home = model('Home', HomeSchema);
module.exports = Home;
