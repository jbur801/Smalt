var express = require('express');
var router = express.Router();
const axios = require('axios');
const spotify = require('../Spotify/spotifyHandler.js');
const query = require('../db/queries');
const connect = require('../db/connect');

router.get('/auth', async (req, res) => {
  //payload = spotify.createAuthRequest(req.query.uri)
  res.json(spotify.createAuthRequest(req.query.uri));
});

router.get('/auth/code', async (req, res) => {
  var accessAndRefreshTokens = await spotify.fetchAccessToken(req.query.authCode);
  var hostUserName = req.query.userName;
  console.log(`accesstoken: ${accessAndRefreshTokens.accessToken}`);
  console.log(`username: ${hostUserName}`)
  connect.connectToDatabase();
  console.log(await query.createNewRoom(accessAndRefreshTokens,hostUserName))
  // connect.disconnect();
  
});

module.exports = router;
