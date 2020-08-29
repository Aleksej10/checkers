
//////////////////////////////////////////////////////////////////////
//TODO keep game logic just on server??
const squares = [
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000000000000000000010n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000000000000000001000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000000000000000100000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000000000000010000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000000000000100000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000000000010000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000000001000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000000100000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000000100000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000000010000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000001000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000000100000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000001000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000000100000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000000010000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000000001000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000001000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000000100000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000000010000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000001000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000000010000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000001000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000000100000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000000010000000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000000010000000000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000001000000000000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000000100000000000000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000010000000000000000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000000100000000000000000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0000010000000000000000000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0001000000000000000000000000000000000000000000000000000000000000n),
BigInt.asUintN(64, 0b0100000000000000000000000000000000000000000000000000000000000000n)];

const first_1    =   BigInt.asUintN(64, 0b0000000010101010010101011010101001010101101010100101010110101010n);
const r_first_1  =   BigInt.asUintN(64, 0b0101010110101010010101011010101001010101101010100101010100000000n);
const first_2    =   BigInt.asUintN(64, 0b0101010110101010000000000000000000000000000000000000000000000000n);
const n_first_2  =   BigInt.asUintN(64, 0b0000000000000000010101011010101001010101101010100101010110101010n);
const r_first_2  =   BigInt.asUintN(64, 0b0101010110101010010101011010101001010101101010100000000000000000n);
const first_3    =   BigInt.asUintN(64, 0b0101010110101010010101010000000000000000000000000000000000000000n);
const n_first_3  =   BigInt.asUintN(64, 0b0000000000000000000000001010101001010101101010100101010110101010n);
const legal_mask =   BigInt.asUintN(64, 0b0101010110101010010101011010101001010101101010100101010110101010n);

function reverse(n){
    n = ((n >> 1n) & BigInt.asUintN(64, 0b0101010101010101010101010101010101010101010101010101010101010101n))|
        ((n << 1n) & BigInt.asUintN(64, 0b1010101010101010101010101010101010101010101010101010101010101010n));
    n = ((n >> 2n) & BigInt.asUintN(64, 0b0011001100110011001100110011001100110011001100110011001100110011n))|
        ((n << 2n) & BigInt.asUintN(64, 0b1100110011001100110011001100110011001100110011001100110011001100n));
    n = ((n >> 4n) & BigInt.asUintN(64, 0b0000111100001111000011110000111100001111000011110000111100001111n))|
        ((n << 4n) & BigInt.asUintN(64, 0b1111000011110000111100001111000011110000111100001111000011110000n));
    n = ((n >> 8n) & BigInt.asUintN(64, 0b0000000011111111000000001111111100000000111111110000000011111111n))|
        ((n << 8n) & BigInt.asUintN(64, 0b1111111100000000111111110000000011111111000000001111111100000000n));
    n = ((n >>16n) & BigInt.asUintN(64, 0b0000000000000000111111111111111100000000000000001111111111111111n))|
        ((n <<16n) & BigInt.asUintN(64, 0b1111111111111111000000000000000011111111111111110000000000000000n));
    n = ((n >>32n) & BigInt.asUintN(64, 0b0000000000000000000000000000000011111111111111111111111111111111n))|
        ((n <<32n) & BigInt.asUintN(64, 0b1111111111111111111111111111111100000000000000000000000000000000n));
    return n;
}

function pow(n){
    var dva = 1n;
    for (var i = 0; i < n; i++) {
        dva = dva * 2n;
    }
    return dva;
}

function pow_d(n){
    var nn = parseFloat(n);
    var dva = 0n;
    while(nn>1.0){
        nn = nn/2.0;
        dva = dva + 1n;
    }
    return dva;
}

const Side = Object.freeze({'black':true, 'white':false})

const mType = Object.freeze({'silent':1, 'capture':2, 'promotion':3})

class Move {
    constructor(m, f, t, c){
        this._type = m;
        this._fromSquare = f;
        this._toSquare = t;
        this._captureSquare = c;
    }

    get fromSquare(){
        return this._fromSquare;
    }
    get toSquare(){
        return this._toSquare;
    }
    get captureSquare(){
        return this._captureSquare;
    }
    get type(){
        return this._type;
    }

    stringify(){
        this._fromSquare = this._fromSquare.toString();
        this._toSquare = this._toSquare.toString();
        this._captureSquare = this._captureSquare.toString();
    }

