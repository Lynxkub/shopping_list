const express = require('express')
const items = require('./fakeDb')
const listRoutes = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/list' , listRoutes);






module.exports = app


app.listen(3000 , function () {
    console.log('App running on 3000');
})

