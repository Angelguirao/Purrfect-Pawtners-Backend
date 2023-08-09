const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    house: [
      {
      type: Schema.Types.ObjectId,
      ref:"Home"
      }
    ],
    cat: [
      {
      type: Schema.Types.ObjectId,
      ref:"Cat"
      }
    ],
    articles: [
      {
      type: Schema.Types.ObjectId,
      ref:"Article"
      }
    ],
    comments: [
      {
      type: Schema.Types.ObjectId,
      ref:"Comment"
      }
    ],
    travel: [
      {
      type: Schema.Types.ObjectId,
      ref:"travel"
      }
    ],

      
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
