let state = {
    hp: 100,
    inventory: [],
    currentScene: 'start'
};

// UI Elements
const ui = {
    text: document.getElementById('story-text'),
    choices: document.getElementById('choices-container'),
    hp: document.getElementById('hp-val'),
    inventory: document.getElementById('inventory-list'),
    imgName: document.getElementById('scene-img-name')
};

function startGame() {
    state.hp = 100;
    state.inventory = [];
    showScene('start');
    updateStats();
}

function updateStats() {
    ui.hp.innerText = state.hp;
    ui.inventory.innerText = state.inventory.length > 0 ? state.inventory.join(', ') : "Trống";
}

function showScene(sceneId) {
    const scene = storyData.find(s => s.id === sceneId);
    if (!scene) return console.error("Scene not found:", sceneId);

    // Update Text & Image Placeholder
    ui.text.innerHTML = scene.text;
    ui.text.classList.remove('typing-effect');
    void ui.text.offsetWidth; // Trigger reflow to restart animation
    ui.text.classList.add('typing-effect');
    
    if (scene.image) ui.imgName.innerText = scene.image;

    // Apply HP cost if any
    if (scene.hpCost) {
        state.hp -= scene.hpCost;
        if (state.hp <= 0) {
            gameOver();
            return;
        }
        updateStats();
    }

    // Render Choices
    ui.choices.innerHTML = '';
    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.classList.add('choice-btn');
        
        // Logic Check: Required Item
        if (choice.requiredItem) {
            const hasItem = state.inventory.includes(choice.requiredItem);
            if (!hasItem) {
                btn.innerText = `[Cần ${choice.requiredItem}] ${choice.text}`;
                btn.disabled = true;
            } else {
                btn.innerText = choice.text;
                btn.onclick = () => selectChoice(choice);
            }
        } else {
            btn.innerText = choice.text;
            btn.onclick = () => selectChoice(choice);
        }
        
        ui.choices.appendChild(btn);
    });
}

function selectChoice(choice) {
    // Reward Logic
    if (choice.reward && !state.inventory.includes(choice.reward)) {
        state.inventory.push(choice.reward);
        updateStats();
    }

    // Navigate
    if (choice.nextScene) {
        showScene(choice.nextScene);
    }
}

function gameOver() {
    ui.text.innerText = "BẠN ĐÃ CHẾT VÌ KIỆT SỨC...";
    ui.choices.innerHTML = '<button class="choice-btn" onclick="startGame()">Chơi lại</button>';
}

// Start Game
startGame();
