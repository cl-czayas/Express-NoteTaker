const express = require('express');
const path = require('path');
const notes = require('./db/db.json')
const fs =  require('fs')
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET request for ALL notes
app.get('/api/notes', (req, res) => {
    // Sending all notes to the client
    return res.status(200).json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id =  uuidv4();
    notes.push(req.body)
    fs.writeFile("./db/db.json",JSON.stringify(notes),(error)=>{
        if(error) {
            console.log(error);
            res.json(error);
        } else {
            res.redirect('/notes')
        }
    })
});


app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);