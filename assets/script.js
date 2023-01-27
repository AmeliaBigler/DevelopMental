// all code inside call to jQuery - will not run until document renders.
$(function (){

    var searchBtn = $('#search')

    searchBtn.on('click', function(event){
        event.preventDefault();
        var topic = $('#topic-input')[0].value; 

        localStorage.setItem('topicInput', JSON.stringify(topic)); 

        // redirect location to result page:
        var queryString = './search-results.html?q=' + topic;
        location.assign(queryString);

    })

})