    destringify(){
        this._fromSquare = BigInt(this._fromSquare);
        this._toSquare = BigInt(this._toSquare);
        this._captureSquare = BigInt(this._captureSquare);
    }
}

class Pos {
    constructor(b, w, bk, wk, s, c, f){
        this._black = b;
        this._white = w;
        this._blackKing = bk;
        this._whiteKing = wk;
        this._side = s;
        this._capture = c;
        this._fifty = f;
    } 

    static initial(){
        return new Pos(BigInt.asUintN(64, 0b0000000000000000000000000000000000000000101010100101010110101010n),
                       BigInt.asUintN(64, 0b0101010110101010010101010000000000000000000000000000000000000000n),
                       BigInt.asUintN(64, 0b0n),
                       BigInt.asUintN(64, 0b0n),
                       Side.black,
                       legal_mask,
                       0,
                    )
    }

    switch_side(){
        this._side = (this._side == Side.white) ? Side.black : Side.white;
    }

    flip_board(){
        if(this._side == Side.white){
            const b = this._black;
            const w = this._white;
            const bk = this._blackKing;
            const wk = this._whiteKing;
            const cc = this._capture;
            this._black     = reverse(w);
            this._white     = reverse(b);
            this._blackKing = reverse(wk);
            this._whiteKing = reverse(bk);
            this._capture   = reverse(cc);
        }
    }

    flip_colors(){
        const b = this._black;
        const w = this._white;
        const bk = this._blackKing;
        const wk = this._whiteKing;
        this._black     = reverse(b);
        this._white     = reverse(w);
        this._blackKing = reverse(bk);
        this._whiteKing = reverse(wk);
    }

    get side(){
        return this._side;
    }

    genMoves(){
        var moves = [];

        var w  = this._white;
        var b  = this._black;
        var bk = this._blackKing;
        var c  = this._capture;

        if(this._side == Side.white){
            w  = reverse(this._black);
            b  = reverse(this._white);
            bk = reverse(this._whiteKing);
            c  = reverse(this._capture);
        }

        var wb = ~(w | b) & legal_mask;
        var no_bking = b ^ bk;
        var wr7  = (w >> 7n) & (wb >> 14n) & n_first_2;
        var wr9  = (w >> 9n) & (wb >> 18n) & n_first_2;
        var wl7  = (w << 7n) & (wb << 14n) & r_first_2;
        var wl9  = (w << 9n) & (wb << 18n) & r_first_2;

        var captur_1 = c & no_bking & wr7;
        var captur_2 = c & no_bking & wr9;
        var king_c1  = c & bk       & wr7;
        var king_c2  = c & bk       & wr9;
        var king_c3  = c & bk       & wl7;
        var king_c4  = c & bk       & wl9;

        var captures = captur_1 | captur_2 | king_c1 | king_c2 | king_c3 | king_c4;

        if(captures != BigInt.asUintN(64, 0b0n)){
            if(c != legal_mask){
                if((c & bk) != BigInt.asUintN(64, 0b0n)){
                    if(king_c1 != BigInt.asUintN(64, 0b0n))
                        moves.push(new Move(mType.capture,   c, c << 14n, c << 7n));
                    if(king_c2 != BigInt.asUintN(64, 0b0n))                                            
                        moves.push(new Move(mType.capture,   c, c << 18n, c << 9n));
                    if(king_c3 != BigInt.asUintN(64, 0b0n))                                   
                        moves.push(new Move(mType.capture,   c, c >> 14n, c >> 7n));
                    if(king_c4 != BigInt.asUintN(64, 0b0n))                                  
                        moves.push(new Move(mType.capture,   c, c >> 18n, c >> 9n));
                }                                                     
                else{                                                
                    if((captur_1 & n_first_3) != BigInt.asUintN(64, 0b0n))                 
                        moves.push(new Move(mType.capture,   c, c << 14n, c << 7n));
                    if((captur_2 & n_first_3) != BigInt.asUintN(64, 0b0n))                
                        moves.push(new Move(mType.capture,   c, c << 18n, c << 9n));
                    if((captur_1 &   first_3) != BigInt.asUintN(64, 0b0n))               
                        moves.push(new Move(mType.promotion, c, c << 14n, c << 7n));
                    if((captur_2 &   first_3) != BigInt.asUintN(64, 0b0n))              
                        moves.push(new Move(mType.promotion, c, c << 18n, c << 9n));
                }
                return moves;
            }
            for( const s of squares){
                if((captures & s) == BigInt.asUintN(64, 0b0n)) continue;
                if((captur_1 & n_first_3 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.capture,   s, s << 14n, s << 7n));
                if((captur_2 & n_first_3 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.capture,   s, s << 18n, s << 9n));
                if((captur_1 &   first_3 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.promotion, s, s << 14n, s << 7n));
                if((captur_2 &   first_3 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.promotion, s, s << 18n, s << 9n));
                if((king_c1 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.capture,   s, s << 14n, s << 7n));
                if((king_c2 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.capture,   s, s << 18n, s << 9n));
                if((king_c3 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.capture,   s, s >> 14n, s >> 7n));
                if((king_c4 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.capture,   s, s >> 18n, s >> 9n));
            }
            return moves;
        }
        else{
            var silent_1 = c & no_bking & (wb >> 7n) &   first_1;
            var silent_2 = c & no_bking & (wb >> 9n) &   first_1;
            var king_s1  = c & bk       & (wb >> 7n) &   first_1;
            var king_s2  = c & bk       & (wb >> 9n) &   first_1;
            var king_s3  = c & bk       & (wb << 7n) & r_first_1;
            var king_s4  = c & bk       & (wb << 9n) & r_first_1;

            var silents = silent_1 | silent_2 | king_s1 | king_s2 | king_s3 | king_s4;

            for( const s of squares){
                if((silents & s) == BigInt.asUintN(64, 0b0n)) continue;
                if((silent_1 & n_first_2 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.silent,    s, s << 7n, BigInt.asUintN(64, 0b0n)));
                if((silent_2 & n_first_2 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.silent,    s, s << 9n, BigInt.asUintN(64, 0b0n)));
                if((silent_1 &   first_2 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.promotion, s, s << 7n, BigInt.asUintN(64, 0b0n)));
                if((silent_2 &   first_2 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.promotion, s, s << 9n, BigInt.asUintN(64, 0b0n)));
                if((king_s1 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.silent,    s, s << 7n, BigInt.asUintN(64, 0b0n)));
                if((king_s2 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.silent,    s, s << 9n, BigInt.asUintN(64, 0b0n)));
                if((king_s3 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.silent,    s, s >> 7n, BigInt.asUintN(64, 0b0n)));
                if((king_s4 & s) != BigInt.asUintN(64, 0b0n))
                    moves.push(new Move(mType.silent,    s, s >> 9n, BigInt.asUintN(64, 0b0n)));
            }
            return moves;
        }
    }

