const fs = require('fs');

class Player {
    constructor(id, socket, db){
        this._id = id;
        this._socket = socket;
        this._anon = true;
        this._name = 'anon';
        this._elo = '?';
        this._dev = '?';
        this._db = db;
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

        this._db[this._name].elo = elo;
        this._db[this._name].dev = dev;
        
        fs.writeFileSync('./database.json', JSON.stringify(this._db), err => {
            if(err) throw err;
            console.log('elos updated');
        });
    }
}

module.exports = {Player};
