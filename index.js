'use strict';



function getDogImage(parkSearch, numSearch, stateSearch) {
    let theState = stateSearch.split(', ').join('&');

    const params = {
        stateAbbrev: 'stateCode=' + theState + '&',
        limit: 'limit=' + numSearch,
        searchTerm: '&q=' + parkSearch,
        apiKey: 'e6WuYlvEuBgzYcFrdEEngp0MoaorzhkdehBuAA3M'
    };
    let apiUrl = `https://developer.nps.gov/api/v1/parks?${params.stateAbbrev}${params.limit}${params.searchTerm}&api_key=${params.apiKey}`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(response => response.json())
        .then(responseJson =>
            displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
};

function displayResults(responseJson) {
    console.log(responseJson)
    let numOfResults = responseJson.data.length;
    let i;
    if (numOfResults > 0) {
        for (i = 0; i < numOfResults - 1; i++) {

            $('section').append(`<br class='newPark'><p class='newPark'><u><b>${responseJson.data[i].fullName}</u></b></p><p class='newPark'>${responseJson.data[i].description}</p><p class='newPark'><a class = 'newPark' href ="${responseJson.data[i].url}">${responseJson.data[i].url}</p><br></br>`);
        };
    } else {
        alert('This is an invalid entry.')
    }

    $('.results').removeClass('hidden');
};

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        $('.newPark').remove();
        let parkSearch = $('.parkSearch').val().toLowerCase();
        let numSearch = $('.numSearch').val();
        let stateSearch = $('.stateSearch').val().toUpperCase();
        //grab value out of text input
        $('.parkSearch').val("");
        $('.stateSearch').val(""); //to clear the text input box
        $('li').css("display", "none")
        getDogImage(parkSearch, numSearch, stateSearch);
        //passes value to getDogImage function
    });
};

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});