    playMove(m){
        this.flip_board();

        if(m.type == mType.silent){
            this._black     |=  m.toSquare;
            this._black     &= ~m.fromSquare;
            if((this._blackKing & m.fromSquare) != BigInt.asUintN(64, 0b0n)){
                this._fifty += 1;
                this._blackKing |=  m.toSquare;
                this._blackKing &= ~m.fromSquare;
            }
            else{
                this._fifty = 0;
            }
            this._capture = legal_mask;
            this.flip_board();
            this.switch_side();
        }
        else if(m.type == mType.capture){
            this._fifty = 0;
            this._black     |=  m.toSquare;
            this._black     &= ~m.fromSquare;
            this._white     &= ~m.captureSquare;
            this._whiteKing &= ~m.captureSquare;
            var wb = ~(this._white | this._black) & legal_mask;
            if((this._blackKing & m.fromSquare) != 0b0){
                this._blackKing |=  m.toSquare;
                this._blackKing &= ~m.fromSquare;
                var king_c1  = m.toSquare & this._blackKing & (this._white >> 7n) & (wb >> 14n) & n_first_2;
                var king_c2  = m.toSquare & this._blackKing & (this._white >> 9n) & (wb >> 18n) & n_first_2;
                var king_c3  = m.toSquare & this._blackKing & (this._white << 7n) & (wb << 14n) & r_first_2;
                var king_c4  = m.toSquare & this._blackKing & (this._white << 9n) & (wb << 18n) & r_first_2;
                if((king_c1 | king_c2 | king_c3 | king_c4) != BigInt.asUintN(64, 0b0n)){
                    this._capture = m.toSquare;
                    this.flip_board();
                }
                else{
                    this._capture = legal_mask;
                    this.flip_board();
                    this.switch_side();
                }
            }
            else{
                var cap_1 = m.toSquare & (this._black ^ this._blackKing) & (this._white >> 7n) & (wb >> 14n) & n_first_2;
                var cap_2 = m.toSquare & (this._black ^ this._blackKing) & (this._white >> 9n) & (wb >> 18n) & n_first_2;
                if((cap_1 | cap_2) != BigInt.asUintN(64, 0b0n)){
                    this._capture = m.toSquare;
                    this.flip_board();
                }
                else{
                    this._capture = legal_mask;
                    this.flip_board();
                    this.switch_side();
                }
            }
        }
        else if(m.type == mType.promotion){
            this._fifty = 0;
            this._blackKing |=  m.toSquare;
            this._black     |=  m.toSquare;
            this._black     &= ~m.fromSquare;
            this._white     &= ~m.captureSquare;
            this._whiteKing &= ~m.captureSquare;
            this._capture = legal_mask;
            this.flip_board();
            this.switch_side();
        }
        else{
            process.stdout.write('you discovered a new move type\n');
        }
    }

