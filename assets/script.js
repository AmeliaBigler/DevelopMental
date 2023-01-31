// all code inside call to jQuery - will not run until document renders.
$(function (){

    // TEST array so development can continue without making repeated API calls. 
    // TODO: remove this array when ready.
    var dataList = [
        {
            "videoId": "FI51zRzgIe4",
            "title": "8 Minute Stretching Routine For People Who AREN’T Flexible!",
            "description": "Follow-along total-body stretching routine to decrease tightness and improve flexibility! Dr Jared Beckstrand leads you through 8 ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/FI51zRzgIe4/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/FI51zRzgIe4/hqdefault.jpg"
            }
        },
        {
            "videoId": "2eA2Koq6pTI",
            "title": "Back Pain Relief Stretches |  10 min. Yoga for Relaxation &amp; Recovery",
            "description": "Enjoy this beautiful Yoga inspired Stretching Routine to release tension in your upper, middle and lower back. These stretches are ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/2eA2Koq6pTI/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/2eA2Koq6pTI/hqdefault.jpg"
            }
        },
        {
            "videoId": "aZ1PzhThqcU",
            "title": "15-Min Full-Body Stretching Routine",
            "description": "PDF pose chart here: https://www.yogabody.com/full-body-flexibility-youtube/ If you have stiff hamstrings, locked up hips, and/or a ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/aZ1PzhThqcU/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/aZ1PzhThqcU/hqdefault.jpg"
            }
        },
        {
            "videoId": "YfCK3uOz1r4",
            "title": "10 MIN STRETCHING EXERCISES FOR STIFF MUSCLES AT HOME ( Relaxation &amp; Flexibility ) | No Equipment",
            "description": "These stretching exercises for stiff muscles is a perfect routine for home! This stretching routine is amazing for relaxation and ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/YfCK3uOz1r4/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/YfCK3uOz1r4/hqdefault.jpg"
            }
        },
        {
            "videoId": "nm-fxV-bwWg",
            "title": "6 Minute Stretching Routine For Tight Hips and Low Back Pain",
            "description": "Follow-along stretching routine for tight hips and low back pain that you can do at home! Led by a physical therapist to improve ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/nm-fxV-bwWg/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/nm-fxV-bwWg/hqdefault.jpg"
            }
        },
        {
            "videoId": "g_tea8ZNk5A",
            "title": "15 Min. Full Body Stretch | Daily Routine for Flexibility, Mobility &amp; Relaxation | DAY 7",
            "description": "Welcome to your 15 Minutes Full Body Stretching Routine! This short and well balanced sequence provides you with everything ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/g_tea8ZNk5A/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/g_tea8ZNk5A/hqdefault.jpg"
            }
        },
        {
            "videoId": "tkH2-_jMCSk",
            "title": "Improve Flexibility with Research-Supported Stretching Protocols | Huberman Lab Podcast #76",
            "description": "In this episode, I explain the science behind limb range of motion and flexibility and how to increase them by using ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/tkH2-_jMCSk/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/tkH2-_jMCSk/hqdefault.jpg"
            }
        },
        {
            "videoId": "JJAHGpe0AVU",
            "title": "Real Time Full Body Stretching Routine - Ask Doctor Jo",
            "description": "This full body stretching routine is great for general wellness, flexibility, and pain relief. This real-time video will give you a relaxing ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/JJAHGpe0AVU/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/JJAHGpe0AVU/hqdefault.jpg"
            }
        },
        {
            "videoId": "sTANio_2E0Q",
            "title": "20 min Full Body STRETCH/YOGA for STRESS &amp; ANXIETY Relief",
            "description": "De-stress with this 20 minute calming yoga routine that includes light and easy full body stretches for stress relief and anxiety.",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/sTANio_2E0Q/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/sTANio_2E0Q/hqdefault.jpg"
            }
        },
        {
            "videoId": "s-7lyvblFNI",
            "title": "Stretches for Neck, Shoulder &amp; Upper Back Pain Relief | 10 min. Yoga to release Tension and Relax",
            "description": "Welcome to this beautiful Yoga inspired routine for neck, shoulder and upper back pain relief. These stretches are designed to ...",
            "thumbnailUrl": {
                "medium": "https://i.ytimg.com/vi/s-7lyvblFNI/mqdefault.jpg",
                "large": "https://i.ytimg.com/vi/s-7lyvblFNI/hqdefault.jpg"
            }
        }
    ];

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
        console.log(topic);

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
        
        // // Check localStorage and exit if found
        // var cachedSearch = localStorage.getItem(topic);

        // if (cachedSearch) {
        //     searchData = JSON.parse(cachedSearch);

        //     // TODO: Remove
        //     console.log("Getting cached searchResults");
        //     console.table(searchData);

        //     // Exit
        //     return;
        // }
        // // TODO: Decide about disabling button after 1 search

        // url = generateYTSearchURL(topic, staticParams);
        // // TODO: Remove
        // console.log(url);

        // getYTSearchData(url)
        //     .then(function(data) {
        //         var dataList = data.items;
        //         searchData = processSearchData(dataList);
        //         // store search data by topic : [searchData]
        //         localStorage.setItem(topic, JSON.stringify(searchData));
        //         // We could call renderSearch(searchData) here
        //         // TODO: Remove
        //         console.table(searchData);

        //     }).catch(function(error) {
        //         console.log(error, error.stack);
        //     })

        localStorage.setItem('topicInput', JSON.stringify(topic)); 

        homeDisplay.hide();
        resultsDisplay.show();

        renderSearch();
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

        for (var i=0; i<=8; i++) { //TODO: REPLACE i<=8 with i<resultsArray.length
            // create new HTML elements

            var div1 = $('<div class="cell"></div>');
            var div2 = $('<div class="card" id="' + dataList[i].videoId + '"></div>');
            var videoTitle = $('<h6 class="videoTitle"></h6>').html(dataList[i].title);
            var videoDescr = $('<p></p>').html(dataList[i].description);
            var thumbnail = $('<img>').attr('src', dataList[i].thumbnailUrl.medium);
            var favoriteBtn = $('<button class="button favoriteBtn">Favorite</button>');
    
            // query selector for parent element in HTML DOM
            var videosRow1 = $('#resultsRow1');
            var videosRow2 = $('#resultsRow2');
            var videosRow3 = $('#resultsRow3');
    
            var videoRowArray = [videosRow1, videosRow2, videosRow3];
    
            div1.append(div2);
            div2.append(videoTitle);
            div2.append(thumbnail);
            div2.append(videoDescr);
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
        favBtns.click(function(){
            var vidTitle = $(this).siblings('.videoTitle')[0].innerHTML;
            var vidID = $(this).parent().attr('id');
            var vidThumbnail = $(this).siblings('img').attr('src');
            var vidDescr = $(this).siblings('p')[0].innerHTML;

            console.log(vidTitle,vidID,vidThumbnail,vidDescr);

            var favoriteObject = {
                vidTitle: vidTitle,
                vidID: vidID,
                vidThumbnail: vidThumbnail,
                vidDescr: vidDescr,
            };

            var favoritesArray = JSON.parse(localStorage.getItem('favoritesArray'));
            console.log(favoritesArray);

            favoritesArray.push(favoriteObject);

            localStorage.setItem('favoritesArray', JSON.stringify(favoritesArray));

        })
        
    }

    // TODO: fetch youtube API
    // function generateYTSearchURL(searchPhrase, paramsObj) {
    //     var baseURL = 'https://www.googleapis.com/youtube/v3/search?';
    //     // combine param objects into a new one
    //     var params = Object.assign({}, paramsObj, {q: searchPhrase});
    //     // https://api.jquery.com/jQuery.param/
    //     var queryString = $.param(params);

    //     return baseURL + queryString;
    // }

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
    // function processSearchData(dataList) {
    //     let resultList = [];

    //     for (item of dataList) {
    //         const s = item.snippet;
    //         const thumbs = s.thumbnails;        
    //         resultList.push({
    //             videoId: item.id.videoId,
    //             title: s.title,
    //             description: s.description,
    //             thumbnailUrl: {
    //                 medium: thumbs.medium.url,
    //                 large: thumbs.high.url
    //             }
    //         });
    //     }

    //     return resultList;
    // }

    // Called in search button click handler
    // Returns a promise
    // function getYTSearchData(url) {
    //     return fetch(url)
    //         .then(function(response) {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 // fetch() won't error on 4xx status codes
    //                 // so we have to throw our own
    //                 throw new Error(`Unexpected status code: ${
    //                     response.status
    //                 } ${response.statusText}`);
    //             }
    //         }).catch(function(reason) {
    //             console.error(reason.message);
    //         });
    // } 


    // Define renderFavorites function
    function renderFavorites() {
        // TEST
        var favoritesArray = JSON.parse(localStorage.getItem('favoritesArray'));

        for (var i=0; i<favoritesArray.length; i++) { //TODO: REPLACE i<=8 with i<=favoritesArray.length
            // create new HTML elements
            var div1 = $('<div class="cell"></div>');
            var div2 = $('<div class="card" id="' + favoritesArray[i].vidID + '"></div>');
            var removeBtn = $('<button class="button remove">Remove</button>'); //TODO: event listener for remove button.
            var vidTitle = $('<h6>').text(favoritesArray[i].vidTitle);
            var thumbnail = $('<img>').attr('src', favoritesArray[i].vidThumbnail);
            var vidDescr = $('<p></p>').text(favoritesArray[i].vidDescr);
            var notesBtn = $('<button class="button notes">Notes</button>'); //TODO: event listener for notes button.
            
            // TODO: create these rows dynamically so that the user can have more than 9 favorite videos.
            var favoritesRow1 = $('#favoritesRow1');
            var favoritesRow2 = $('#favoritesRow2');
            var favoritesRow3 = $('#favoritesRow3');
    
            var favoritesRowArray = [favoritesRow1, favoritesRow2, favoritesRow3];
    
            div1.append(div2);
            div2.append(removeBtn,vidTitle,thumbnail,vidDescr,notesBtn);

            if(i<=2) {
                favoritesRowArray[0].append(div1);
            } else if(i<=5) {
                favoritesRowArray[1].append(div1);
            } else if(i<=8) {
                favoritesRowArray[2].append(div1);
            }
        }
        
    }
    // document.getElementById("notes").addEventListener("click", function() {

    // })

    init();

})