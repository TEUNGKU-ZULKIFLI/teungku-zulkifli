const initializeAudioPlayer = (audioPlayerId, audioSourceId, toggleBtnId, prevBtnId, nextBtnId, currentSongId, songs) => {
    const audioPlayer = document.getElementById(audioPlayerId);
    const audioSource = document.getElementById(audioSourceId);
    const toggleBtn = document.getElementById(toggleBtnId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const currentSong = document.getElementById(currentSongId);
    let currentSongIndex = 0;

    const loadSong = (index) => {
        audioSource.src = songs[index].src;
        currentSong.textContent = songs[index].title;
        audioPlayer.load();
        playAudio();
    };

    const playAudio = () => {
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    };

    const togglePlayPause = () => {
        if (audioPlayer.paused) {
            playAudio();
            toggleBtn.textContent = 'Pause ⏹️'; // Change button text to "Pause"
        } else {
            audioPlayer.pause();
            toggleBtn.textContent = 'Play ▶️'; // Change button text to "Play"
        }
    };

    toggleBtn.addEventListener('click', togglePlayPause);

    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : songs.length - 1;
        loadSong(currentSongIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex < songs.length - 1) ? currentSongIndex + 1 : 0;
        loadSong(currentSongIndex);
    });

    // Initialize audio player on first use
    document.addEventListener('click', () => {
        loadSong(currentSongIndex);
        document.removeEventListener('click', arguments.callee); // Remove listener after first use
    });
};

// Example usage
initializeAudioPlayer('audioPlayer', 'audioSource', 'toggleBtn', 'prevBtn', 'nextBtn', 'currentSong', [
    // DJ Songs
    { src: 'songs/DJ🎧/-TEREK BALE- ( Music Vidio).mp3', title: 'TAREK BALE' },
    { src: 'songs/DJ🎧/DOLA - ANGGA DERMAWAN  (Official Music Video).mp3', title: 'DOLA - ANGGA DERMAWAN' },
    { src: 'songs/DJ🎧/Dash Uciha Ft Daman Nula - Nana Nana Preminim ( Preman Feminim ).mp3', title: 'Nana Nana Preminim' },
    { src: 'songs/DJ🎧/Dj kasih tinggal bang dika by arif sopan.mp3', title: 'Dj kasih tinggal bang dika' },
    { src: 'songs/DJ🎧/FAJA SKALI - ANGGA DERMAWAN.mp3', title: 'FAJA SKALI' },
    { src: 'songs/DJ🎧/TERNYATA ABU-ABUDj Qhelfin (Official Video Musik 2024).mp3', title: 'TERNYATA ABU-ABUDj Qhelfin' },
    { src: 'songs/DJ🎧/TomorrowTonight x The Box Fvnky Kane.mp3', title: 'TomorrowTonight x The Box Fvnky Kane' },

    // INDO REMIX Songs
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Andmesh  Kumau Dia Official Music Video.mp3', title: 'Andmesh  Kumau Dia' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/For Revenge - Serana (Official Lyric Video).mp3', title: 'For Revenge - Serana' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Hal Hebat - Govinda.mp3', title: 'Hal Hebat - Govinda' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Hindia - Cincin (Official Lyric Video).mp3', title: 'Hindia - Cincin' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Hindia - Evaluasi (Official Music Video).mp3', title: 'Hindia - Evaluasi' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Hindia - Rumah Ke Rumah (Official Lyric & Commentary Video).mp3', title: 'Hindia - Rumah Ke Rumah' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Kenangan Speed Up.mp3', title: 'Kenangan Speed Up' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Kepastian Rasa - Zbicrew (speed up).mp3', title: 'Kepastian Rasa - Zbicrew' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Pamungkas - To The Bone (Official Music Video).mp3', title: 'Pamungkas - To The Bone' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Papinka - Masih Mencintainya.mp3', title: 'Papinka - Masih Mencintainya' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/SAMSONS - Kenangan Terindah (Official Music).mp3', title: 'SAMSONS - Kenangan Terindah' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/SEKUAT HATIMU - LASTCHILD (Cover by DwiTanty).mp3', title: 'SEKUAT HATIMU - LASTCHILD' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Secukupnya.mp3', title: 'Secukupnya' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/Sekecewa Itu Official Speed Up.mp3', title: 'Sekecewa Itu' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/VIA AMELIA - AKU YANG MALANG 4  Feat. RASTAMANIEZ ( Official Live Version ).mp3', title: 'VIA AMELIA - AKU YANG MALANG' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/aku yang jatuh cinta.mp3', title: 'aku yang jatuh cinta' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/lagu-seventen-band-full-lirik.mp3', title: 'lagu-seventen-band' },
    { src: 'songs/SADNESS🥀 AND LOVERS❤️/last-child-sekuat-hatimu.mp3', title: 'last-child-sekuat-hatimu' },

    // ENGLISH SONGS
    { src: 'songs/English song 🇬🇧🎧/24kGoldn - Mood (speed up).mp3', title: '24kGoldn - Mood' },
    { src: 'songs/English song 🇬🇧🎧/American Authors - Best Day Of My Life.mp3', title: 'American Authors - Best Day Of My Life' },
    { src: 'songs/English song 🇬🇧🎧/Right Now - One Direction [Speed up]  (Lyrics & Terjemahan).mp3', title: 'Right Now - One Direction' },
    { src: 'songs/English song 🇬🇧🎧/Take Me Home - Cash Cash feat. Bebe Rexha (Lirik Lagu Terjemahan).mp3', title: 'Take Me Home - Cash Cash feat. Bebe Rexha' },
    { src: 'songs/English song 🇬🇧🎧/Wish You Were Here - Neck Deep (Lirik Lagu Terjemahan).mp3', title: 'Wish You Were Here - Neck Deep' },
    { src: 'songs/English song 🇬🇧🎧/drunk text - Henry Moodie (Lirik Lagu Terjemahan).mp3', title: 'drunk text - Henry Moodie' },
    { src: 'songs/English song 🇬🇧🎧/take that - patience (sped up).mp3', title: 'take that - patience' }
]);