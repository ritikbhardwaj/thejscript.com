const app = require('express')();
const bodyParser = require('body-parser');
const cp = require('child_process');
const fs = require('fs');
var cors = require('cors');



app.use(require('express').static('public'));
//app.use(cors()); not required since both the backend and the fronend run on the same server
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });


app.get('/', (req, res) => {
    res.send('index.html');
});

app.post('/', (req, res) => {
    console.log('POST Request!');
    fs.open('file.js', 'w', (err, file) => {
        if (err) throw err;
        fs.writeFile('file.js', req.body.code, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });

    //to execute the child process in machine running nodejs
    cp.exec('node file.js', (err, stdout, stderr) => {
        if (err) {
            res.json({
                err: stderr
            }).status(400);
        } else {
            res.json({
                err: "",
                output: stdout
            }).status(200);
        }

    });

});


app.listen(8000, (err) => {
    if (err) throw err;
    console.log('Server started!');
});