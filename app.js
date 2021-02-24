const constant = require('./const/constant');

const express = require('express'),
      app = express(),
      passport = require('passport'),
      mongoose = require('mongoose'),
      port = process.env.PORT || 3000
      moment = require("moment")

// database connector
mongoose.connect(constant.databaseEndpoint, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
// Set Parses JSON 
app.use(express.json())

// Import passport
require('./configs/passport');

// Routes
app.use('/', require('./routes/auth'))
app.use('/books', require('./routes/book'))
app.use('/users', require('./routes/user'))

// handling all invalid routes
app.get('*', function(req, res){
  res.json({
    error: "Route not found "+req.path
  });
});


// Error Handler
app.use((err, req, res, next) => {
  console.log("PATH ERROR")
  let statusCode = err.status || 500
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    }
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))