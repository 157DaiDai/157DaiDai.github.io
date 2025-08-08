/*
 * Music Player Configuration
 * APlayer initialization and music playlist setup
 */

// Initialize APlayer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create APlayer instance
    const ap = new APlayer({
        container: document.getElementById('music'),
        fixed: false,
        autoplay: false,
        theme: '#424242',
        loop: 'all',
        order: 'random',
        preload: 'metadata',
        volume: 0.7,
        mutex: true,
        lrcType: 3,
        audio: [
            {
                name: '範例音樂',
                artist: '呆呆',
                url: 'https://music.163.com/song/media/outer/url?id=1815684465.mp3',
                cover: 'https://p2.music.126.net/J9T2rhuufgbGlmXVqAyiWQ==/109951165671241417.jpg',
                lrc: 'https://music.163.com/api/song/lyric?id=1815684465&lv=1&kv=1&tv=-1'
            }
        ]
    });

    // Show music player when clicking "打開音樂播放器"
    document.getElementById('open-music').addEventListener('click', function() {
        document.getElementById('music').style.display = 'block';
        document.querySelector('.hitokoto').style.display = 'none';
    });

    // Hide music player and show quotes when clicking "回上一页"
    document.getElementById('music-close').addEventListener('click', function() {
        document.getElementById('music').style.display = 'none';
        document.querySelector('.hitokoto').style.display = 'block';
    });

    // Make sure the music container is initially hidden
    document.getElementById('music').style.display = 'none';
});
