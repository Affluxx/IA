/*
Fichier qui décris l'IA celon l'algo Alpha beta
*/
var AlphaBeta = function() {
	//var heuristique = 0;

	/*
	Fonction qui calcule la valeur d'heuristique celon la profondeur choisis
	StockMax - StockMin
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
		return maxValue - minValue;
	}
}