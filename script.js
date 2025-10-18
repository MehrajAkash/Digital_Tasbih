// Counter logic
const counter = document.getElementById('counter');
const incrementBtn = document.getElementById('incrementBtn');
const resetBtn = document.getElementById('resetBtn');

let count = 0;
incrementBtn.addEventListener('click', () => { count++; counter.textContent = count; });
resetBtn.addEventListener('click', () => { count = 0; counter.textContent = count; });

// Night mode logic
const modeToggle = document.getElementById('modeToggle');
if (localStorage.getItem('mode') === 'dark') { document.body.classList.add('dark-mode'); modeToggle.textContent = '☀️ Light Mode'; }
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    modeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Night Mode';
    localStorage.setItem('mode', isDark ? 'dark' : 'light');
});


// Demo audio logic
const audioButtons = document.querySelectorAll('.audio-section button');
let currentAudio = null;

audioButtons.forEach((button, index) => {
    const audio = button.querySelector('audio');
    audio.removeAttribute('controls');

    button.addEventListener('click', () => {
        if (!audio) return;

        // If same audio playing, stop it
        if (currentAudio === audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            currentAudio = null;
            button.classList.remove('playing');
        } else {
            // Stop previous audio if any
            if (currentAudio && !currentAudio.paused) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                const prevButton = currentAudio.closest('button');
                if (prevButton) prevButton.classList.remove('playing');
            }

            // Only first audio starts from 5 seconds
            if (index === 0) {
                audio.currentTime = 7; // first audio starts from 5 sec
            } else {
                audio.currentTime = 0; // other audios start from beginning
            }

            // Play this audio
            audio.play();
            currentAudio = audio;
            button.classList.add('playing');
        }
    });

    // Remove playing class when audio ends
    audio.addEventListener('ended', () => {
        if (currentAudio === audio) {
            currentAudio = null;
            button.classList.remove('playing');
        }
    });
});