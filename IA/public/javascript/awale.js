/*
    Initialise la partie.
    Stock a 0 et cases à 4
*/
/*
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
*/
// Fonction qui affiche les règles du jeu.
function rules() {
    //alert("Règles du jeu Awale : Ici a ajouter.");
    window.location.href = "rules.html"
}

$(function(){
    // Initialise le gameboard
    var gameboard = new Gameboard();
    //Initialise le jeu
    $("[awale-init]")[0].onclick=gameboard.InitGame();
    // Affiche les règles.
    $("[awale-rules]")[0].onclick=rules;
    // Ajouter la partie qui recupere la position a laquelle
    // Le gameboard dois jouer (le data-position)
    //$("")
});
/*
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
*/
// Verifie la condition de victoire : Plus de 25 pions
/*
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
*/
/*
// Variable utile pour le jeu.
var TopPlayerTurn = false;
var win = false;


//joue la case numero position
/*
La fonction Play joue a la case choisis par l'argument position.
Cette fonction est placé dans le gameboard puisque c'est sur lui que le jeu se fait.
*/
/*
    function play(position){
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
    */



//Fonction qui affiche la dernière case atteinte par la case choisit.
/*
function watch(position) {
}
*/




/*
a utiliser plus tard
something.onmouseover = function() {
    this.style.backgroundColor = 'red';
};
something.onmouseout = function() {
    this.style.backgroundColor = '';
};
*/