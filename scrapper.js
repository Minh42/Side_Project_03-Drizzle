const rp = require('request-promise');
const fs = require('fs');


function scrapeHashtags(html) {  
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;
    while ((match = regex.exec(html))) {
        matches.push(match[1]);
    }
    return matches;
}

function removeDuplicates (arr) {
    let newArr = [];
    arr.map(ele => {
        if (newArr.indexOf(ele) == -1) {
            newArr.push(ele)
        }
    })
    return newArr;
}


rp('https://www.instagram.com/p/BrUeoQml8T1/')
    .then(function(html) {
        let hashtags = scrapeHashtags(html);
        hashtags = removeDuplicates(hashtags);
        hashtags = hashtags.map(ele => "#" + ele)
        console.log(hashtags.length);
    })
    .catch(function (err) {
        console.log(err)
    });

