// Importing the app configuration from app.js
const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. 
// If no environment variable has been set, we hard code it to 5005.
// It's crucial to use environment variables for configuration to avoid exposing sensitive information.
const PORT = process.env.PORT || 5005;

// Starting the server on the specified PORT.
// A callback function is used to log the URL where the server is listening.
// This is useful for debugging and ensuring that the server has started successfully.

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
