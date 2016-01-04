/*
    Initialise la partie.
    Stock a 0 et cases à 4
*/

function InitGame(){
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
/*
function Coucou(x) {
    alert ("Hello! : " + x);
}
*/
var TopPlayerTurn = false;
var win = false;
//actualise une case selon son data-pawn-number
function refresh(x){
    x.text(x.data('pawn-number'));
}

//actualise toutes les cases ayant un data-pawn-number
function refreshAll(){
    $('[data-pawn-number').each(function(){
        refresh($(this));
    });
}

// Verifie la condition de victoire : Plus de 25 pions
function isWin(){
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
//joue la case numero position
function play(position){
    if(((position <= 5 && TopPlayerTurn) || (position > 5 && !TopPlayerTurn)) && !win){

        //recuperation des données de la case jouée
        var clickedDiv = $('[data-position=' + position + ']');
        var pawnNumber = clickedDiv.data('pawn-number');
        clickedDiv.data('pawn-number', 0);
        //distribution des jetons
        var oldPosition = position
        while(pawnNumber > 0) {
            position = (position + 1) % 12;
            // Dans le cas où on reviens a la position de départ
            if (oldPosition == position) {
                // Ne fait rien
            } else {
            var div = $('[data-position=' + position + ']');
            var divPawnNumber = div.data('pawn-number');
            div.data('pawn-number', divPawnNumber + 1);
            pawnNumber--;
            }
        }
        
        //var newPosition = position;
        

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
//Fonction qui affiche la dernière case atteinte par la case choisit.
function watch(position) {
    if(((position <= 5 && TopPlayerTurn) || (position > 5 && !TopPlayerTurn)) && !win) {
        //recuperation des données de la case regarder
        var watchedDiv = $('[data-position=' + position + ']');
        var pawnNumber = clickedDiv.data('pawn-number');
        watchedDiv.data('pawn-number', 0);

    }

}

$(function(){
    $("[awale-init]")[0].onclick=InitGame;
});



/*
a utiliser plus tard
something.onmouseover = function() {
    this.style.backgroundColor = 'red';
};
something.onmouseout = function() {
    this.style.backgroundColor = '';
};
*/