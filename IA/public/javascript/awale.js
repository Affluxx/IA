var gameboard = new Gameboard();
var alphabeta = new AlphaBeta();

/*
    Initialise la partie.
    Stock a 0 et cases à 4
*/


// Verifie la condition de victoire : Plus de 25 pions
function checkWin(){
    if(gameboard.IsWin()){
        if (gameboard.BottomStock > 24){
            alert("Random a gagné");
        }
        if (gameboard.TopStock > 24){
            alert("alphabeta a gagné");
        }
    }
}

//joue la case numero position
function play(position){
    gameboard.play(position);
    refreshAll();
    checkWin();
}
function InitGame(){
    gameboard.Init();    
    while (!gameboard.IsWin()){

        alphabeta.Init(gameboard,4);
        alphabeta.Compile(alphabeta.noeud,-100,100);
        if(gameboard.MinTurn){
            var p = alphabeta.GetBestPlay();
            play(p);

        } else {
            var p = alphabeta.RandomPlay();
            play(p);
        }
        refreshAll();
    }
}
// Fonction qui affiche les règles du jeu.
function rules() {
    //alert("Règles du jeu Awale : Ici a ajouter.");
    window.location.href = "rules.html"
}
//actualise une case selon son data-pawn-number
function refreshSquare(x){
    x.text(gameboard.Square[x.data('position')]);
}

//actualise toutes les cases ayant un data-pawn-number
function refreshAll(){
    $('.square').each(function(){
        refreshSquare($(this));
    });
    $('#stock-bottom').text(gameboard.BottomStock);
    $('#stock-top').text(gameboard.TopStock);
}

$(function(){
    $('.square').each(function(){
        $(this).attr('onclick', "play(" + $(this).data("position") + ")");
    });
    $("[awale-init]")[0].onclick=InitGame;
    $("[awale-rules]")[0].onclick=rules;
});