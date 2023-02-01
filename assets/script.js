// all code inside call to jQuery - will not run until document renders.
$(function (){

    // Initialize Foundation plugins (like Reveal modal)
    $(document).foundation();

    // Load the YT Iframe Player API code asynchronously
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    // API expects `onYouTubeIframeAPIReady()` to be in global scope
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'et8xNAc2ic8', // wtfjs
            playerVars: {
                modestBranding: 1
            }
        });
    };

    // Notifications modal
    var modalOptions = {};
    var $modal = new Foundation.Reveal($('#modal'), modalOptions);

    $('#modal-close').click(function() {
        $modal.close();
    });

    // Video modal
    var videoOptions = {};
    var $videoModal = new Foundation.Reveal($("#video-modal"), videoOptions);
    $('#video-modal-open').click(function() {
        $videoModal.open();
    });
    $('#video-modal-close').click(function() {
        $videoModal.close();
        // Pause the video if the user hasn't already
        player.pauseVideo();
    });

    var homeDisplay = $('#home-display');
    var favoritesDisplay = $('#favorites-display');
    var resultsDisplay = $('#results-display')

    var resultsGrandparent = $('#searchVids')
    var favoritesGrandparent = $('#favoriteVids')

    // empty array will be filled by user.
    var favoritesArray = []

    function init() {
        // this if statement allows favoritesArray to persist in local storage after page refresh.
        if (!localStorage.getItem('favoritesArray')){
            localStorage.setItem('favoritesArray', JSON.stringify(favoritesArray));
        }
    }
    
    var key          = 'AIzaSyCPobD0i2Z2m-JrcMzBggc7gQ1cYt-MfIE';

    var staticParams = {
        part: 'snippet',
        maxResults: 9,
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
        $('#topicSpan').text(" " + topic);

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

            homeDisplay.hide();
            resultsDisplay.show();

            renderSearch();
            // Exit
            return;
        }

        url = generateYTSearchURL(topic, staticParams);
        // TODO: Remove
        console.log(url);

        getYTSearchData(url)
            .then(function(data) {
                var dataList = data.items;
                searchData = processSearchData(dataList);
                // store search data by topic : [searchData]
                localStorage.setItem(topic, JSON.stringify(searchData));
                
                // Render search results
                homeDisplay.hide();
                resultsDisplay.show();
                renderSearch();
                // TODO: Remove
                // console.table(searchData);

            }).catch(function(error) {
                console.log(error, error.stack);
            })

        localStorage.setItem('topicInput', JSON.stringify(topic)); 

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
   
    // Click handler callback to play videos in results and favorites
    function openModalgetIdPlayVideo(event) {
        var target = $(event.target);
        if (target.hasClass('videoTitle') || target.prop("tagName") == 'IMG') {
            $videoModal.open();
            var videoId = target.parent().attr('id');
            // TODO: Remove
            console.log("videoId", videoId);
            // load video in player
            player.loadVideoById(videoId);
        }
    }

    function renderSearch() {
        // TEST

        for (var i=0; i<=8; i++) { //TODO: REPLACE i<=8 with i<resultsArray.length
            // create new HTML elements

            var div1 = $('<div class="cell"></div>');
            var div2 = $('<div class="card" id="' + searchData[i].videoId + '"></div>');
            var videoTitle = $('<h6 class="videoTitle"></h6>').html(searchData[i].title);
            var videoDescr = $('<p></p>').html(searchData[i].description);
            var thumbnail = $('<img>').attr('src', searchData[i].thumbnailUrl.medium);
            var favoriteBtn = $('<button class="button favoriteBtn">Favorite</button>');
    
            // query selector for parent element in HTML DOM
            var videosRow1 = $('#resultsRow1');
            var videosRow2 = $('#resultsRow2');
            var videosRow3 = $('#resultsRow3');
    
            var videoRowArray = [videosRow1, videosRow2, videosRow3];
    
            div1.append(div2);
            div2.append(favoriteBtn);
            div2.append(thumbnail);
            div2.append(videoTitle);
            div2.append(videoDescr);
            // Play video
            div2.on('click', openModalgetIdPlayVideo);
            

            if(i<=2) {
                videoRowArray[0].append(div1);
            } else if(i<=5) {
                videoRowArray[1].append(div1);
            } else if(i<=8) {
                videoRowArray[2].append(div1);
            }
        }

        var favBtns = ($('.favoriteBtn'));
        favBtns.click(function(){
            var vidTitle = $(this).siblings('.videoTitle')[0].innerHTML;
            var vidID = $(this).parent().attr('id');
            var vidThumbnail = $(this).siblings('img').attr('src');
            var vidDescr = $(this).siblings('p')[0].innerHTML;

            // console.log(vidTitle,vidID,vidThumbnail,vidDescr);

            var favoriteObject = {
                vidTitle: vidTitle,
                vidID: vidID,
                vidThumbnail: vidThumbnail,
                vidDescr: vidDescr,
            };

            var favoritesArray = JSON.parse(localStorage.getItem('favoritesArray'));
            // console.log(favoritesArray);
            // favoritesArray is created in init(), so !== null

            // Check for duplicates
            if (isDuplicateFavorite(favoriteObject, favoritesArray)) {
                // Provide modal message on duplicate click
                $('#modal-title').text('Already in Favorites');
                $('#modal-message').html(`${favoriteObject.vidTitle} is already in your favorites!`);
                $modal.open();

            } else {
                // Not duplicate, so add to favoritesArray
                favoritesArray.push(favoriteObject);
                // Update localStorage with new item
                localStorage.setItem('favoritesArray', JSON.stringify(favoritesArray));
            }



        })
        
    }

    function isDuplicateFavorite(favoriteObject, favoritesArray) {
        var currentId = favoriteObject.vidID;
        // Attempt to find matching vidID in the favoritesArray
        for (var i = 0; i < favoritesArray.length; i++) {
            if (currentId === favoritesArray[i].vidID) {
                return true;
            }
        }
        return false;
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


    // Define renderFavorites function
    function renderFavorites() {
        var favoritesArray = JSON.parse(localStorage.getItem('favoritesArray'));

        // If no favorites yet, display a message
        if (!favoritesArray.length) {
            $('#modal-title').text('No Favorites Yet');
            $('#modal-message').text(
                `You haven't chosen any favorite videos yet.
                 Click the blue button beneath a video's description to
                 add it here!`
            );
            $modal.open();
            // Exit function
            return;
        }

        for (var i=0; i<favoritesArray.length; i++) { //TODO: REPLACE i<=8 with i<=favoritesArray.length
            // create new HTML elements
            var div1 = $('<div class="cell"></div>');
            var div2 = $('<div class="card" id="' + favoritesArray[i].vidID + '"></div>');
            var removeBtn = $('<button class="button remove">Remove</button>'); //TODO: event listener for remove button.
            var vidTitle = $('<h6>').html(favoritesArray[i].vidTitle);
            var thumbnail = $('<img>').attr('src', favoritesArray[i].vidThumbnail);
            var vidDescr = $('<p></p>').text(favoritesArray[i].vidDescr);
            // Wait for note button functionality
            // var notesBtn = $('<button class="button notes">Notes</button>'); //TODO: event listener for notes button.
            
            
            // TODO: create these rows dynamically so that the user can have more than 9 favorite videos.
            var favoritesRow1 = $('#favoritesRow1');
            var favoritesRow2 = $('#favoritesRow2');
            var favoritesRow3 = $('#favoritesRow3');
    
            var favoritesRowArray = [favoritesRow1, favoritesRow2, favoritesRow3];
    
            div1.append(div2);
            // Wait for note button functionality
            div2.append(removeBtn, thumbnail,vidTitle,vidDescr/*,notesBtn */);

            // Play video
            div2.on('click', openModalgetIdPlayVideo);

            if(i<=2) {
                favoritesRowArray[0].append(div1);
            } else if(i<=5) {
                favoritesRowArray[1].append(div1);
            } else if(i<=8) {
                favoritesRowArray[2].append(div1);
            }
        }

        var removeButtons = $('.remove');
        console.log(removeButtons);
        removeButtons.click(function(){
            favoritesGrandparent.children().children().empty();

            var removeID = $(this).parent().attr('id');

            var removeArray = favoritesArray.filter(function(Object){
                // return !Object.contains(removeID);
                if (Object.vidID !== removeID){
                    return Object;
                };
            });
            console.log(removeArray);

            localStorage.setItem('favoritesArray', JSON.stringify(removeArray));

            renderFavorites();
        })

    }
    // document.getElementById("notes").addEventListener("click", function() {

    // })

    init();

})