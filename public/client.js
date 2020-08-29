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

    //serialize(){
    //    var ser = []; // black:-1 blackKing:-2 white:1 whiteKing:2
    //    for (var i = 63n; i>=0n; i--){
    //        const s = pow(i);
    //        if     ((this._black & s) > 0n){
    //            ser.push( ((this._blackKing & s) > 0n) ? -2 : -1);
    //        }
    //        else if((this._white & s) > 0n){
    //            ser.push( ((this._whiteKing & s) > 0n) ?  2 :  1);
    //        }
    //        else ser.push(0);
    //    }
    //    var arr = [];
    //    for (var i = 0; i < 8; i++) {
    //        arr.push(ser.slice(i*8, i*8+7));
    //    }
    //    return arr;
    //}
    ////serialize a string which will be used for sending to server and back
    //serialize_GET(){
    //    var ser = ""; //black: p, blackKing: k, 
    //                  //white: P, whiteKing: K
    //    for (var i = 63n; i>=0n; i--){
    //        const s = pow(i);
    //        if     ((this._black & s) > 0n){
    //            ser += ((this._blackKing & s) > 0n) ? "k" : "p";
    //        }
    //        else if((this._white & s) > 0n){
    //            ser += ((this._whiteKing & s) > 0n) ? "K" : "P";
    //        }
    //        else ser += "-";
    //    }
    //    return ser;
    //}

    getDiv(){
        var divs = '';
        for (var x = 0n; x<8n; x++){
            for(var y = 0n; y<8n; y++){
                const xx = 12.5 * parseInt(x);
                const yy = 12.5 * parseInt(y);
                const mask = BigInt.asUintN(64, pow(63n-(8n*x + y)));
                if((mask & this._whiteKing) != BigInt.asUintN(64, 0b0n)){
                    divs += "<div class=\"pawn king white\" onclick=\"hlMoves(this)\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
                }
                else if((mask & this._blackKing) != BigInt.asUintN(64, 0b0n)){
                    divs += "<div class=\"pawn king black\" onclick=\"hlMoves(this)\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
                }
                else if ((mask & this._white) != BigInt.asUintN(64, 0b0n)){
                    divs += "<div class=\"pawn white\" onclick=\"hlMoves(this)\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
                }
                else if((mask & this._black) != BigInt.asUintN(64, 0b0n)){
                    divs += "<div class=\"pawn black\" onclick=\"hlMoves(this)\" style=\"top:" + xx.toString() + "%; left:" + yy.toString() + "%\"></div>";
                }
            }
        }
        return divs;
    }
}




function flip_moves(moves){
    if (game_side == Side.black) return moves;
    var new_moves = [];
    for(const m of moves){
        new_moves.push(new Move(m.type, reverse(m.fromSquare), reverse(m.toSquare), reverse(m.captureSquare)));
    }
    return new_moves;
}

function log_move(move){
    console.log(xy_from_bits(move._fromSquare));
    console.log(xy_from_bits(move._toSquare));
    console.log(xy_from_bits(move._captureSquare));
}

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
var game_side = undefined; //Side.black;
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

ws.onopen = function (event) {
    //const id = (Math.random().toString(36)+'00000000000000000').slice(2, 18);
    //ws.send(JSON.stringify(['initial', id]));
};

ws.onerror = function (err) {
    //console.log('err: ', err);
}

ws.onmessage = function (event) {
    const msg = JSON.parse(event.data);
    parse_message(msg);
    //TODO implement game functionality
};

ws.onclose = function() {
    // console.log("Connection is closed..."); 
    //TODO do something else
}

function logochange(elem){
    if(elem.className == 'logo-pawn black') elem.className = 'logo-pawn white';
    else elem.className = 'logo-pawn black';
}

function flip_flop(){
    const flop = document.getElementById("fflop");
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
    window.history.pushState({'html':elem.html,'pageTitle':elem.pageTitle},'', page);
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
    // window.location = './sign.html';
    if(logged == true) return;
    load_body(elem, 'sign.html');
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
        case 13 : document.getElementById("submit-button").click();
            break;
    }
}

// TODO this seems to be obsolete 
// function load_page(elem, page){
//     document.getElementsByTagName("html")[0].remove();
//     fetch(page)
//         .then(response => response.text())
//         .then(text => {
//             document.write(text); 
//             document.close();
//         });
//     window.history.pushState({"html":elem.html,"pageTitle":elem.pageTitle},"", page);
// }

function after_new_game(){
    drawBoard(getBoardDiv());
    print_names(your_name, your_elo, opponent_name, opponent_elo);
    document.getElementById("fflop").style.visibility = "visible";
    document.getElementById("rematch").style.visibility = "hidden";
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
    load_body(elem, 'loader.html');
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
    var player_clock;
    var player_time;
    if(game_pos.side == game_side) { //your tick
        if(your_time <= 0){
            ws.send(JSON.stringify(['flag', current_game, id]));
            clearInterval(ticker);
        }
        player_time = your_time;
        your_time -= 1;
        player_clock = document.getElementById('player2-clock');
    }
    else{ //opponents ticks
        if(opponent_time < 0) return;
        player_time = opponent_time;
        opponent_time -= 1;
        player_clock = document.getElementById('player1-clock');
    }
    const minutes = '00' + parseInt(player_time/6000);
    const seconds = '00' + parseInt(player_time/100) % 60;
    const milis   = '00' + player_time % 100;
    player_clock.innerHTML = 
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
        load_body(this, 'board.html');
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

/////////////////////////////////////////////////
//sha, this should be in separate file 
//https://geraintluff.github.io/sha256/ thanks 


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
