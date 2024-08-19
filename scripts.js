function initializeAudioPlayer(playerId, sourceId, toggleBtnId, prevBtnId, nextBtnId, currentSongId, playlist) {
    const audioPlayer = document.getElementById(playerId);
    const audioSource = document.getElementById(sourceId);
    const playPauseBtn = document.getElementById(toggleBtnId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const currentSongDisplay = document.getElementById(currentSongId);

    let isPlaying = false;
    let currentSongIndex = 0;

    const loadSong = (index) => {
        audioSource.src = playlist[index].src;
        currentSongDisplay.textContent = playlist[index].title;
        audioPlayer.load();
        playAudio(); // Auto-play after loading the song
    };

    const playAudio = () => {
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        isPlaying = true;
        playPauseBtn.textContent = 'Pause';
    };

    const pauseAudio = () => {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
    };

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : playlist.length - 1;
        loadSong(currentSongIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex < playlist.length - 1) ? currentSongIndex + 1 : 0;
        loadSong(currentSongIndex);
    });

    // Initial load
    loadSong(currentSongIndex);
}

// Example usage
fetch('playlist.json')
    .then(response => response.json())
    .then(data => {
        // Initialize with DJ Songs as an example
        initializeAudioPlayer('audioPlayer', 'audioSource', 'playPauseBtn', 'prevBtn', 'nextBtn', 'currentSong', data.DJ_Songs);
    })
    .catch(error => {
        console.error('Error loading playlist:', error);
    });
