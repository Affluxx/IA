/*
Fichier qui décris l'IA celon l'algo Alpha beta
*/
var AlphaBeta = function() {
	var heuristique = 0;

	/*
	Fonction qui calcule la valeur d'heuristique celon la profondeur choisis
	*/
	this.CalculHeuristique = function(profondeur, gameboard) {
		// Si la profondeur est inferieur ou egal a 0
		if (profondeur <= 0) {
			heuristique = 0;
		} else {
			// Sinon, on joue profondeur coups sur gameboard.
		}
	}
}