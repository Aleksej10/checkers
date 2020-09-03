function glicko(player1, player2, result){
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

module.exports = {glicko};
