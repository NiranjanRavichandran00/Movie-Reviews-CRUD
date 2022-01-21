const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors());    

mongoose.connect("mongodb+srv://admin:admin@crud.iivwy.mongodb.net/movie?retryWrites=true&w=majority", {
    useNewUrlParser:true,   
})

const insertRouter  = require ('./routes/movie');

app.use("/movie", insertRouter);

app.listen(3001, () => {
    console.log('Server running on port 3001');
})