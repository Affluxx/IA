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

//actualise une case selon son data-pawn-number
function refresh(x){
    x.text(x.data('pawn-number'));
}

$(function(){
    $("[awale-init]")[0].onclick=InitGame;
});