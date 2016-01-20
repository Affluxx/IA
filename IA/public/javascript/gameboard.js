/*
Ici le fichier javascript qui concerne le gameboard.
Je sais pas encore comment on va l'utiliser donc je le creer tout simplement et le push sur git.
*/
var Gameboard = function(){

	this.TopStock = 0;
	this.BottomStock = 0;
	this.Square = [4,4,4,4,4,4,4,4,4,4,4,4];
	this.IsWin = function(){
		return this.TopStock > 24 || this.BottomStock > 24;
	}
	this.TopPlayerTurn = false;
	this.heuristique = this.BottomStock - this.TopStock;

	this.Init = function(){
		this.TopStock = 0;
		this.BottomStock = 0;
		this.Square = [4,4,4,4,4,4,4,4,4,4,4,4];
	    this.TopPlayerTurn = false;
	}

	this.play = function(position){
    if(((position <= 5 && this.TopPlayerTurn) || (position > 5 && !this.TopPlayerTurn)) && !this.IsWin()){

        //recuperation des données de la case jouée
        var pawnNumber = this.Square[position];
        if (pawnNumber > 0) {
            this.Square[position] = 0;
            //distribution des jetons
            var oldPosition = position;
            while(pawnNumber > 0) {
                position = (position + 1) % 12;
                // On ne repose pas de pion a l'ancienne position donc on skip
                if (oldPosition != position) {
                    this.Square[position]++; 
                    pawnNumber--;
                }
            }
            //ramassage des pions si bon coté && 3 ou 2 pions
            while(((position > 5 && this.TopPlayerTurn) || (position <= 5 && !this.TopPlayerTurn)) && (this.Square[position] == 2 || this.Square[position] == 3)){
                if (this.TopPlayerTurn){
                    this.TopStock += this.Square[position];
                } else {
                    this.BottomStock += this.Square[position];
                }
                this.Square[position] = 0;

                //mise a jour des variables
                position = (position - 1);
            }
            this.TopPlayerTurn = !this.TopPlayerTurn;
        }
    }
}

	this.IsPlayable = function(position) {
		Square[position] > 0
	}
}