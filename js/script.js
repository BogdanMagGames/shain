document.addEventListener('DOMContentLoaded', (event) => {
    const gameBtn = document.getElementById('game-btn');
    const resetBtn = document.getElementById('reset-btn');
    const upgradeBtn = document.getElementById('upgrade-btn');
    const scoreDisplay = document.getElementById('score');
    const profitDisplay = document.getElementById('profit-per-click');

    let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
    let upgradeCost = localStorage.getItem('upgradeCost') ? parseInt(localStorage.getItem('upgradeCost')) : 100;
    let profitPerClick = localStorage.getItem('profitPerClick') ? parseInt(localStorage.getItem('profitPerClick')) : 1;

    scoreDisplay.textContent = `Score: ${score}`;
    upgradeBtn.textContent = `Upgrade ${upgradeCost}`;
    profitDisplay.textContent = `Прибыль за клик: ${profitPerClick}`;

    function getRandomPosition() {
        const container = document.querySelector('.container');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const buttonWidth = gameBtn.offsetWidth;
        const buttonHeight = gameBtn.offsetHeight;

        const maxX = containerWidth - buttonWidth;
        const maxY = containerHeight - buttonHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        return { x: randomX, y: randomY };
    }

    function moveButton() {
        const { x, y } = getRandomPosition();
        gameBtn.style.left = `${x}px`;
        gameBtn.style.top = `${y}px`;
    }

    gameBtn.addEventListener('click', () => {
        score += profitPerClick;
        scoreDisplay.textContent = `Score: ${score}`;
        localStorage.setItem('score', score);
        moveButton();
    });

    resetBtn.addEventListener('click', () => {
        score = 0;
        profitPerClick = 1;
        upgradeCost = 100;
        scoreDisplay.textContent = `Score: ${score}`;
        profitDisplay.textContent = `Прибыль за клик: ${profitPerClick}`;
        upgradeBtn.textContent = `Upgrade ${upgradeCost}`;
        localStorage.setItem('score', score);
        localStorage.setItem('profitPerClick', profitPerClick);
        localStorage.setItem('upgradeCost', upgradeCost);
        moveButton();
    });

    upgradeBtn.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            profitPerClick *= 2;
            upgradeCost *= 2;
            scoreDisplay.textContent = `Score: ${score}`;
            profitDisplay.textContent = `Прибыль за клик: ${profitPerClick}`;
            upgradeBtn.textContent = `Upgrade ${upgradeCost}`;
            localStorage.setItem('score', score);
            localStorage.setItem('profitPerClick', profitPerClick);
            localStorage.setItem('upgradeCost', upgradeCost);
        }
    });

    moveButton(); // Initial position
});
