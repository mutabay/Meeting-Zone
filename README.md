# Meeting-Zone

Software Project Management Term Project

https://meeting-zone.herokuapp.com/

Mustafa Tayyip BAYRAM - 170706007  - SCRUM Master  
Furkan ÖCALAN - 170706003  
Damlanur TOPCU - 170706012  
Ecem - YENİTÜRK - 170706024  
Kutay - TORLAK - 180706026  
Mert - YILMAZ -  180706006   
Rabia - ÖZDEMİR - 170706009  

Meeting-Zone is a simple video chat application for multi-users based on React, Node Express and WebRTC.


**Technologies Used**

- React
- Node + Express
- WebRTC
- Socket.io
- [Syled-components](https://styled-components.com/)
- [Simple-peer](https://github.com/feross/simple-peer)

**Forked From:** [Hyunse Kim](https://github.com/Hyunse)

---

## Features

- Join a room
- Video Streaming
- Text chat
- Mute Video/Audio
- Screen Sharing

## Installation

## Installation - Run Locally
--> First you need to download NodeJS [here](https://nodejs.org/en/download/current/)
1) Clone this repository.
2) Navigate the folder.
3) Open CMD / PowerShell in the folder which contains `server.js`.
4) Type `npm install`. This will install necessary modules for you. <br>
5-a) You need to create a database in order to run it fully-functional.(/ is sufficient for small deployments.) <br>
5.a) Fill DB credentials in `server.js`. These are commented for you. <br>
5.b) There is a simple database in the app. You can register & login. <br>
6.a) Type `node server.js`. If it prints **connected**, then DB connection is successful and the app is running without any errors.
6.b) Type `npm start` for starting with nodemon. If it prints **connected**, then DB connection is successful and the app is running without any errors.

7) Open http://127.0.0.1:5000/ in your browser.
8) You can create accounts and then login, as well as create some meetings.

### Setup
**Client---*
> Move to client folder, update and install this package
<pre>
  <code>
    /* Install */
    npm install
    
    /* Run */
    npm start
  </code>
</pre>

**Server**
> Move to server folder, update and install this package
<pre>
  <code>
    /* Install */
    npm install
    
    /* Run */
    npm run dev
  </code>
</pre>

