const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
    {
      article: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      information: {
        type: String,
        required: true, 
      },
      month: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true 
      }
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
  );
  
  const Comment = model("Comment", commentSchema);
  
  module.exports = Comment;