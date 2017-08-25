# Code Assignment #
Test assignment.  Not saying much else incase others are doing the same assignment.

# Assumptions #
There were certain assumptions that I had to make while working on this:
1. **Featured Video:** Not sure what a makes a video 'featured', so for simplicity I used the first video that was returned
2. **Ordering**: The youtube search api has a field for returning videos in alphabetical order (order=title), but this has two side effects: it removes relevance weighting, and moves all japanese/chinese/russian titles to the top.  Due to the 3 iteration limit in the assignment, I assumed this was accounted for and it was intended for me to grab all 30 videos in one request and not do subsequent requests, as this would have the side effect of each individual page being alphabetically ordered, but not the whole list.
3. **Client vs Server requests**: While we code do this assignment completely on the client side, I believe using a server is what is intended here for many reasons I list below. 

# Getting going #
To get up and running quickly 
1. ```npm install```
2. ```npm start``` // Builds app and starts server
3. Go to [http://localhost:3000](http://localhost:3000)


# Application Structure #
```
├── app/               // This is the client side app
│   ├── components/    // React components
│   ├── assets/        // Static assets...if we had any
├── shared/            // Code utilized by both the server and client
└── server/            // Server files...only one at the moment
```

# Coding Choices #
## To Serve or not to Serve ##
It is possible to do this assignment completely from the client side, but I assume we want to do this from a server for the following reasons:
1. **Keeps Api key safe**: The youtube apis require a credentials key, if we made the requests from the client, any user could grab the key
2. **Not reliant on Youtube**: If we ever decided to use a different video hosting site, or serve our own videos, then all we have to do is change the server a little, the client side code remains unchanged (minus the bit that uses the embedded youtube player)
3. **Caching & request management**: The content we want is pretty well known, so we can cache the results of our requests on the server for future client requests.
## Only 1 css file##
In larger apps it would be better to split up our css, some even go as far as having a css for every component. I do not believe that this would be helpful for such a small app and I strongly believe in splitting out css as it grows.  I especially believe this is important when designing on the fly as it makes recognizing shared styles and patterns far easier. 
## Shared server and client code ##
I assumed that we wanted a server to grab our video resources, but incase I'm wrong or we want to move the code to be client side only, I decided to move all dependencies into shared modules.
- constants.js: Possibly could have picked a better name, but this file is pretty spiffy as all dependent constants can be found here. You can change core principles of the app by simply updating this file (ex. Add/Change categories, change items per page, etc...)
- utils.js: Only one function in here at the moment, formats youtube response for our client.
You could move the api calls from server.js to app/video_service and the page will work without a server.
## What's up with these tabs? ##
Why are these tabs not checkboxes?  It was simply a design decision.  Checkboxes would allow you to mix multiple categories, I feel for simplification, as well as navigation, it is easier to present chocies in this format and helps to encapsalte core ideas (such as different programming languages).

# TODO #
If I had more time here are the things I'd like to do:
1. Hook up redux-router to take care of navigation
2. Add Sass
3. Add tests
4. Create a HOC for the different types of video items (featured, vs list item)
5. Many Many Many style changes 0_0
- Make youtube embed player play nice with flex boxes
- Format video items so that title & description float right and replace word wrapping with ellipses
- Have category bar slide in and out when playing a video
- 


