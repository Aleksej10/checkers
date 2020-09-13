const gl = require('./glicko.js');
const ch = require('./checkers.js');

class Game {
    constructor(id, pos, player1, player2, player1_color, player2_color){
        this._id = id;
        this._pos = pos;
        this._player1 = player1;
        this._player2 = player2;
        this._player1_color = player1_color;
        this._player2_color = player2_color;
    }

    get id() { return this._id; }

    playMove(m, otherPlayer, time){
        var move = new ch.Move(m._type, m._fromSquare,  m._toSquare, m._captureSquare);
        move.destringify();
        this._pos.playMove(move);
        otherPlayer.socket.send(JSON.stringify(['move', m, time]));

        // var moves = this._pos.genMoves(); //auto play forcing moves
        // while(moves.length == 1){ 
        //     this._pos.playMove(moves[0]);
        //     moves[0].stringify();
        //     this._player1.socket.send(JSON.stringify(['move', moves[0], 'auto']));
        //     this._player2.socket.send(JSON.stringify(['move', moves[0], 'auto']));
        //     moves = this._pos.genMoves();
        // }

        
        if(this._pos.over()){
            if(this._pos.result() == 'draw'){
                const deltas = gl.glicko(this._player1, this._player2, 0.5);
                this._player1.socket.send(JSON.stringify(['end', 'draw', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', 'draw', deltas[1]]));
            }
            else if(this._pos.result() == this._player1_color){
                const deltas = gl.glicko(this._player1, this._player2, 1);
                this._player1.socket.send(JSON.stringify(['end', 'won', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', 'lost', deltas[1]]));
            }
            else{
                const deltas = gl.glicko(this._player1, this._player2, 0);
                this._player1.socket.send(JSON.stringify(['end', 'lost', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', 'won', deltas[1]]));
            }
        }
    }
}

module.exports = {Game};
