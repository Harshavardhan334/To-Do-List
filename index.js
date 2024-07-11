const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const taskRoute = require('./routes/task');
const { connectMongoDb } = require('./connect');

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.locals.formatDateTime = function(dateTimeStr) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTime = new Date(dateTimeStr);
    return dateTime.toLocaleDateString('en-US', options);
};

connectMongoDb('mongodb://127.0.0.1:27017/taskManager');

app.use('/home', taskRoute);

app.listen(PORT, () => {
    console.log(`Server Started at PORT:${PORT}`);
});
