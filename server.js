var waiting = {};
var games = {};
var players = {}
var db = require('./database.json'); 


const sha = require('./server_modules/sha.js');
const ch = require('./server_modules/checkers.js');
const gl = require('./server_modules/glicko.js');
const pl = require('./server_modules/player.js');
const gm = require('./server_modules/game.js');

const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const mailer = require('nodemailer');
const mong = require('mongoose');
const dbString = "mongodb://localhost:27017/users";


mong.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mong.connection.once('open', () => {
    console.log("mongo radi");
});

mong.connection.on('error', (e) => {
    console.log(e);
});

const userSchema = new mong.Schema({
    _id: mong.Schema.Types.ObjectId,
    usernmae: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    elo: {
        type: Number,
        required: true,
    },
    dev: {
        type: Number,
        required: true,
    },
    verified: {
        type: Boolean,
        required: true,
    },
    verification: {
        type: String,
        required: false,
    },
});

const userModel = mong.model('users', userSchema);

userModel.findOne({username: 'creator'}, (err, res)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(res);
    }
});

let transport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: 'dama23156',
        pass: 'eHx8LiLCbTnLqtT'
    }
});

// const domain = require('os').networkInterfaces()['wlan0'][0]['address'];
const domain = 'localhost';
const port = '8080';

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, domain, () => {
    console.log('fully online at: ' + domain + ':' + port);
});

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', ((ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(ip + " connected");
    const userID = (Math.random().toString(36)+'00000000000000000').slice(2, 13);
    players[userID] = new pl.Player(userID, ws, db);
    console.log('id ' + userID + ' connected');
    ws.send(JSON.stringify(['handshake', userID]));

    ws.on('message', (message) => {
        const msg = JSON.parse(message);
        parse_message(msg);
    });

    ws.on('end', () => {
        console.log('Connection ended...');
        //TODO destroy the client? remove it from queues etc..
    });

}));

function parse_message(msg){
    if(msg[0] == 'move'){
        const gameID = msg[1];
        const userID = msg[2];
        var otherPlayer = undefined;
        if(gameID.search(userID) == 0)  otherPlayer = players[gameID.slice(11)];
        else                            otherPlayer = players[gameID.slice(0, 11)];
        games[gameID].playMove(msg[3], otherPlayer, msg[4]);
    }
    else if(msg[0] == 'flag'){
        const gameID = msg[1];
        const userID = msg[2];
        if(gameID.search(userID) == 0)  otherPlayer = gameID.slice(11);
        else                            otherPlayer = gameID.slice(0, 11);
        const deltas = gl.glicko(players[userID], players[otherPlayer], 0);
        players[userID].socket.send(JSON.stringify(['end', 'lost', deltas[0]]));
        players[otherPlayer].socket.send(JSON.stringify(['end', 'won', deltas[1]]));
    }
    else if(msg[0] == 'new_game'){
        const userID = msg[1];
        waiting[userID] = 1;
        if(Object.keys(waiting).length >= 2){
            const player1 = Object.keys(waiting)[0];
            const player2 = Object.keys(waiting)[1];
            delete waiting[player1];
            delete waiting[player2];
            var player1_color = 'white';
            var player2_color = 'black';
            if(Math.random() >= 0.5){
                player1_color = 'black';
                player2_color = 'white';
            }
            const gameID = player1 + player2;
            games[gameID] = new gm.Game(gameID, ch.Pos.initial(), players[player1], players[player2], player1_color, player2_color);
            console.log('new game started: ' + gameID);
            players[player1].socket.send(JSON.stringify(['game', player1_color, gameID, players[player2].name, players[player1].elo, players[player2].elo]));
            players[player2].socket.send(JSON.stringify(['game', player2_color, gameID, players[player1].name, players[player2].elo, players[player1].elo]));
        }
    }
    else if(msg[0] == 'signin'){
        const userID = msg[1];
        const uname  = msg[2];
        const pass   = msg[3];
        if (db[uname] == undefined) {
            console.log(uname + ' does not exist in the database');
            players[userID].socket.send(JSON.stringify(['signed', 'non existing username']));
        }
        else{
            if(db[uname].verified == 'false'){
                if(pass != db[uname].verification){
                    console.log(uname + ', wrong verification');
                    players[userID].socket.send(JSON.stringify(['signed', 'wrong verification password, check your inbox']));
                    return;
                }
                else{
                    db[uname].verified = 'true';
                    delete db[uname].verification;
                    players[userID].sign(uname, db[uname].elo, db[uname].dev);
                    players[userID].socket.send(JSON.stringify(['signed', 'success', uname, db[uname].elo]));
                    fs.writeFileSync('./database.json', JSON.stringify(db), err => {
                        if(err) throw err;
                        console.log('user verified');
                    });
                }
            }
            else{
                if(pass == db[uname].password){
                    console.log(uname + ' signed in');
                    players[userID].sign(uname, db[uname].elo, db[uname].dev);
                    players[userID].socket.send(JSON.stringify(['signed', 'success', uname, db[uname].elo]));
                }
                else{
                    console.log(uname + ' wrong password');
                    players[userID].socket.send(JSON.stringify(['signed', 'wrong password']));
                }
            }
        }
    }
    else if(msg[0] == 'register'){
        const userID = msg[1];
        const uname  = msg[2];
        const pass   = msg[3];
        const mail   = msg[4];
        if (db[uname] == undefined) {
            const verification = (Math.random().toString(36)+'00000000000000000').slice(2, 13);
            const message = {
                from: 'dama23156@gmail.com',
                to: mail,
                subject: 'welcome to checkers 2.0',
                text: 'hey ' + uname + ', welcome to checkers 2.0, to finish registration simply use this password in your next sign in: ' + verification + ', after that you can sign in normally with your password.',
                html: '<p>hey ' + uname + ', welcome to <b>checkers 2.0</b>, to finish registration simply use this password in your next sign in: <b>' + verification + '</b>, after that you can sign in normally with your password.</p>'
            };
            transport.sendMail(message, (err) => {
                if(err){
                    console.log(err);
                    players[userID].socket.send(JSON.stringify(['registered', 'something went wrong']));
                }
                else{
                    db[uname] = {
                        'password': pass,
                        'email': mail,
                        'elo': '1500',
                        'dev': '350',
                        'verified': 'false',
                        'verification': sha.sha256(verification),
                    };
                    console.log('email sent, user ' + uname + ' registered');
                    players[userID].socket.send(JSON.stringify(['registered', 'success']));
                    fs.writeFileSync('./database.json', JSON.stringify(db), err => {
                        if(err) throw err;
                        console.log('new user added');
                    });
                }
            });
        }
        else{
            players[userID].socket.send(JSON.stringify(['registered', 'username already exists']));
        }
    }
    else{
        console.log(msg);
    }
}

