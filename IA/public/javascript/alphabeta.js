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
		this.CreerArbre(this.gameboard,profondeur,this.noeud)
	}
	// Fonction qui creer l'arbre lié a l IA
	this.CreerArbre = function(gameboard,profondeur, noeud) {
		console.log("Début creerarbre");
		console.log(gameboard);
		console.log(profondeur);
		console.log(noeud);
		if (profondeur == 0) {
			console.log("dans le if");
			noeud.poids = this.CalculHeuristique(gameboard);
		} else {
			console.log("dans le else");
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
					succ.poids = this.CalculHeuristique(nextGameboard);
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
	//Joue a une position donné
	this.Play = function(position) {

	}
	// Recupere le meilleur coup celon l'arbre
	this.getBestPlay = function() {

	}
	/*
	Fonction qui calcule la valeur d'heuristique celon la profondeur choisis
	*/
	this.CalculHeuristique = function(gameboard) {
		var maxValue = 0;
		var minValue = 0;
		for (var i = 0; i < 6; i++) {
			maxValue += gameboard.Square[i];	
		}
		for (var j = i; j < 12; j++) {
			minValue += gameboard.Square[j];
		}
		return minValue - maxValue;
	}



}