    over(){
        const move_n = this.genMoves().length;
        return ((move_n == 0) || (this._fifty > 25)) ? true : false;
    }

    result(){
        if(this._fifty > 25) return 'draw';
        if(this._side == Side.black) return 'white';
        return 'black';
    }

    getDiv(){
        var white = 'white'
        var black = 'black'
        var divs = '';
        for (var x = 0n; x<8n; x++){
            for(var y = 0n; y<8n; y++){
                const xx = 12.5 * parseInt(x);
                const yy = 12.5 * parseInt(y);
                const mask = BigInt.asUintN(64, pow(63n-(8n*x + y)));
                if((mask & this._whiteKing) != BigInt.asUintN(64, 0b0n)){
                    divs += "<div class=\"king\" onclick=\"hlMoves(this)\" id=\"" + white + "\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
                }
                else if((mask & this._blackKing) != BigInt.asUintN(64, 0b0n)){
                    divs += "<div class=\"king\" onclick=\"hlMoves(this)\" id=\"" + black + "\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
                }
                else if ((mask & this._white) != BigInt.asUintN(64, 0b0n)){
                    divs += "<div class=\"pawn\" onclick=\"hlMoves(this)\" id=\"" + white + "\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
                }
                else if((mask & this._black) != BigInt.asUintN(64, 0b0n)){
                    divs += "<div class=\"pawn\" onclick=\"hlMoves(this)\" id=\"" + black + "\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
                }
            }
        }
        return divs;
    }
}

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
        var move = new Move(m._type, m._fromSquare,  m._toSquare, m._captureSquare);
        move.destringify();
        this._pos.playMove(move);
        players[otherPlayer].socket.send(JSON.stringify(['move', m, time]));

        var moves = this._pos.genMoves(); //auto play forcing moves
        while(moves.length == 1){ 
            this._pos.playMove(moves[0]);
            moves[0].stringify();
            this._player1.socket.send(JSON.stringify(['move', moves[0], 'auto']));
            this._player2.socket.send(JSON.stringify(['move', moves[0], 'auto']));
            moves = this._pos.genMoves();
        }

        
        if(this._pos.over()){
            if(this._pos.result() == 'draw'){
                const deltas = glicko(this._player1, this._player2, 0.5);
                this._player1.socket.send(JSON.stringify(['end', 'draw', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', 'draw', deltas[1]]));
            }
            else if(this._pos.result() == this._player1_color){
                const deltas = glicko(this._player1, this._player2, 1);
                this._player1.socket.send(JSON.stringify(['end', 'won', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', 'lost', deltas[1]]));
            }
            else{
                const deltas = glicko(this._player1, this._player2, 0);
                this._player1.socket.send(JSON.stringify(['end', 'lost', deltas[0]]));
                this._player2.socket.send(JSON.stringify(['end', 'won', deltas[1]]));
            }
        }
    }
}

class Player {
    constructor(id, socket){
        this._id = id;
        this._socket = socket;
        this._anon = true;
        this._name = 'anon';
        this._elo = '?';
        this._dev = '?';
    }

    get id() { return this._id; }
    get socket(){ return this._socket; }
    get anon(){ return this._anon; }
    get name() { return this._name; }
    get elo() {return this._elo; }
    get dev() {return this._dev; }
    
    sign(name, elo, dev){
        this._anon = false;
        this._name = name;
        this._elo = elo;
        this._dev = dev;
    }

    updateElo(elo, dev){
        this._elo = elo;
        this._dev = dev;

        db[this._name].elo = elo;
        db[this._name].dev = dev;
        
        fs.writeFileSync('./database.json', JSON.stringify(db), err => {
            if(err) throw err;
            console.log('elos updated');
        });
    }
}

/////////////////////////////////////////////////
//sha, this should be in separate file 


var sha256 = function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};


/////////////////////////////////////////////////////////////////////////////////

//begin

var waiting = {};
var games = {};
var players = {}
var db = require('./database.json'); 


const fs = require('fs');
const http = require('http');
// const url = require('url');
// const express = require('express');
const path = require('path');
const mailer = require('nodemailer');
let transport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: 'dama23156',
        pass: 'eHx8LiLCbTnLqtT'
    }
});



