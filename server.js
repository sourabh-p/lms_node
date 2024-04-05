const express = require('express');
const morgan = require('morgan');

const app  = express(); //  create application instance of express
const PORT = process.env.PORT  || 2020;

// ==== Middleware =====
app.use(morgan("dev"));

app.listen(PORT, console.log(`Server is running on port: ${PORT}`));