// --- GLOBAL SETTINGS ---
const audio = new Audio('song.mp3');
audio.volume = 0.15; // Set to 15%
audio.loop = true;
let musicStarted = false;
let currentStage = 1;

// --- STAGE 1: MOMOS JIGSAW PUZZLE ---
const board = document.getElementById('puzzle-board');
const tilesCorrect = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let tilesCurrent = [...tilesCorrect];
let firstSelected = null;

function initPuzzle() {
    // Shuffle the pieces
    tilesCurrent.sort(() => Math.random() - 0.5);
    renderPuzzle();
}

function renderPuzzle() {
    board.innerHTML = '';
    tilesCurrent.forEach((val, idx) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        
        // Calculate background position based on the value (original position)
        const row = Math.floor(val / 3);
        const col = val % 3;
        tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        
        tile.onclick = () => handleTileClick(idx);
        board.appendChild(tile);
    });
}

function handleTileClick(idx) {
    if(!musicStarted) { audio.play(); musicStarted = true; }

    if (firstSelected === null) {
        firstSelected = idx;
        board.children[idx].classList.add('selected');
    } else {
        // Swap values in our array
        [tilesCurrent[firstSelected], tilesCurrent[idx]] = [tilesCurrent[idx], tilesCurrent[firstSelected]];
        firstSelected = null;
        renderPuzzle();
        checkPuzzleWin();
    }
}

function checkPuzzleWin() {
    if (JSON.stringify(tilesCurrent) === JSON.stringify(tilesCorrect)) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => nextStage(2), 1500);
    }
}

// --- STAGE NAVIGATION ---
function nextStage(n) {
    const curEl = document.getElementById(`stage-${currentStage}`);
    const nextEl = document.getElementById(`stage-${n}`);
    const vid = document.getElementById('main-video');

    gsap.to(curEl, { opacity: 0, scale: 0.9, duration: 0.8, onComplete: () => {
        curEl.classList.add('hidden');
        nextEl.classList.remove('hidden');
        gsap.fromTo(nextEl, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.8 });
    }});

    if(n === 2) { audio.pause(); vid.play(); }
    else if(n === 3) { vid.pause(); audio.play(); }
    else if(n === 5) { initDraggable(); }
    
    currentStage = n;
}

function toggleMute() {
    const vid = document.getElementById('main-video');
    vid.muted = !vid.muted;
}

// --- STAGE 4: CAKE CUTTING ---
let candleBlown = false;
function handleCake() {
    const cakeL = document.getElementById('cake-left');
    const cakeR = document.getElementById('cake-right');
    if (!candleBlown) {
        document.querySelector('.flame').style.display = 'none';
        confetti({ colors: ['#0071e3', '#ade8f4', '#ffffff'] });
        document.getElementById('cake-status').innerText = "Wishes do come true!";
        document.getElementById('cake-instr').innerText = "Now tap to cut the cake!";
        candleBlown = true;
    } else {
        cakeL.style.transform = "translateX(-30px) rotate(-5deg)";
        cakeR.style.transform = "translateX(30px) rotate(5deg)";
        document.getElementById('memories-btn').classList.remove('hidden');
    }
}

// --- STAGE 5: DRAGGABLE PHOTOS ---
function initDraggable() {
    gsap.registerPlugin(Draggable);
    Draggable.create(".polaroid", {
        bounds: "#photo-stack",
        onPress: function() {
            // Put current photo on top
            gsap.set(".polaroid", { zIndex: 1 });
            gsap.set(this.target, { zIndex: 100 });
        }
    });
}

// Run puzzle on load
window.onload = initPuzzle;
function startApp() {
    if(!started) { 
        navigator.vibrate(50); // <--- ADD THIS
        audio.play(); 
        started = true; 
        nextStage(2); 
    }
}
b.onclick = () => {
    navigator.vibrate(40); // <--- ADD THIS (shorter for a "pop" feel)
    gsap.to(b, { scale: 1.5, opacity: 0, duration: 0.3, onComplete: () => b.remove() });
    // ... rest of your code
};
function blowCandle() {
    navigator.vibrate([100, 30, 100]); // <--- ADD THIS (A double-pulse pattern)
    gsap.to("#flame", { scale: 0, opacity: 0, duration: 0.5 });
    confetti({ particleCount: 150, spread: 70, colors: ['#0071e3', '#ffffff'] });
    // ... rest of your code
}
function initDraggable() {
    gsap.registerPlugin(Draggable);
    Draggable.create(".photo-card", {
        onPress: function() { 
            navigator.vibrate(30); // <--- ADD THIS (Very subtle buzz)
            gsap.to(this.target, { scale: 1.05, duration: 0.3 }); 
        },
        // ... rest of your code
    });
}

if(n === 6) {
    navigator.vibrate([100, 50, 100, 50, 300]); // <--- ADD THIS (Success pattern)
    confetti({ particleCount: 250, spread: 100, origin: { y: 0.6 } });
}
