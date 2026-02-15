// Game State
let state = {
    hp: 100,
    inventory: [],
    currentScene: 'start',
    sceneHistory: [],
    collectedNotes: []
};

// UI Elements
const ui = {
    text: document.getElementById('story-text'),
    choices: document.getElementById('choices-container'),
    hp: document.getElementById('hp-val'),
    hpBar: document.getElementById('hp-bar'),
    inventory: document.getElementById('inventory-list'),
    visual: document.getElementById('scene-visual'),
    saveBtn: document.getElementById('save-btn'),
    loadBtn: document.getElementById('load-btn'),
    restartBtn: document.getElementById('restart-btn')
};

// Audio Context for sound effects
let audioContext = null;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Sound Effects using Web Audio API
function playSound(type) {
    initAudio();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 400;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'item':
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'damage':
            oscillator.type = 'sawtooth';
            oscillator.frequency.value = 100;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'success':
            oscillator.frequency.value = 600;
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            oscillator.start(audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
        case 'death':
            oscillator.type = 'sawtooth';
            oscillator.frequency.value = 200;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
            break;
    }
}

// Save/Load System
function saveGame() {
    try {
        const saveData = {
            hp: state.hp,
            inventory: state.inventory,
            currentScene: state.currentScene,
            sceneHistory: state.sceneHistory,
            collectedNotes: state.collectedNotes,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('apocalypse_save', JSON.stringify(saveData));
        playSound('success');
        showTemporaryMessage('💾 Đã lưu game!');
    } catch (e) {
        showTemporaryMessage('❌ Lỗi khi lưu game!');
    }
}

function loadGame() {
    try {
        const saveData = localStorage.getItem('apocalypse_save');
        if (saveData) {
            const data = JSON.parse(saveData);
            state.hp = data.hp;
            state.inventory = data.inventory || [];
            state.currentScene = data.currentScene;
            state.sceneHistory = data.sceneHistory || [];
            state.collectedNotes = data.collectedNotes || [];
            playSound('success');
            showTemporaryMessage('📂 Đã tải game!');
            updateStats();
            showScene(state.currentScene);
        } else {
            showTemporaryMessage('❌ Không tìm thấy file lưu!');
        }
    } catch (e) {
        showTemporaryMessage('❌ Lỗi khi tải game!');
    }
}

function showTemporaryMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.9);
        color: #44ff44;
        padding: 20px 40px;
        border-radius: 8px;
        border: 2px solid #44ff44;
        font-size: 1.2em;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    document.body.appendChild(msgDiv);
    setTimeout(() => {
        msgDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => msgDiv.remove(), 300);
    }, 2000);
}

// Initialize game
function startGame() {
    state.hp = 100;
    state.inventory = [];
    state.sceneHistory = [];
    state.collectedNotes = [];
    state.currentScene = 'start';
    updateStats();
    showScene('start');
    playSound('success');
}

// Update stats display
function updateStats() {
    ui.hp.innerText = state.hp;
    
    // Update HP bar with animation and color
    const hpPercent = Math.max(0, Math.min(100, state.hp));
    ui.hpBar.style.width = hpPercent + '%';
    
    // Change HP bar color based on health
    if (hpPercent > 70) {
        ui.hpBar.style.background = 'linear-gradient(90deg, #44ff44, #88ff44)';
    } else if (hpPercent > 30) {
        ui.hpBar.style.background = 'linear-gradient(90deg, #ffaa44, #ffdd44)';
    } else {
        ui.hpBar.style.background = 'linear-gradient(90deg, #ff4444, #ff8844)';
    }
    
    ui.inventory.innerText = state.inventory.length > 0 ? state.inventory.join(', ') : "Trống";
}

// Scene visuals with emoji/ASCII art
function getSceneVisual(sceneId) {
    const visuals = {
        'start': { emoji: '🏚️💀', class: 'visual-bunker-dark', text: '═══ HẦM NGỤC ═══' },
        'check_pockets': { emoji: '🔦📝', class: 'visual-bunker-dark', text: '≡ TÚI ĐỒ ≡' },
        'push_door_fail': { emoji: '🚪🔒', class: 'visual-bunker-dark', text: '▓▓ CỬA KHÓA ▓▓' },
        'light_up': { emoji: '🔥🔦', class: 'visual-bunker-light', text: '╔ ÁNH SÁNG ╗' },
        'got_crowbar': { emoji: '🔧⚒️', class: 'visual-bunker-light', text: '◈ CÔNG CỤ ◈' },
        'door_locked_again': { emoji: '🚪❌', class: 'visual-bunker-dark', text: '▓ KHÓA CHẶT ▓' },
        'escape_bunker': { emoji: '🌅🏚️', class: 'visual-outside', text: '✦ TỰ DO ✦' },
        'outside_world': { emoji: '🌍☠️', class: 'visual-wasteland', text: '◆ HOANG TÀN ◆' },
        'found_survivor': { emoji: '👤❓', class: 'visual-wasteland', text: '※ NGƯỜI LẠ ※' },
        'trust_survivor': { emoji: '🤝😊', class: 'visual-shelter', text: '✿ TIN TƯỞNG ✿' },
        'distrust_survivor': { emoji: '🔪⚔️', class: 'visual-danger', text: '⚠ NGHI NGỜ ⚠' },
        'ambush': { emoji: '💀🔫', class: 'visual-danger', text: '☠ PHỤC KÍCH ☠' },
        'safe_shelter': { emoji: '🏠✅', class: 'visual-shelter', text: '❋ NƠI TRÚ ẨN ❋' },
        'city_ruins': { emoji: '🏙️💥', class: 'visual-city-ruins', text: '◇ THÀNH PHỐ ◇' },
        'raiders': { emoji: '⚔️👥', class: 'visual-danger', text: '⚡ KẺ CƯỚP ⚡' },
        'fight_raiders': { emoji: '🗡️💢', class: 'visual-danger', text: '⚔ CHIẾN ĐẤU ⚔' },
        'sneak_past': { emoji: '🤫👣', class: 'visual-city-ruins', text: '≋ LẺN LÉN ≋' },
        'good_ending': { emoji: '🌟✨', class: 'visual-victory', text: '★ CHIẾN THẮNG ★' },
        'bad_ending': { emoji: '💀⚰️', class: 'visual-death', text: '✞ KẾT THÚC ✞' },
        'secret_ending': { emoji: '🔮✨', class: 'visual-victory', text: '◈ BÍ MẬT ◈' },
        'check_note': { emoji: '📜⚠️', class: 'visual-bunker-light', text: '⚠ LƯU Ý ⚠' }
    };
    
    return visuals[sceneId] || { emoji: '❓', class: 'visual-bunker-dark', text: '???' };
}

