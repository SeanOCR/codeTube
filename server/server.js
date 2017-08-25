const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const request = require('superagent');

const {CATEGORIES, CATEGORY_VALUES, VIDEOS_PER_PAGE, MAX_PAGES} = require('../shared/constants');
const {formatVideoRequest} = require('../shared/utils');

// We calculate the max results by the number of pages, entries per page, plus 1 for our feature
const MAX_RESULTS = VIDEOS_PER_PAGE*MAX_PAGES+1;
const API_KEY = 'AIzaSyAgPIgZj6uYdsQ9RtyPTPwPN1PCPsKXGXw';
const VIDEO_REQUEST = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults='+MAX_RESULTS+'&q=%category&key=' + API_KEY;
const RELATED_VIDEO_REQUEST = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults='+VIDEOS_PER_PAGE+'&relatedToVideoId=%videoId&key=' + API_KEY;


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../public/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/_getvideos/:category', cors(), function(req, res) {
  let origin = req.get('Origin');
  if (!req.params.category) { 
    res.status(500); 
    res.send({'Error': 'A category was not specified.'}); 
    console.log('A category was not specified for video request.'); 
  } else {
    let requestString = VIDEO_REQUEST.replace('%category', req.params.category );
    if (req.params.category.toLowerCase() === CATEGORIES.ALL.toLowerCase()) {
      let allCategories = '';
      CATEGORY_VALUES.forEach((category, index) => {
        if (category !== CATEGORIES.ALL) {
          allCategories = allCategories + category + ((index + 1) < CATEGORY_VALUES.length ? '%7C' : '');
        }
      });
      requestString = VIDEO_REQUEST.replace('%category', allCategories );
    }
    request.get(requestString).end((error, response) => {
      if (!error && response.statusCode == 200) {
        // #IMPROVMENTS: To get around CORS issues we are simply setting origin to the originator,
        //   however, in production we would want to implement a whitelisting system
        res.set({
          'Access-Control-Allow-Origin': origin,
          'Vary': 'Origin',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE'
        });
        
        res.json(formatVideoRequest(JSON.parse(response.text)));
      } else {
        console.log('Failed to retrieve videos from youtube api');
      }
    });
  }
});

app.get('/_getrelatedvideos/:videoid', cors(), function(req, res) {
  let origin = req.get('Origin');
  if (!req.params.videoid) { 
    res.status(500); 
    res.send({'Error': 'A videoId was not specified.'}); 
    console.log('A videoId not specified for related video request.'); 
  } else {
    let requestString = RELATED_VIDEO_REQUEST.replace('%videoId', req.params.videoid );
    request.get(requestString).end((error, response) => {
      if (!error && response.statusCode == 200) {
        // #IMPROVMENTS: To get around CORS issues we are simply setting origin to the originator,
        //   however, in production we would want to implement a whitelisting system
        res.set({
          'Access-Control-Allow-Origin': origin,
          'Vary': 'Origin',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE'
        });
        
        res.json(formatVideoRequest(JSON.parse(response.text)));
      } else {
        console.log('Failed to retrieve videos from youtube api');
      }
    });
  }
}); 