const express = require('express');
const app = express();

app.disable('x-powered-by');

const handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// MORE IMPORTS HERE

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});



app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});





