// DEPENDENCIES
const express = require("express");
const path = require("path");

// SET UP APP & PORT
const app = express();
const PORT = 3001;

// MIDDLEWARES
app.use(express.static("public"));

// ROUTES
app.get("/helloworld", (req, res) => res.send("HELLO WORLD"));

// START THE SERVER
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
