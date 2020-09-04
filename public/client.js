function xy_from_bits(b){
    const d = 63n - pow_d(b);
    const xy = {'x': d / 8n, 'y': d % 8n};
    return xy;
}

function getBoardDiv(){
    if (game_side == Side.white) game_pos.flip_colors();
    var div = game_pos.getDiv();
    if (game_side == Side.white) game_pos.flip_colors();

    return div;
}

function drawBoard(b){
    document.getElementById('board').innerHTML = b;
}

function hlMoves(elem){
    if(game_pos.side != game_side) {
        //TODO add premove
        return;
    }

    var x = BigInt(parseFloat(elem.style.top)/12.5);
    var y = BigInt(parseFloat(elem.style.left)/12.5);

    if(clc != null){ //removes last hlight if same piece is pressed twice in a row
        if ((x == clc['x']) && (y == clc['y'])){
            drawBoard(getBoardDiv());
            clc = null;
            return;
        }
    }

    const mask = BigInt.asUintN(64, pow(63n-(8n*x+y))); //clicked square as bit mask
    var moves = game_pos.genMoves();
    var hls = '';
    for (const m of moves){
        if(mask == m.fromSquare){
            const xy_to = xy_from_bits(m.toSquare);
            var xx = 12.5 * parseInt(xy_to['x']);
            var yy = 12.5 * parseInt(xy_to['y']);
            hls += "<div class=\"pawn light\" onclick=\"playIt(this)\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
        }
    }
    clc = {'x':x, 'y':y};
    var new_div = getBoardDiv();
    new_div += hls;
    drawBoard(new_div);
}