// Typewriter effect
function typewriterEffect(element, text, speed = 30) {
    element.innerHTML = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Show scene with animations
function showScene(sceneId) {
    const scene = storyData.find(s => s.id === sceneId);
    if (!scene) {
        console.error("Scene not found:", sceneId);
        return;
    }

    // Add to history
    if (state.currentScene !== sceneId) {
        state.sceneHistory.push(state.currentScene);
    }
    state.currentScene = sceneId;

    // Scene transition animation
    ui.visual.classList.add('scene-transition-out');
    
    setTimeout(() => {
        // Update visual
        const visual = getSceneVisual(sceneId);
        ui.visual.className = 'scene-visual ' + visual.class;
        ui.visual.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 2em; margin-bottom: 10px;">${visual.emoji}</div>
                <div style="font-size: 0.4em; letter-spacing: 2px; color: #888;">${visual.text}</div>
            </div>
        `;
        
        ui.visual.classList.remove('scene-transition-out');
        ui.visual.classList.add('scene-transition-in');
        
        // Update text with typewriter effect
        typewriterEffect(ui.text, scene.text);
        
        // Apply HP cost if any
        if (scene.hpCost) {
            state.hp -= scene.hpCost;
            playSound('damage');
            
            if (state.hp <= 0) {
                setTimeout(() => gameOver(), 500);
                return;
            }
            updateStats();
        }

        // Render Choices
        ui.choices.innerHTML = '';
        scene.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.classList.add('choice-btn');
            
            // Check requirements
            let canChoose = true;
            let displayText = choice.text;
            
            if (choice.requiredItem) {
                const hasItem = state.inventory.includes(choice.requiredItem);
                if (!hasItem) {
                    displayText = `🔒 [Cần ${choice.requiredItem}] ${choice.text}`;
                    btn.disabled = true;
                    canChoose = false;
                }
            }
            
            if (choice.requiredNote) {
                const hasNote = state.collectedNotes.includes(choice.requiredNote);
                if (!hasNote) {
                    displayText = `📝 [Cần ghi chú] ${choice.text}`;
                    btn.disabled = true;
                    canChoose = false;
                }
            }
            
            btn.innerText = displayText;
            
            if (canChoose) {
                btn.onclick = () => {
                    playSound('click');
                    selectChoice(choice);
                };
            }
            
            // Stagger animation for choices
            btn.style.animation = `fadeIn 0.3s ease-out ${index * 0.1}s both`;
            
            ui.choices.appendChild(btn);
        });
        
    }, 300);
}

// Handle choice selection
function selectChoice(choice) {
    // Reward Logic - Item
    if (choice.reward && !state.inventory.includes(choice.reward)) {
        state.inventory.push(choice.reward);
        playSound('item');
        
        // Item pickup animation
        const inventoryBox = document.querySelector('.status-box:nth-child(2)');
        inventoryBox.classList.add('item-pickup-flash');
        setTimeout(() => inventoryBox.classList.remove('item-pickup-flash'), 1800);
        
        updateStats();
    }
    
    // Reward Logic - Note
    if (choice.note && !state.collectedNotes.includes(choice.note)) {
        state.collectedNotes.push(choice.note);
        playSound('item');
    }

    // Navigate to next scene
    if (choice.nextScene) {
        setTimeout(() => showScene(choice.nextScene), 200);
    }
}

// Game Over
function gameOver() {
    playSound('death');
    ui.visual.className = 'scene-visual visual-death';
    ui.visual.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 2em; margin-bottom: 10px;">💀⚰️</div>
            <div style="font-size: 0.4em; letter-spacing: 2px; color: #ff4444;">✞ GAME OVER ✞</div>
        </div>
    `;
    ui.text.innerHTML = "<strong>BẠN ĐÃ CHẾT VÌ KIỆT SỨC...</strong><br><br>Hành trình của bạn kết thúc ở đây.";
    ui.choices.innerHTML = '<button class="choice-btn" onclick="startGame()">🔄 Chơi lại</button>';
}

// Control buttons
ui.saveBtn.onclick = saveGame;
ui.loadBtn.onclick = loadGame;
ui.restartBtn.onclick = () => {
    if (confirm('Bạn có chắc muốn chơi lại từ đầu?')) {
        startGame();
    }
};

// Start Game on load
startGame();
