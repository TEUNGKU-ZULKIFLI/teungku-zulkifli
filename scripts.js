function initializeAudioPlayer(audioPlayerId, audioSourceId, playPauseBtnId, prevBtnId, nextBtnId, currentSongId, playlist) {
    const audioPlayer = document.getElementById(audioPlayerId);
    const audioSource = document.getElementById(audioSourceId);
    const playPauseBtn = document.getElementById(playPauseBtnId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const currentSongInfo = document.getElementById(currentSongId);

    let currentIndex = 0;

    function loadSong(index) {
        audioSource.src = playlist[index].src;
        currentSongInfo.textContent = playlist[index].title;
        audioPlayer.load();
        playPauseBtn.textContent = 'Play';
    }

    function playPauseAudio() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    }

    function playNext() {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadSong(currentIndex);
        playPauseAudio();
    }

    function playPrev() {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentIndex);
        playPauseAudio();
    }

    playPauseBtn.addEventListener('click', playPauseAudio);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);

    // Load the first song by default
    loadSong(currentIndex);
}

fetch('playlist.json')
    .then(response => response.json())
    .then(data => {
        const playlistSelector = document.getElementById('playlistSelector');
        playlistSelector.addEventListener('change', function() {
            const selectedPlaylist = this.value;
            initializeAudioPlayer('audioPlayer', 'audioSource', 'playPauseBtn', 'prevBtn', 'nextBtn', 'currentSong', data[selectedPlaylist]);
        });

        // Initialize with the default selected playlist
        initializeAudioPlayer('audioPlayer', 'audioSource', 'playPauseBtn', 'prevBtn', 'nextBtn', 'currentSong', data[playlistSelector.value]);
    })
    .catch(error => {
        console.error('Error loading playlist:', error);
    });
