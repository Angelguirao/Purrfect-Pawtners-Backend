const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
    {
      title: {
        type: String,
        trim: true,
        required: true,
      },
      information: {
        type: String,
        required: true, 
      },
      month: {
        type: String,
        
      },
      year: {
        type: String,
        
      },
      author: {
        type: String,
        required: true 
      },
      receptor: {
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