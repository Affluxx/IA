/*
Ici le fichier javascript qui concerne le gameboard.
Je sais pas encore comment on va l'utiliser donc je le creer tout simplement et le push sur git.
*/
/*
On passe par une classe gameboard. Cette classe qui va contenir les informations liés au plateau de jeu.
*/
var Gameboard = function(){
// Variable utile pour le jeu.
var TopPlayerTurn = false;
var win = false;


//joue la case numero position
/*
La fonction Play joue a la case choisis par l'argument position.
Cette fonction est placé dans le gameboard puisque c'est sur lui que le jeu se fait.
*/
	this.play = function(position){
	    if(((position <= 5 && TopPlayerTurn) || (position > 5 && !TopPlayerTurn)) && !win){

	        //recuperation des données de la case jouée
	        var clickedDiv = $('[data-position=' + position + ']');
	        var pawnNumber = clickedDiv.data('pawn-number');
	        if (pawnNumber > 0) {
	            clickedDiv.data('pawn-number', 0);
	            //distribution des jetons
	            var oldPosition = position
	            while(pawnNumber > 0) {
	                position = (position + 1) % 12;
	                // On ne repose pas de pion a l'ancienne position donc on skip
	                if (oldPosition != position) {
	                    var div = $('[data-position=' + position + ']');
	                    var divPawnNumber = div.data('pawn-number');
	                    div.data('pawn-number', divPawnNumber + 1);
	                    pawnNumber--;
	                }
	            }
	            //mise a jour du pion
	            var divPawnNumber = div.data('pawn-number');
	            //ramassage des pions si bon coté && 3 ou 2 pions
	            while(((position > 5 && TopPlayerTurn) || (position <= 5 && !TopPlayerTurn)) && (divPawnNumber == 2 || divPawnNumber == 3)){
	                if (TopPlayerTurn){
	                    var stock = $('#stock-top');
	                } else {
	                    var stock = $('#stock-bottom');
	                }

	                var stockPawnNumber = stock.data('pawn-number');

	                stock.data('pawn-number', stockPawnNumber + divPawnNumber);
	                div.data('pawn-number', 0);

	                //mise a jour des variables
	                position = (position - 1);
	                var div = $('[data-position=' + position + ']');
	                var divPawnNumber = div.data('pawn-number');
	                
	            }
	            refreshAll();
	            isWin();
	            TopPlayerTurn = !TopPlayerTurn;
	        }
	    }
	}

	//actualise une case selon son data-pawn-number
	this.refresh = function(x){
	    x.text(x.data('pawn-number'));
	}

	//actualise toutes les cases ayant un data-pawn-number
	this.refreshAll = function(){
	    $('[data-pawn-number').each(function(){
	        refresh($(this));
	    });
	}
	// Fonction qui verifie qui gagne la partie.
	this.isWin = function(){
	    $('.stock').each(function(){
	        if ($(this).data('pawn-number') > 24){
	            win = true;
	            if (TopPlayerTurn){
	                alert("Joueur 1 a gagné");
	            } else {
	                alert("Joueur 2 a gagné");
	            }
	        }
	    });
	}
	this.InitGame = function(){
	    $('.square').each(function(){
	        $(this).attr('data-pawn-number',4);
	        $(this).attr('onclick', "play(" + $(this).data("position") + ")");
	        refresh($(this));
	    });
	    $('.stock').each(function(){
	        $(this).attr('data-pawn-number',0);
	        refresh($(this));
	    });
	    TopPlayerTurn = false;
	}
}