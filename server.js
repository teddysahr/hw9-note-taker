// DEPENDENCIES
const express = require("express");
const path = require("path");

// SET UP APP & PORT
const app = express();
const PORT = 3001;

// MIDDLEWARES
app.use(express.static("public"));
