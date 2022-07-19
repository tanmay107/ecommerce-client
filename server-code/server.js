var express = require('express');
const cors = require('cors');
const user = require('./config');

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', function (req, res) {
    res.send("Welocme to GeeksforGeeks!");
});

app.post('/create', async (req, res) => {
    const data = req.body;
    console.log(data);
    res.send({ msg: "User Added" });
});


app.listen(5000);