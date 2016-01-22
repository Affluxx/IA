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
	this.MinTurn = false;
	this.a = 0;

	this.Init = function(){
		this.TopStock = 0;
		this.BottomStock = 0;
		this.Square = [4,4,4,4,4,4,4,4,4,4,4,4];
	    this.MinTurn = false;
	}
	/*
	Fonction qui clone un gameboard.
	*/

	this.Clone = function() {
		var x = jQuery.extend(true, {}, this);
		return x;
	}

	this.play = function(position){
		if (this.IsPlayStarve(position)) {
			//console.log("Is Playable");
			alert("Vous n'avez pas le droit d'affamer l'adversaire");
		} else {
		    if(((position <= 5 && this.MinTurn) || (position > 5 && !this.MinTurn))){

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
		            while(((position > 5 && this.MinTurn) || (position <= 5 && !this.MinTurn)) && (this.Square[position] == 2 || this.Square[position] == 3)){
		                if (this.MinTurn){
		                    this.TopStock += this.Square[position];
		                } else {
		                    this.BottomStock += this.Square[position];
		                }
		                this.Square[position] = 0;

		                //mise a jour des variables
		                position = (position - 1);
		            }
		           // console.log(a);
		            this.MinTurn = !this.MinTurn;
		            //this.a++;
		            //console.log(a);
		        }	        
		    }
		    /*
		    if(this.Starve()) {
		    	for(var i = 0; i < 6; i++) {
		    		this.TopStock += this.Square[i];
		    		this.Square[i] = 0;
		    	}
		    	for (var j = i; j < 12; j++) {
		    		this.BottomStock += this.Square[j];
		    		this.Square[j] = 0;
		    	}
		    }
		    */
		}
	}
	/*
	Fonction qui verifie qu'on as le droit de jouer a position sans affamer l'adversaire
	*/
	this.IsPlayStarve = function(position) {
		//console.log
		if(((position <= 5 && this.MinTurn) || (position > 5 && !this.MinTurn))){
			var nextGameboard = this.Clone();
	        //recuperation des données de la case jouée
	        var pawnNumber = nextGameboard.Square[position];
	        if (pawnNumber > 0) {
	            nextGameboard.Square[position] = 0;
	            //distribution des jetons
	            var oldPosition = position;
	            while(pawnNumber > 0) {
	                position = (position + 1) % 12;
	                // On ne repose pas de pion a l'ancienne position donc on skip
	                if (oldPosition != position) {
	                    nextGameboard.Square[position]++; 
	                    pawnNumber--;
	                }
	            }
	            //ramassage des pions si bon coté && 3 ou 2 pions
	            while(((position > 5 && nextGameboard.MinTurn) || (position <= 5 && !nextGameboard.MinTurn)) && (nextGameboard.Square[position] == 2 || nextGameboard.Square[position] == 3)){
	                if (nextGameboard.MinTurn){
	                    nextGameboard.TopStock += nextGameboard.Square[position];
	                } else {
	                    nextGameboard.BottomStock += nextGameboard.Square[position];
	                }
	                nextGameboard.Square[position] = 0;

	                //mise a jour des variables
	                position = (position - 1);
	            }
	            nextGameboard.MinTurn = !nextGameboard.MinTurn;
	            //console.log(a);
	        }
	        //console.log(nextGameboard);
	        if(nextGameboard.MinTurn) {
	        	for (var i = 0; i < 6; i++) {
	        		if (nextGameboard.Square[i] != 0) {
	        			return false;
	        		}
	        	}
	        } else {
	        	for (var i = 6; i < 12; i++) {
	        		if (nextGameboard.Square[i] != 0) {
	        			return false;
	        		}
	        	}
	        }
	        return true;
    	}
	}
	this.IsPlayable = function(position) {
		return ((position <= 5 && this.MinTurn) || (position > 5 && !this.MinTurn)) && (!this.IsPlayStarve(position) && this.Square[position] != 0); 
	}

	this.Starve = function() {
		var nextGameboard = this.Clone();
		for (var i = 0; i < 12; i++) {
			if(!nextGameboard.IsPlayable(i)) {
				return false;
			}
		}
		return true;
	}
}