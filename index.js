const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Server is running fine');
})