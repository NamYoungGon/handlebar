const express = require('express');
const app = express();

app.set('port', 3000);

app.get('/', (req, res) => {
    res.send('Express Works');
});

app.listen(app.get('port'), () => {
    console.log('Express started press Ctrl-C to terminate');
});