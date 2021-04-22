const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const repoSongs = require('./repository/music-repository');
const cors = require('cors');
const { validateSong } = require('./middleware/songValidation');


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(3000, function () {
    console.log("Server started. Listening on port 3000.");
});

app.get('/api/songs', async (req, res) => {
    // fetch the songs from the server and return
    const fullData = repoSongs.findAllSongs();
    return res.send(fullData);
});

app.get('/api/songs/:id', async (req, res) => {
    const songId = req.params.id;
    const song = repoSongs.findSongById(songId);
    return res.send(song);
});

app.post('/api/songs', [validateSong], async (req, res) => {
    const newSongBody = req.body;
    const newSong = repoSongs.createSong(newSongBody);
    return res.end('{"success" : "Added Song Successfully"}');
});

app.put('/api/songs/:id', [validateSong], async (req, res) => {
    const songId = req.params.id;
    const newSongBody = req.body;
    const result = repoSongs.updateSong(songId, newSongBody);
    return res.end('{"success" : "Updated Song Successfully"}');
})

app.delete('/api/songs/:id', [validateSong], async (req, res) => {
    const songId = req.params.id;
    const result = res.deleteSong(songId);
    return res.end('{"success" : "Deleted Song Successfully"}');
})