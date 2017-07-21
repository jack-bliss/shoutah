const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const database = __dirname + '/database/';
const AllShouts = database + 'shouts.json';
const AllUsers = database + 'users.json';

const app = express();
const port = process.env.PORT || 8000;

app.set('port', port);
app.use(express.static(path.join(__dirname, './dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

function getFromListById(id, list){
    return list.reduce((current, user) => {
        return (user.id === id ? user : current);
    }, {});
}

function loadUserById(id){
    return new Promise(resolve => {
        fs.readFile(AllUsers, (err, users) => {
            resolve(getFromListById(id, JSON.parse(users)));
        });
    })
}

app.get('/user/:id', (req, res) => {
    loadUserById(parseInt(req.params.id))
    .then(user => {
        return res.send(user);
    });
});

app.get('/feed/:filter?/:with?', (req, res) => {
    if(req.params.filter) {
        fs.readFile(AllShouts, (err, data) => {
            let shouts = JSON.parse(data);
            if (req.params.filter === 'user') {
                shouts = shouts.filter(shout => {
                    return shout.author.id === parseInt(req.params.with);
                });
                return res.send(JSON.stringify(shouts));
            } else if (req.params.filter === 'followed_by') {
                loadUserById(parseInt(req.params.with))
                .then(user => {
                    shouts = shouts.filter(shout => {
                        return user.following.indexOf(shout.author.id) > -1 || shout.author.id === user.id;
                    });
                    return res.send(JSON.stringify(shouts));
                });
            }
        });
    } else {
        return res.sendFile(AllShouts);
    }
});

app.post('/new_shout/', (req, res) => {
    const shout = {
        author: req.body.user,
        body: req.body.body,
        time: Date.now()
    };
    new Promise(resolve => {
        fs.readFile(AllShouts, (err, data) => {
            resolve(JSON.parse(data));
        });
    }).then(shouts => {
        shouts.push(shout);
        return new Promise(resolve => {
            fs.writeFile(AllShouts, JSON.stringify(shouts), (err) => {
                resolve(true);
            });
        });
    }).then(() => {
        res.send(JSON.stringify(shout));
    })
})

app.get('*', (req, res) => {
    console.log('Serving ', req.url);
    res.sendFile(__dirname + '/dist/app.html');
});

app.listen(port, () => console.log('Listening on port', port));