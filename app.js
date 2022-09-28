const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test-bits-db').then(success=>{
    console.log('DB Server Connected!!!');
});

const student = mongoose.model('students', new mongoose.Schema({
    age: Number,
    name: String,
    StClass: String
}));


const app = express();

const check_auth = (req, res, next) => {
    console.log('Inside the AUth middleware!');
    next();
}

app.use((req, res, next) => {
    console.log('req: ', req.url, req.method);
    next();
});

//http://localhost:7000/

app.use(express.json());

app.get('/', check_auth, (req, res) => {
    
    res.send('<h1>Hello World!</h1>');
});

app.post('/data', check_auth, async (req, res) => {
    console.log('body: ', req.body);
    const student_created = await student.create(req.body);
    res.send(student_created);
});

app.listen(7000, err => {
    if(err){
        console.log('Error: ', err);
        return;
    }
    console.log('Server Listening at port 7000');
});

