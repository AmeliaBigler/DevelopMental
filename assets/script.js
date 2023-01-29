// all code inside call to jQuery - will not run until document renders.
$(function (){

    var homeDisplay = $('#home-display');
    var favoritesDisplay = $('#favorites-display');
    var resultsDisplay = $('#results-display')

    var searchBtn = $('#search');
    searchBtn.on('click', function(event){
        event.preventDefault();
        var topic = $('#topic-input')[0].value; 

        localStorage.setItem('topicInput', JSON.stringify(topic)); 

        homeDisplay.hide();
        resultsDisplay.show();
    })

    var backBtn = $('#back');
    backBtn.on('click', function(event){
        event.preventDefault();
        
        homeDisplay.show();
        resultsDisplay.hide();
    })

    var favorites = $('#favorites-home');
    favorites.on('click', function(){

        if (favorites.text() === 'Favorites'){
            homeDisplay.hide();
            favoritesDisplay.show();
            favorites.text('Home');
        } 
        else if (favorites.text() === 'Home'){
            favoritesDisplay.hide();
            homeDisplay.show();
            favorites.text('Favorites');
        }  
    })

})