const server = http.createServer((req, res) => {
    let contentFile;
    let contentType;

    contentFile = req.url;
    if(req.url == '/'){
        contentFile = './page.html';
    }

    const fileExt = path.extname(contentFile);
    switch(fileExt){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.html/':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        default:
            contentType = 'text/html';
    }

    const contentPath = path.join(__dirname, contentFile);

    fs.readFile(contentPath, (err, content) => {
        if(err){
            res.writeHead(404, 'file not found');
        }
        else{
            res.writeHead(200, {'Content-Type': contentType});
            res.write(content);
            res.end();
        }
    });
});





// const domain = '192.168.1.10';
const domain = require('os').networkInterfaces()['wlan0'][0]['address'];
const port = '8080';


server.listen(8080, domain, () => {
    console.log('fully online at: ' + domain + ':' + port);
});

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', ((ws) => {
    const userID = (Math.random().toString(36)+'00000000000000000').slice(2, 13);
    players[userID] = new Player(userID, ws);
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
        if(gameID.search(userID) == 0)  otherPlayer = gameID.slice(11);
        else                            otherPlayer = gameID.slice(0, 11);
        games[gameID].playMove(msg[3], otherPlayer, msg[4]);
    }
    else if(msg[0] == 'flag'){
        const gameID = msg[1];
        const userID = msg[2];
        if(gameID.search(userID) == 0)  otherPlayer = gameID.slice(11);
        else                            otherPlayer = gameID.slice(0, 11);
        const deltas = glicko(players[userID], players[otherPlayer], 0);
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
            games[gameID] = new Game(gameID, Pos.initial(), players[player1], players[player2], player1_color, player2_color);
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
                        'verification': sha256(verification),
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

//glicko

var glicko = function glicko(player1, player2, result){
    if((player1.anon == true) || (player2.anon == true)){
        return ['',''];
    }

    const q = 0.005756462732485115;
    const min_RD = 30.;
    
    const r = parseFloat(player1.elo);
    const rj = parseFloat(player2.elo);
    const RD = parseFloat(player1.dev);
    const RDj = parseFloat(player2.dev);
    const s = result;

    function g(RDj){
        return 1./Math.sqrt(1 + (3 * q**2 * RDj**2)/Math.PI);
    }

    function E(r, rj, RDj){
        return 1./(1+Math.pow(10, -g(RDj)*(r-rj)/400.));
    }

    function dd(r, rj, RDj){
        return 1./(q**2 * g(RDj)**2 * E(r, rj, RDj) * (1 - E(r, rj, RDj)));
    }

    function r_d(r, rj, RD, RDj, s){
        return (q/(1./RD**2 + 1./dd(r, rj, RDj))) * g(RDj) * (s - E(r, rj, RDj));
    }

    function RD_d(r, rj, RD, RDj){
        return Math.sqrt(1./(1./RD**2 + 1./dd(r, rj, RDj)));
    }

    const r_d_player1 = r_d(r, rj, RD, RDj, s);
    const r_d_player2 = r_d(rj, r, RDj, RD, 1-s);
    const RD_d_player1 = Math.max(min_RD, RD_d(r, rj, RD, RDj));
    const RD_d_player2 = Math.max(min_RD, RD_d(rj, r, RDj, RD));

    player1.updateElo(String(r+r_d_player1), String(RD_d_player1));
    player2.updateElo(String(rj+r_d_player2), String(RD_d_player2));


    return [r_d_player1, r_d_player2];
}
