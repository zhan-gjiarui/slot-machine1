document.addEventListener('DOMContentLoaded', function() {
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');
    const spinButton = document.getElementById('spinButton');
    const playCountDiv = document.getElementById('play-count');
    const resetButton = document.getElementById('resetButton');
    const winMessage = document.getElementById('win-message');

    // 每次重新整理都重置遊玩次數
    localStorage.setItem('playCount', 0);
    let playCount = 0;
    playCountDiv.textContent = `遊玩次數: ${playCount}`;

    // 三種水果
    const symbols = ['🍎', '🍌', '🍇'];

    // 遊戲狀態
    let gameActive = true;

    function spin() {
        if (!gameActive) return; // 遊戲未激活時，直接返回

        spinButton.disabled = true; // 禁用按鈕
        spinButton.textContent = "轉動中...";
        winMessage.classList.remove('show'); // 隱藏獲勝訊息

        reel1.classList.add('spinning');
        reel2.classList.add('spinning');
        reel3.classList.add('spinning');

        setTimeout(() => {
            reel1.classList.remove('spinning');
            reel2.classList.remove('spinning');
            reel3.classList.remove('spinning');

            const result1 = symbols[Math.floor(Math.random() * symbols.length)];
            const result2 = symbols[Math.floor(Math.random() * symbols.length)];
            const result3 = symbols[Math.floor(Math.random() * symbols.length)];

            reel1.textContent = result1;
            reel2.textContent = result2;
            reel3.textContent = result3;

            playCount++;
            localStorage.setItem('playCount', playCount);
            playCountDiv.textContent = `遊玩次數: ${playCount}`;

            // 判斷是否獲勝
            const win = result1 === result2 && result2 === result3;

            if (win) {
                winMessage.classList.add('show');
                spinButton.textContent = "恭喜過關!";
                gameActive = false; // 獲勝後，停用遊戲
            } else {
                spinButton.textContent = "再試一次";
                spinButton.disabled = false;
            }

        }, 2000);
    }

    spinButton.addEventListener('click', spin);

    resetButton.addEventListener('click', () => {
        localStorage.setItem('playCount', 0);
        playCount = 0;
        playCountDiv.textContent = `遊玩次數: ${playCount}`;
        spinButton.textContent = "開始轉動";
        spinButton.disabled = false;
        winMessage.classList.remove('show');
        gameActive = true; // 重新挑戰時，啟用遊戲
    });

    // 動態生成漂浮圖片
    const floatingImagesContainer = document.createElement('div');
    floatingImagesContainer.id = 'floating-images-container';
    document.body.appendChild(floatingImagesContainer);

    const numberOfImages = 20;
    const imagePath = 'image/LiyuChillGuy(W).svg';

    for (let i = 0; i < numberOfImages; i++) {
        const img = document.createElement('img');
        img.src = imagePath;
        img.classList.add('floating-image');

        const gridX = Math.floor(i % 5);
        const gridY = Math.floor(i / 5);
        const gridSize = 100 / 5;

        const randomOffset = gridSize * 0.2;
        const offsetX = -randomOffset + Math.random() * randomOffset * 2;
        const offsetY = -randomOffset + Math.random() * randomOffset * 2;

        img.style.top = `${gridSize * gridY + offsetY}%`;
        img.style.left = `${gridSize * gridX + offsetX}%`;

        const size = 70 + Math.random() * 100;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;

        img.style.animationDelay = `${Math.random() * 10}s`;

        floatingImagesContainer.appendChild(img);
    }
});