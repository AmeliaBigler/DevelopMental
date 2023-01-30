// all code inside call to jQuery - will not run until document renders.
$(function (){

    // Initialize Foundation plugins (like Reveal modal)
    $(document).foundation();

    // We can add options to our modal later
    var modalOptions = {};

    var $modal = new Foundation.Reveal($('#modal'), modalOptions);

    $('#modal-close').click(function() {
        $modal.close();
    });

    var homeDisplay = $('#home-display');
    var favoritesDisplay = $('#favorites-display');
    var resultsDisplay = $('#results-display')

    var resultsGrandparent = $('#searchVids')
    var favoritesGrandparent = $('#favoriteVids')

    var searchBtn = $('#search');
    searchBtn.on('click', function(event){

        event.preventDefault();

        var topic = $('#topic-input').val().trim();

        // <option value=''> Note: unable to select disabled form input
        if (topic === '') {
            var title = $('#modal-title');
            title.text('Please try again')
            var msg = $('#modal-message');
            msg.text('Please select a topic to search.');
            $modal.open();
            // Exit 
            return;
        }

        localStorage.setItem('topicInput', JSON.stringify(topic)); 

        homeDisplay.hide();
        resultsDisplay.show();

        renderSearch(); //TODO: relocate this function call to API function once it's created.
    })

    var backBtn = $('#back');
    backBtn.on('click', function(event){
        event.preventDefault();
        
        homeDisplay.show();
        resultsDisplay.hide();

        resultsGrandparent.children().children().empty();
    })

    var favorites = $('#favorites-home');
    favorites.on('click', function(){

        if (favorites.text() === 'Favorites'){
            resultsGrandparent.children().children().empty();
            renderFavorites();
            homeDisplay.hide();
            resultsDisplay.hide();
            favoritesDisplay.show();
            favorites.text('Home');
        } 
        else if (favorites.text() === 'Home'){
            favoritesGrandparent.children().children().empty();
            favoritesDisplay.hide();
            homeDisplay.show();
            favorites.text('Favorites');
        }  
    })

    function renderSearch() {
        // TEST

        for (var i=0; i<=8; i++) { //TODO: REPLACE i<=8 with i<=resultsArray.length
            // create new HTML elements
            var div1 = $('<div class="cell"></div>');
            var div2 = $('<div class="card"></div>');
            var para = $('<p></p>').text('test');
            var favoriteBtn = $('<button class="button favorite">Favorite</button>');
    
            // query selector for parent element in HTML DOM
            var videosRow1 = $('#resultsRow1');
            var videosRow2 = $('#resultsRow2');
            var videosRow3 = $('#resultsRow3');
    
            var videoRowArray = [videosRow1, videosRow2, videosRow3];
    
            div1.append(div2);
            div2.append(para);
            div2.append(favoriteBtn);

            if(i<=2) {
                videoRowArray[0].append(div1);
            } else if(i<=5) {
                videoRowArray[1].append(div1);
            } else if(i<=8) {
                videoRowArray[2].append(div1);
            }
        }
        
    }

    // TODO: fetch youtube API
        // TODO: create resultArray = [] then call renderSearch(); 

    // TODO: event listener for favorite button
        // TODO: local storage array for favorites

    // Define renderFavorites function
    function renderFavorites() {
        // TEST

        for (var i=0; i<=8; i++) { //TODO: REPLACE i<=8 with i<=favoritesArray.length
            // create new HTML elements
            var div1 = $('<div class="cell"></div>');
            var div2 = $('<div class="card"></div>');
            var para = $('<p></p>').text('test');
            var notesBtn = $('<button class="button notes">Notes</button>');
    
            // query selector for parent element in HTML DOM
            var favoritesRow1 = $('#favoritesRow1');
            var favoritesRow2 = $('#favoritesRow2');
            var favoritesRow3 = $('#favoritesRow3');
    
            var favoritesRowArray = [favoritesRow1, favoritesRow2, favoritesRow3];
    
            div1.append(div2);
            div2.append(para);
            div2.append(notesBtn);

            if(i<=2) {
                favoritesRowArray[0].append(div1);
            } else if(i<=5) {
                favoritesRowArray[1].append(div1);
            } else if(i<=8) {
                favoritesRowArray[2].append(div1);
            }
        }
        
    }

})