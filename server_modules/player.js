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

    updateElo(elo, dev, user){
        this._elo = elo;
        this._dev = dev;


        user.elo = elo; user.markModified('elo');
        user.dev = dev; user.markModified('dev');
        user.save((err)=>{if(err)console.log(err);});
    }
}

module.exports = {Player};
