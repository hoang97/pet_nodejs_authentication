const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongoDB then listen to port 3000
const dbURI = 'mongodb+srv://hoang:Hoangndnd1805!!!@nodejs.nwqx39z.mongodb.net/blogs?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'my_views'); // change the views folder's name

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views/static'));


app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About page' });
});

app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404 page' });
});
