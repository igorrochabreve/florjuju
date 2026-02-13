// ========================================
// CONFIGURAÇÕES GLOBAIS
// ========================================

const MAX_STAGE = 10;
let currentStage = 0;

// ========================================
// ELEMENTOS DOM
// ========================================

const scene = document.getElementById('scene');
const flowerContainer = document.getElementById('flowerContainer');
const stageCounter = document.getElementById('stageCounter');
const resetBtn = document.getElementById('resetBtn');
const hint = document.getElementById('hint');
const loveMessage = document.getElementById('loveMessage');

// ========================================
// MAPEAMENTO DE CRESCIMENTO POR ESTÁGIO
// ========================================

const stageValues = {
    0: { stem: 20, petal: 0.2, petalRot: 50, leaf: 0.3, leafOp: 0, center: 0.3, centerOp: 0, msg: 0, msgScale: 0.5 },
    1: { stem: 50, petal: 0.35, petalRot: 45, leaf: 0.4, leafOp: 0.3, center: 0.4, centerOp: 0.3, msg: 0, msgScale: 0.5 },
    2: { stem: 80, petal: 0.5, petalRot: 38, leaf: 0.5, leafOp: 0.5, center: 0.5, centerOp: 0.5, msg: 0, msgScale: 0.5 },
    3: { stem: 110, petal: 0.65, petalRot: 30, leaf: 0.65, leafOp: 0.65, center: 0.65, centerOp: 0.7, msg: 0, msgScale: 0.5 },
    4: { stem: 140, petal: 0.75, petalRot: 22, leaf: 0.75, leafOp: 0.8, center: 0.75, centerOp: 0.85, msg: 0, msgScale: 0.5 },
    5: { stem: 170, petal: 0.85, petalRot: 15, leaf: 0.85, leafOp: 0.9, center: 0.85, centerOp: 0.95, msg: 0, msgScale: 0.5 },
    6: { stem: 200, petal: 0.92, petalRot: 10, leaf: 0.92, leafOp: 0.95, center: 0.92, centerOp: 1, msg: 0, msgScale: 0.5 },
    7: { stem: 230, petal: 0.97, petalRot: 5, leaf: 0.97, leafOp: 1, center: 0.97, centerOp: 1, msg: 0, msgScale: 0.5 },
    8: { stem: 260, petal: 1, petalRot: 2, leaf: 1, leafOp: 1, center: 1, centerOp: 1, msg: 0, msgScale: 0.5 },
    9: { stem: 280, petal: 1, petalRot: 0, leaf: 1, leafOp: 1, center: 1, centerOp: 1, msg: 0, msgScale: 0.5 },
    10: { stem: 300, petal: 1, petalRot: 0, leaf: 1, leafOp: 1, center: 1, centerOp: 1, msg: 1, msgScale: 1 }
};

// ========================================
// FUNÇÕES PRINCIPAIS
// ========================================

/**
 * Atualiza as variáveis CSS baseadas no estágio atual
 */
function updateFlowerStage() {
    const values = stageValues[currentStage];
    
    // Atualizar variáveis CSS
    document.documentElement.style.setProperty('--stem-height', `${values.stem}px`);
    document.documentElement.style.setProperty('--petal-scale', values.petal);
    document.documentElement.style.setProperty('--petal-rotation', `${values.petalRot}deg`);
    document.documentElement.style.setProperty('--leaf-scale', values.leaf);
    document.documentElement.style.setProperty('--leaf-opacity', values.leafOp);
    document.documentElement.style.setProperty('--center-scale', values.center);
    document.documentElement.style.setProperty('--center-opacity', values.centerOp);
    document.documentElement.style.setProperty('--message-opacity', values.msg);
    document.documentElement.style.setProperty('--message-scale', values.msgScale);
    
    // Atualizar contador
    updateCounter();
    
    // Esconder dica após primeiro clique
    if (currentStage > 0 && hint) {
        hint.style.opacity = '0';
        hint.style.pointerEvents = 'none';
    }
    
    // Adicionar animação de "pop" suave
    if (currentStage > 0) {
        flowerContainer.style.transform = 'scale(1.05)';
        setTimeout(() => {
            flowerContainer.style.transform = 'scale(1)';
        }, 200);
    }
}

/**
 * Atualiza o texto do contador
 */
function updateCounter() {
    if (stageCounter) {
        const counterText = stageCounter.querySelector('.counter-text strong');
        if (counterText) {
            counterText.textContent = `${currentStage}/${MAX_STAGE}`;
        }
    }
}

/**
 * Avança para o próximo estágio
 */
function growFlower() {
    if (currentStage < MAX_STAGE) {
        currentStage++;
        updateFlowerStage();
        
        // Adicionar efeito sonoro visual (vibração suave)
        if ('vibrate' in navigator && currentStage === MAX_STAGE) {
            navigator.vibrate(200); // Vibrar no estágio final (mobile)
        }
    } else {
        // Já está no máximo, reinicia
        resetFlower();
    }
}

/**
 * Reinicia a flor para o estágio 0
 */
function resetFlower() {
    currentStage = 0;
    updateFlowerStage();
    
    // Mostrar dica novamente
    if (hint) {
        hint.style.opacity = '1';
        hint.style.pointerEvents = 'auto';
    }
    
    // Adicionar feedback visual
    flowerContainer.style.transform = 'scale(0.95)';
    setTimeout(() => {
        flowerContainer.style.transform = 'scale(1)';
    }, 200);
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Clique/Toque na cena para crescer
 */
scene.addEventListener('click', (e) => {
    // Não crescer se clicar no botão reiniciar
    if (e.target.closest('.reset-btn')) {
        return;
    }
    growFlower();
});

/**
 * Botão Reiniciar
 */
resetBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita trigger do clique na cena
    resetFlower();
});

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Inicializa a flor no estágio 0
 */
function init() {
    currentStage = 0;
    updateFlowerStage();
    console.log('🌸 Lírio Mágico inicializado! Clique para crescer.');
}

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// ACESSIBILIDADE: SUPORTE A TECLADO
// ========================================

// Permitir crescimento com Enter ou Espaço
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        // Se o foco estiver no botão, não fazer nada (deixar o botão funcionar)
        if (document.activeElement === resetBtn) {
            return;
        }
        e.preventDefault();
        growFlower();
    }
    
    // Resetar com 'R'
    if (e.key === 'r' || e.key === 'R') {
        resetFlower();
    }
});

// ========================================
// EASTER EGG: ANIMAÇÃO DE BRILHO NO ESTÁGIO FINAL
// ========================================

const observer = new MutationObserver(() => {
    if (currentStage === MAX_STAGE) {
        loveMessage.style.animation = 'sparkle 2s ease-in-out infinite';
    } else {
        loveMessage.style.animation = 'none';
    }
});

// Adicionar keyframe de brilho
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2); }
    }
`;
document.head.appendChild(style);

// Observar mudanças no estágio
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style']
});