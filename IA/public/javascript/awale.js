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
}
/*
function Coucou(x) {
	alert ("Hello! : " + x);
}
*/

//actualise une case selon son data-pawn-number
function refresh(x){
    x.text(x.data('pawn-number'));
}

function refreshAll(){
    $('[data-pawn-number').each(function(){
        refresh($(this));
    });
}

//joue la case numero X
function play(position){
    var clickedDiv = $('[data-position=' + position + ']');
    var pawnNumber = clickedDiv.data('pawn-number');
    clickedDiv.data('pawn-number', 0);
    while(pawnNumber > 0){
        position = (position + 1) % 12;
        var div = $('[data-position=' + position + ']');
        var divPawnNumber = div.data('pawn-number');
        div.data('pawn-number', divPawnNumber + 1);
        pawnNumber--;
    }
    refreshAll();
    return pawnNumber;
}

$(function(){
    $("[awale-init]")[0].onclick=InitGame;
});