function playIt(elem){
    var x_to = BigInt(parseFloat(elem.style.top)/12.5);
    var y_to = BigInt(parseFloat(elem.style.left)/12.5);
    const mask_to = BigInt.asUintN(64, pow(63n-(8n*x_to + y_to)));

    const x_from = clc['x'];
    const y_from = clc['y'];
    const mask_from = BigInt.asUintN(64, pow(63n-(8n*x_from + y_from)));
    var moves = game_pos.genMoves();
    var move = undefined;
    for (var i=0; i<moves.length; i++){
        if((mask_to == moves[i].toSquare) && (mask_from == moves[i].fromSquare)){
            game_pos.playMove(moves[i]);
            flip_flop();
            drawBoard(getBoardDiv());
            move = moves[i];
            move.stringify();
            ws.send(JSON.stringify(['move', current_game, id, move, your_time]));
            return;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

// const domain = '192.168.43.45';
const domain = 'localhost';

var ws = new WebSocket('ws://'+domain+':8081');
var id = undefined;

var game_pos = undefined;
var game_side = undefined; 
var clc = null; //last clicked figure
var current_game = undefined;

var logged = false;
var your_name = 'anon'
var your_elo = '?';
var your_time = 3 * 60 * 100;

var opponent_name = 'anon';
var opponent_elo = '?';
var opponent_time = 3 * 60 * 100;

var ticker = undefined;

ws.onmessage = function (event) {
    const msg = JSON.parse(event.data);
    parse_message(msg);
};


function logochange(elem){
    if(elem.className == 'logo-pawn black') elem.className = 'logo-pawn white';
    else elem.className = 'logo-pawn black';
}

function flip_flop(){
    const flop = document.getElementById('fflop');
    if(game_pos.side == Side.white){
        flop.className = 'pawn white';
    }
    else{
        flop.className = 'pawn black';
    }

}

function load_body(elem, page){
    fetch(page)
        .then(response => response.text())
        .then(text => {
            const el = document.createElement('html');
            el.innerHTML = text;
            document.body.innerHTML = el.getElementsByTagName('body')[0].innerHTML;
        });
    // window.history.pushState({'html':elem.html,'pageTitle':elem.pageTitle},'', page);
    if(logged == true) { //keep logged ones logged in
        setTimeout(() => {document.getElementById('signed').innerHTML = your_name;}, 500); 
    }
}

function signin(){
    const uname = document.getElementById('username').value;
    const pass  = sha256(document.getElementById('password').value);
    ws.send(JSON.stringify(['signin', id, uname, pass]));
}

function sign_click(elem){
    if(logged == true) return;
    load_body(elem, 'pages/sign.html');
}

function register(){
    const uname = document.getElementById('username').value;
    const pass  = sha256(document.getElementById('password').value);
    const mail  = document.getElementById('email').value;
    ws.send(JSON.stringify(['register', id, uname, pass, mail]));
}

document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 13 : document.getElementById('submit-button').click();
            break;
    }
}

function after_new_game(){
    drawBoard(getBoardDiv());
    print_names(your_name, your_elo, opponent_name, opponent_elo);
    document.getElementById('fflop').style.visibility = 'visible';
    document.getElementById('rematch').style.visibility = 'hidden';
    document.getElementById('player1-clock').innerHTML = '3:00:00';
    document.getElementById('player2-clock').innerHTML = '3:00:00';
    ticker = setInterval(tick, 10);
    flip_flop();
}

function after_game(){
    //TODO
}

function new_game(elem){
    ws.send(JSON.stringify(['new_game', id]));
    load_body(elem, 'pages/loader.html');
}

function print_names(yourName, yourElo, oppName, oppElo){
    const op_elo = (oppElo == '?') ? '?' : String(parseInt(oppElo));
    const yr_elo = (yourElo == '?') ? '?' : String(parseInt(yourElo));
    document.getElementById('player1').innerHTML = oppName + ' (' + op_elo + ')';
    document.getElementById('player2').innerHTML = yourName + ' (' + yr_elo + ')';
}

function print_result(msg, delta){
    document.getElementById('result').innerHTML = msg;
    document.getElementById('dev').innerHTML = delta;
}

function tick(){
    var ticking_clock;
    var resting_clock;
    var player_time;
    if(game_pos.side == game_side) { //your tick
        if(your_time <= 0){
            ws.send(JSON.stringify(['flag', current_game, id]));
            clearInterval(ticker);
        }
        player_time = your_time;
        your_time -= 1;
        ticking_clock = document.getElementById('player2-clock');
        resting_clock = document.getElementById('player1-clock');
    }
    else{ //opponents ticks
        if(opponent_time < 0) return;
        player_time = opponent_time;
        opponent_time -= 1;
        ticking_clock = document.getElementById('player1-clock');
        resting_clock = document.getElementById('player2-clock');
    }
    const minutes = '00' + parseInt(player_time/6000);
    const seconds = '00' + parseInt(player_time/100) % 60;
    const milis   = '00' + player_time % 100;
    ticking_clock.style.color = 'var(--accent)';
    resting_clock.style.color = 'var(--dark-2)';
    ticking_clock.innerHTML = 
        minutes.substr(minutes.length-2) + ':' +
        seconds.substr(seconds.length-2) + ':' +
        milis.substr(milis.length-2);
}

function parse_message(msg){
    if(msg[0] == 'handshake'){
        id = msg[1];
    }
    else if(msg[0] == 'game'){
        if(msg[1] == 'white')   game_side = Side.white;
        else                    game_side = Side.black;
        current_game = msg[2];
        opponent_name = msg[3];
        your_elo = msg[4];
        opponent_elo = msg[5];
        your_time = 3 * 60 * 100;
        opponent_time = 3 * 60 * 100;
        game_pos = Pos.initial();
        load_body(this, 'pages/board.html');
        setTimeout(() => {after_new_game();}, 500); //doesn't work without timeot
    }
    else if(msg[0] == 'move'){
        const m = msg[1];
        if(msg[2] != 'auto'){
            opponent_time = parseInt(msg[2]);
        }
        var move = new Move(m._type, m._fromSquare,  m._toSquare, m._captureSquare);
        move.destringify();
        game_pos.playMove(move);
        flip_flop();
        drawBoard(getBoardDiv());
    }
    else if(msg[0] == 'end'){
        clearInterval(ticker);
        document.getElementById('fflop').style.visibility = 'hidden';
        document.getElementById('rematch').style.visibility = 'visible';
        var delta = undefined;
        const asInt = parseInt(msg[2]);
        delta = (asInt > 0) ? ('+' + String(asInt)) : String(asInt);
        if(delta == 'NaN') delta = '';

        if(msg[1] == 'won'){
            print_result('you won, congrats.', delta);
        }
        else if(msg[1] == 'lost'){
            print_result('you are pathetic.', delta);
        }
        else{
            print_result('it is a draw, whatever.', delta);
        }
    }
    else if(msg[0] == 'signed'){
        if(msg[1] == 'success'){
            your_name = msg[2];
            your_elo  = msg[3];
            logged = true;
            load_body(this, 'index.html');
        }
        else{
            console.log(msg[1]);
            //TODO print some error info
        }
    }
    else if(msg[0] == 'registered'){
        if(msg[1] == 'success'){
            console.log('check your mail to sign in');
            window.location = 'index.html';
        }
        else{
            console.log(msg[1]);
            //TODO print some error info
        }
    }
    else{
        console.log(msg[0]);
    }
}
