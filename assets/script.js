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
            // TODO: call renderFavorites function
            homeDisplay.hide();
            favoritesDisplay.show();
            favorites.text('Home');
        } 
        else if (favorites.text() === 'Home'){
            // TODO: empty favorites
            favoritesDisplay.hide();
            homeDisplay.show();
            favorites.text('Favorites');
        }  
    })

    function renderVideos() {
        // TEST
        // create new HTML elements
        var div1 = $('<div class="cell"></div>');
        var div2 = $('<div class="card"></div>');
        var para = $('<p></p>').text('test');
        var favoriteBtn = $('<button class="button favorite">Favorite</button>');

        // query selector for parent element in HTML DOM
        var videosRow1 = $('#resultsRow1');

        videosRow1.append(div1);
        div1.append(div2);
        div2.append(para);
        div2.append(favoriteBtn);

    }

    // TEST
    renderVideos();
    renderVideos();
    renderVideos();

    // TODO: fetch youtube API
        // TODO: create element:
            // TODO: for loop - every 3rd video needs to start appending to next resultRow

    // TODO: event listener for favorite button
        // TODO: local storage array for favorites

    // TODO: define renderFavorites function

})