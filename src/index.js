const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');


// Initialiation
const app = express();

// Settings
const port = process.env.port || 3000;
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({storage}).single('image'));


// Routes
app.use('/api/file', require('./routes/index.routes'));


app.listen(port,() => {
    console.log(`Server online on port ${port}`);
})
