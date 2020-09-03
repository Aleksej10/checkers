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

    get fromSquare(){ return this._fromSquare; }
    get toSquare(){ return this._toSquare; }
    get captureSquare(){ return this._captureSquare; }
    get type(){ return this._type; }
    
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

    get side(){ return this._side; }

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
