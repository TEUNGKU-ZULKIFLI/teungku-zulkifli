function initializeAudioPlayer(audioPlayerId, audioSourceId, playPauseBtnId, prevBtnId, nextBtnId, currentSongId, playlist) {
    const audioPlayer = document.getElementById(audioPlayerId);
    const audioSource = document.getElementById(audioSourceId);
    const playPauseBtn = document.getElementById(playPauseBtnId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const currentSongInfo = document.getElementById(currentSongId);

    let currentIndex = 0;
    let isPlaying = false;

    function loadSong(index) {
        audioSource.src = playlist[index].src;
        currentSongInfo.textContent = playlist[index].title;
        audioPlayer.load();

        // Reset play button
        playPauseBtn.textContent = 'Play';
        isPlaying = false;
    }

    function playPauseAudio() {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
            isPlaying = false;
        } else {
            audioPlayer.play().then(() => {
                playPauseBtn.textContent = 'Pause';
                isPlaying = true;
            }).catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }

    function playNext() {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadSong(currentIndex);

        // Tunggu sampai audio selesai load sebelum memainkannya
        audioPlayer.onloadeddata = () => {
            playPauseAudio();
        };
    }

    function playPrev() {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentIndex);

        // Tunggu sampai audio selesai load sebelum memainkannya
        audioPlayer.onloadeddata = () => {
            playPauseAudio();
        };
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
