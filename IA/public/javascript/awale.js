//alert($("h1").text());
//$("#awale-board").createElement('div'));
/*
    Initialise la partie.
    Stock a 0 et cases à 4
*/

function InitGame(){
    $('.square').each(function(){
        $(this).attr('data-pawn-number',4);
        refresh($(this));
    });
    $('.stock').each(function(){
        $(this).attr('data-pawn-number',0);
        refresh($(this));
    });
    TopPlayerTurn = false;
    console.log("    bottom-player to move")
}
/*
function Coucou(x) {
	alert ("Hello! : " + x);
}
*/
var TopPlayerTurn = false;
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

//joue la case numero X
function play(position){
    //recuperation des données de la case jouée
    var clickedDiv = $('[data-position=' + position + ']');
    var pawnNumber = clickedDiv.data('pawn-number');
    clickedDiv.data('pawn-number', 0);
    //distribution des jetons
    while(pawnNumber > 0){
        position = (position + 1) % 12;
        var div = $('[data-position=' + position + ']');
        var divPawnNumber = div.data('pawn-number');
        div.data('pawn-number', divPawnNumber + 1);
        pawnNumber--;
    }


    var divPawnNumber = div.data('pawn-number');

    if (TopPlayerTurn){
        console.log("top-player move : ")
    } else {
        console.log("bottom-player move : ")
    }
    console.log("  end-position : " + position);
    console.log("  divPawnNumber : " + divPawnNumber);



    //ramassage des pions si bon coté && 3 ou 2 pions
    while(((position > 5 && TopPlayerTurn) || (position < 5 && !TopPlayerTurn)) && (divPawnNumber == 2 || divPawnNumber == 3)){
        if (TopPlayerTurn){
            var stock = $('#stock-top');
        } else {
            var stock = $('#stock-bottom');
        }
        console.log(stock);
        var stockPawnNumber = stock.data('pawn-number');
        console.log( stockPawnNumber + "+" + divPawnNumber);
        stock.data('pawn-number', stockPawnNumber + divPawnNumber);
        div.data('pawn-number', 0);

        //mise a jour des variables
        position = (position - 1);
        var div = $('[data-position=' + position + ']');
        var divPawnNumber = div.data('pawn-number');
        
    }
    refreshAll();
    TopPlayerTurn = !TopPlayerTurn;

    if (TopPlayerTurn){
        console.log("    top-player to move")
    } else {
        console.log("    bottom-player to move")
    }
    return TopPlayerTurn;
}

$(function(){
    $("[awale-init]")[0].onclick=InitGame;
});