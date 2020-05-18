const express = require("express")
const mongoose = require("mongoose");

const app = express();

const db = require("./config/key.env").MongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch( (err) => console.log(err))

//Bodyparser
app.use(express.urlencoded({
    extended: false
}));

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));