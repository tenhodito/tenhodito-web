$(document).foundation();

var count = 0;

var mainSubquestionFadeIn = function() {
    element = $("#subquestion");
    element.html(phrases[count%2]);
    element.fadeIn();
}

var changeMainSubquestion = function() {
    phrases = ['se seu deputado não cumprisse o que prometeu?',
               'se o seu deputado falasse uma coisa e fizesse outra?']
    element = $("#subquestion");
    element.fadeOut();
    setTimeout(mainSubquestionFadeIn, 300);
    count++;
};

setInterval(changeMainSubquestion, 5000);