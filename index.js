const express = require('express');
const app = express();
const port = 8000;
app.listen(8000, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Server is running fine ');
})