//alert($("h1").text());
//$("#awale-board").createElement('div'));
function InitGame(){
    $('.square').each(function(){
        $(this).attr('data-pawn-number',4)
        $(this).text($(this).data('pawn-number'));
    });
    $('.stock').each(function(){
        $(this).attr('data-pawn-number',0)
        $(this).text($(this).data('pawn-number'));
    });
}
function Coucou() {
	alert ("Hello!");
}

$(function(){
    $("[awale-init]")[0].onclick=InitGame;
    $("[data-square-number=0]").click(Coucou);
});