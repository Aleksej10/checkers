var waiting = {};
var games = {};
var players = {}

const sha = require('./server_modules/sha.js');
const ch = require('./server_modules/checkers.js');
const gl = require('./server_modules/glicko.js');
const pl = require('./server_modules/player.js');
const gm = require('./server_modules/game.js');
const uModel = require('./server_modules/user_model.js');

const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const mailer = require('nodemailer');
const mong = require('mongoose');
const dbString = 'mongodb://localhost:27017/users';
const { exec } = require('child_process');

mong.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mong.connection.once('open', () => { console.log("mongo is online"); });
mong.connection.on('error', (e) => { console.log(e); });

let transport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth:{ user: 'dama23156', pass: 'eHx8LiLCbTnLqtT' }
});

function welcomeLetter(mail, uname, verification){
    const msg = {
        from: 'checkers.org',
        to: mail,
        subject: 'welcome to checkers 2.0',
        text: 'hey ' + uname + ', welcome to checkers 2.0, to finish registration simply use this password in your next sign in: ' + verification + ', after that you can sign in normally with your password.',
        html: '<p>hey ' + uname + ', welcome to <b>checkers 2.0</b>, to finish registration simply use this password in your next sign in: <b>' + verification + '</b>, after that you can sign in normally with your password.</p>'
    };
    return msg;
}

// const domain = require('os').networkInterfaces()['wlan0'][0]['address'];
const domain = 'localhost';
const port = '8080';
const command = 'sed -E -i "s:^const domain.*:const domain = \'' + domain + '\';:g" public/client.js'
exec(command, (err, _, _1) => {
    if(err) { console.log(err.message); }
    else{ console.log("domain updated in client.js"); }
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, domain, () => {
    console.log('fully online at: ' + domain + ':' + port);
});



const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', ((ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log("ip " + ip + " connected");
    const userID = (Math.random().toString(36)+'00000000000000000').slice(2, 13); //TODO sha256(ip)
    players[userID] = new pl.Player(userID, ws);
    console.log('id ' + userID + ' connected');
    ws.send(JSON.stringify(['handshake', userID]));

    ws.on('message', (message) => {
        const msg = JSON.parse(message);
        parse_message(msg);
    });

}));

var aiID;

function parse_message(msg){
    if(msg[0] == 'move'){ // ['move', gameID, userID, move, time]
        const gameID = msg[1];
        const userID = msg[2];
        var otherPlayer = undefined;
        if(gameID.search(userID) == 0)  otherPlayer = players[gameID.slice(11)];
        else                            otherPlayer = players[gameID.slice(0, 11)];
        games[gameID].playMove(msg[3], otherPlayer, msg[4]);
    }
    else if(msg[0] == 'flag'){ // ['flag', gameID, userID]
        const gameID = msg[1];
        const userID = msg[2];
        if(gameID.search(userID) == 0)  otherPlayer = gameID.slice(11);
        else                            otherPlayer = gameID.slice(0, 11);
        const deltas = gl.glicko(players[userID], players[otherPlayer], 0);
        players[userID].socket.send(JSON.stringify(['end', gameID, 'lost', deltas[0]]));
        players[otherPlayer].socket.send(JSON.stringify(['end', gameID, 'won', deltas[1]]));
    }
    else if(msg[0] == 'new_game'){ // ['new_game', userID ]
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
            const start_time = 3 * 60 * 100; // 3 mins
            players[player1].socket.send(JSON.stringify(['game', player1_color, gameID, players[player2].name, players[player1].elo, players[player2].elo, start_time]));
            players[player2].socket.send(JSON.stringify(['game', player2_color, gameID, players[player1].name, players[player2].elo, players[player1].elo, start_time]));
        }
    }
    else if(msg[0] == 'robot_game'){ // ['robot_game', userID ] TODO add time, level
        const player1 = msg[1];
        const player2 = aiID;
        var player1_color = 'white';
        var player2_color = 'black';
        var player_side   = 1;
        if(Math.random() >= 0.5){
            player1_color = 'black';
            player2_color = 'white';
            player_side   = -1;
        }
        const gameID = player1 + player2;
        games[gameID] = new gm.Game(gameID, ch.Pos.initial(), players[player1], players[player2], player1_color, player2_color);
        console.log('new game created: ' + gameID);
        const start_time = 3 * 60 * 100; // 3 mins
        players[player1].socket.send(JSON.stringify(['game', player1_color, gameID, players[player2].name, players[player1].elo, players[player2].elo, start_time]));
        players[player2].socket.send(JSON.stringify(['game', gameID, player_side, 100, start_time]));
    }
    else if(msg[0] == 'signin'){ // ['signin', userID, username, password]
        const userID = msg[1];
        const uname  = msg[2];
        const pass   = msg[3];

        if(uname == "ai") aiID = userID;

        uModel.userModel.findOne({username: uname}, (err, user)=>{
            if(err){ console.log(err); }
            else{
                if(user === null){//user doesn't exist
                    console.log(uname + ' does not exist in the database');
                    players[userID].socket.send(JSON.stringify(['signed', 'non existing username']));
                }
                else{
                    if(user.verified === false){
                        if(user.verification === pass){
                            user.verified = true; user.markModified('verified');
                            user.verification = undefined; 
                            players[userID].sign(uname, user.elo, user.dev);
                            players[userID].socket.send(JSON.stringify(['signed', 'success', uname, user.elo]));
                            user.save((err)=>{if(err)console.log(err);});
                        }
                        else{
                            console.log(uname + ', wrong verification');
                            players[userID].socket.send(JSON.stringify(['signed', 'wrong verification password, check your inbox']));
                        }
                    }
                    else{
                        if(pass === user.password){
                            console.log(uname + ' signed in');
                            players[userID].sign(uname, user.elo, user.dev);
                            players[userID].socket.send(JSON.stringify(['signed', 'success', uname, user.elo]));
                        }
                        else{
                            console.log(uname + ' wrong password');
                            players[userID].socket.send(JSON.stringify(['signed', 'wrong password']));
                        }
                    }
                }
            }
        });
    }
    else if(msg[0] == 'register'){ // ['register', userID, username, password, email]
        const userID = msg[1];
        const uname  = msg[2];
        const pass   = msg[3];
        const mail   = msg[4];

        uModel.userModel.findOne({username: uname}, (err, user)=>{
            if(err){ console.log(err); }
            else{
                if(user === null){
                    const verification = (Math.random().toString(36)+'00000000000000000').slice(2, 13);
                    const message = welcomeLetter(mail, uname, verification);
                    transport.sendMail(message, (err) => {
                        if(err){
                            console.log(err);
                            players[userID].socket.send(JSON.stringify(['registered', 'mailman fault']));
                        }
                        else{
                            const newUser = {
                                'username': uname,
                                'password': pass,
                                'email': mail,
                                'verification': sha.sha256(verification),
                            };
                            console.log('email sent, user ' + uname + ' registered');
                            players[userID].socket.send(JSON.stringify(['registered', 'success']));
                            const doc = new uModel.userModel(newUser);
                            doc.save((err)=>{if(err)console.log(err);});
                            // await doc.save();
                        }
                    });
                }
                else{
                    players[userID].socket.send(JSON.stringify(['registered', 'username already exists']));
                }
            }
        });
    }
    else{
        console.log(msg);
    }
}

