// all code inside call to jQuery - will not run until document renders.
$(function (){

    var backBtn = $('#back')

    backBtn.on('click', function(event){
        event.preventDefault();
        
        // redirect location to result page:
        var queryString = './index.html';
        location.assign(queryString);

    })

})