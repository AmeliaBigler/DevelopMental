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

    var favoritesArray = []

    function init() {
        if (!localStorage.getItem('favoritesArray')){
            localStorage.setItem('favoritesArray', JSON.stringify(favoritesArray));
        }
    }
    
    var key          = 'AIzaSyCPobD0i2Z2m-JrcMzBggc7gQ1cYt-MfIE';

    var staticParams = {
        part: 'snippet',
        maxResults: 10,
        type: 'video',
        videoEmbeddable: true,
        key: key
    };

    var url = '';
    // "Global" object to store processed data
    var searchData = null;

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
        
        // Check localStorage and exit if found
        var cachedSearch = localStorage.getItem(topic);

        if (cachedSearch) {
            searchData = JSON.parse(cachedSearch);

            // TODO: Remove
            console.log("Getting cached searchResults");
            console.table(searchData);

            // Exit
            return;
        }
        // TODO: Decide about disabling button after 1 search

        url = generateYTSearchURL(topic, staticParams);
        // TODO: Remove
        console.log(url);

        getYTSearchData(url)
            .then(function(data) {
                var dataList = data.items;
                searchData = processSearchData(dataList);
                // store search data by topic : [searchData]
                localStorage.setItem(topic, JSON.stringify(searchData));
                // We could call renderSearch(searchData) here
                // TODO: Remove
                console.table(searchData);

            }).catch(function(error) {
                console.log(error, error.stack);
            });

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
            var para = $('<p></p>').text('test' + i);
            var favoriteBtn = $('<button class="button favoriteBtn">Favorite</button>');
    
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

        var favBtns = ($('.favoriteBtn'));
        console.log(favBtns);

        favBtns.click(function(){
                var vidTitle = $(this).siblings()[0].innerText; //TODO:replace with vid title property
                // TODO: create var for vid ID
                // TODO: create var for thumbnail?
                console.log(vidTitle); //TEST

                var favoriteObject = {
                    vidTitle: vidTitle,
                    // key-value pair of vid ID
                    // key-value pair of thumbnail?
                }

                localStorage.setItem('favoriteObject', JSON.stringify(favoriteObject));
            })
        
    }

    // TODO: fetch youtube API
    function generateYTSearchURL(searchPhrase, paramsObj) {
        var baseURL = 'https://www.googleapis.com/youtube/v3/search?';
        // combine param objects into a new one
        var params = Object.assign({}, paramsObj, {q: searchPhrase});
        // https://api.jquery.com/jQuery.param/
        var queryString = $.param(params);

        return baseURL + queryString;
    }
   
    
    
    // TODO: create resultArray = [] then call renderSearch();

    // Transforms YT data
    // into a list of objects
    // [
    //  {
    //    videoId: '',
    //    title: '', 
    //    description: '', 
    //    thumbnailUrl: 
    //      { 
    //        medium: 'url', 
    //        large: 'url' 
    //      }
    //  }
    // ]
    function processSearchData(dataList) {
        let resultList = [];

        for (item of dataList) {
            const s = item.snippet;
            const thumbs = s.thumbnails;        
            resultList.push({
                videoId: item.id.videoId,
                title: s.title,
                description: s.description,
                thumbnailUrl: {
                    medium: thumbs.medium.url,
                    large: thumbs.high.url
                }
            });
        }

        return resultList;
    }

    // Called in search button click handler
    // Returns a promise
    function getYTSearchData(url) {
        return fetch(url)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    // fetch() won't error on 4xx status codes
                    // so we have to throw our own
                    throw new Error(`Unexpected status code: ${
                        response.status
                    } ${response.statusText}`);
                }
            }).catch(function(reason) {
                console.error(reason.message);
            });
    } 

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

    init();

})