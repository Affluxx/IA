/*
Fichier qui décris l'IA celon l'algo Alpha beta
*/


var Noeud = function() {
	this.successeurs = [];
	this.poids;
	this.played;
	this.gameboard;
}

var AlphaBeta = function() {
	var gameboard;
	var noeud;
	// Fonction qui intialise en fonction d'un gameboard
	this.Init = function(gameboard, profondeur) {
		this.gameboard = gameboard.Clone();
		this.noeud = new Noeud();
		this.noeud.gameboard = this.gameboard;
		this.CreerArbre(this.gameboard,profondeur,this.noeud)
	}
	// Fonction qui creer l'arbre lié a l IA
	this.CreerArbre = function(gameboard,profondeur, noeud) {
		if (profondeur == 0) {
			noeud.poids = this.CalculHeuristique(gameboard);
		} else {
			// On boucle sur tout les coups possibles
			for (var i = 0; i < 12; i++) {
				// Si le coup est jouable alors
				if(gameboard.IsPlayable(i)) {
					// On clone le GB pour ne pas perdre l'original
					var nextGameboard = gameboard.Clone();
					// on joue le coup prévu
					nextGameboard.play(i);
					//On créé le fils
					var succ = new Noeud();
					succ.played = i;
					succ.gameboard = nextGameboard;
					// et on le stocke dans la liste le résultat
					noeud.successeurs.push(succ);
					// On lance la récursion pour un parcours en profondeur
					this.CreerArbre(nextGameboard, profondeur - 1, succ);
				}
				
			}
		}
	}
	// Recupere un coup random parmi les possible
	this.RandomPlay = function() {
		var nbsucc = this.noeud.successeurs.length;
		var random = Math.floor((Math.random()*nbsucc));
		return this.noeud.successeurs[random].played;
	}
	// Recupere le meilleur coup celon l'arbre
	this.GetBestPlay = function() {
		var bestMoves = [];
		for (var succ of this.noeud.successeurs){
			if(succ.poids == this.noeud.poids){
				bestMoves.push(succ.played);
			}
		}
		var nbsucc = bestMoves.length;
		var random = Math.floor((Math.random()*nbsucc));
		return bestMoves[random];
	}
/* BIZARRE
	this.Compile = function(noeud, a, b){
		var val;
		if(noeud.successeurs.length == 0){
			console.log(noeud.poids);
			return noeud.poids;
		} else {
			console.log("---------");
			if(!noeud.gameboard.MinTurn){
				console.log("Max turn");

				var i = 0;
				while(a < b && i < noeud.successeurs.length){
					val = Math.max(a,this.Compile(noeud.successeurs[i],a,b));					
					noeud.poids = val;
					i++;
					if (a >= b){
						console.log("false");
					} else {
						console.log("true")
					}
				}
				a = val;
			} else {
				console.log("Min/IA turn");
				var i = 0;
				while(a < b && i < noeud.successeurs.length){
					val = Math.max(a,this.Compile(noeud.successeurs[i],a,b));					
					noeud.poids = val;
					i++;
					if (a >= b){
						console.log("a >= b");
					}
				}
				b = val;
			}
		}
		return val;
	}
	*/
	this.Compile = function(noeud, a, b){
		var val;
		if(noeud.successeurs.length == 0){
			//console.log(noeud.poids);
			return noeud.poids;
		} else {
			//console.log("---------");
			if(!noeud.gameboard.MinTurn){
				//console.log("Max turn");

				var minimax = a;
				for (var succ of noeud.successeurs){
					val = this.Compile(succ,minimax,b);					
					if(minimax < val){
						minimax = val;
					}
					//console.log("Max turn : a=" + a + " b=" + b + " val=" + val + " minimax=" + minimax);

					if (minimax >= b){
						//console.log("stop");
						noeud.poids = minimax;
						return minimax;
					}
				}
				noeud.poids = minimax;
				return minimax;
			} else {
				//console.log("Min/IA turn");
				
				var minimax = b;
				for (var succ of noeud.successeurs){
					val = this.Compile(succ,a,minimax);					
					if(minimax > val){
						minimax = val;
					}

					//console.log("Min turn : a=" + a + " b=" + b + " val=" + val + " minimax=" + minimax);
					if (minimax <= b){
						//console.log("stop");
						noeud.poids = minimax;
						return minimax;
					}
				}
				noeud.poids = minimax;
				return minimax;
			}
		}
	}
	/*
	Fonction qui calcule la valeur d'heuristique celon la profondeur choisis
	*/
	this.CalculHeuristique = function(gameboard) {
		var maxValue = gameboard.BottomStock;
		var minValue = gameboard.TopStock;
		for (var i = 0; i < 6; i++) {
			maxValue += gameboard.Square[i];	
		}
		for (var j = i; j < 12; j++) {
			minValue += gameboard.Square[j];
		}
		return minValue - maxValue;
	}



}