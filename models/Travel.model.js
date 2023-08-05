const { Schema, model } = require("mongoose");


const travelSchema = new Schema(
    {
      origin: {
        type: String,
        trim: true,
        required: true,
        
      },
      destination: {
        type: String,
        required: true, 
      },
      date: {
        type: String,
        required: true
      }
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
  );
  
  const Travel = model("Travel", travelSchema);
  
  module.exports = Travel;