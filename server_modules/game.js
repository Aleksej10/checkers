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
        this._history = new Map();
        this._history.set(this._pos.toString(), 1);
    }

    get id() { return this._id; }

    treefold(){
        const ps = this._pos.toString();
        if(this._history.has(ps)){
            this._history.set(ps, this._history.get(ps)+1);
            if(this._history.get(ps) >= 3)  return true;
            else                            return false;
        }
        else{
            this._history.set(ps, 1);
            return false;
        }
    }

    over(){
        return this._pos.over() || treefold();
    }

    result(){
        return ((this._pos.fifty > 25) || treefold()) ? 0 : -this._pos.side;
    }

    playMove(m, otherPlayer, time){
        var move = new ch.Move(m._type, m._fromSquare,  m._toSquare, m._captureSquare);
        move.destringify();
        this._pos.playMove(move);
        otherPlayer.socket.send(JSON.stringify(['move', this._id, m, time]));

        // var moves = this._pos.genMoves(); //auto play forcing moves, doesn't work with AI
        // while(moves.length == 1){ 
        //     this._pos.playMove(moves[0]);
        //     moves[0].stringify();
        //     this._player1.socket.send(JSON.stringify(['move', this._id, moves[0], 'auto']));
        //     this._player2.socket.send(JSON.stringify(['move', this._id, moves[0], 'auto']));
        //     moves = this._pos.genMoves();
        // }
        
        if(over()){
            const result = result();
            if(result == 0) result = 'draw';
            else if(result == -1) result = 'black';
            else resuult = 'white';

            if(result == 'draw'){
                const deltas = gl.glicko(this._player1, this._player2, 0.5);
                this._player1.socket.send(JSON.stringify(['end', this._id, 'draw', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', this._id, 'draw', deltas[1]]));
            }
            else if(this._pos.result() == this._player1_color){
                const deltas = gl.glicko(this._player1, this._player2, 1);
                this._player1.socket.send(JSON.stringify(['end', this._id, 'won', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', this._id, 'lost', deltas[1]]));
            }
            else{
                const deltas = gl.glicko(this._player1, this._player2, 0);
                this._player1.socket.send(JSON.stringify(['end', this._id, 'lost', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', this._id, 'won', deltas[1]]));
            }
        }
    }
}

module.exports = {Game};
