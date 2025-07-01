// This file is used to start the API server
const dotenv = require('dotenv');
const api = require('./api.js');

// Load environment variables
dotenv.config();

// The server is already started in api.js
console.log('Server started successfully!');