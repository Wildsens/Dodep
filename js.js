document.addEventListener("DOMContentLoaded", () => {
    let wheel = document.querySelector(".circle");
    let spinBtn = document.querySelector("#spin");
    let currentRotation = 0;

    spinBtn.addEventListener("click", () => {
        // 1. Шанс 0.5% (1 з 200)
        let isJackpot = Math.random() < 0.005; 
        
        // 2. Скільки повних обертів зробить (мінімум 5)
        let extraRounds = 1800; 
        let finalAngle = 0;

        if (isJackpot) {
            // Щоб зелений сектор (0-30°) став під стрілку (зверху), 
            // колесо має зупинитися в діапазоні 330-360 градусів або біля 0
            finalAngle = Math.floor(Math.random() * 20) + 340; 
        } else {
            // Будь-який кут, де буде синій колір (від 30 до 330 градусів)
            finalAngle = Math.floor(Math.random() * 300) + 30;
        }

        // 3. Додаємо до попереднього значення, щоб крутилося завжди вперед
        currentRotation += extraRounds + finalAngle;

        // Прибираємо транзишн на мить, якщо треба скинути (але тут не треба)
        wheel.style.transform = `rotate(${currentRotation}deg)`;
        
        // Блокуємо кнопку на час анімації (5 секунд), щоб не "зламати" рух
        spinBtn.style.pointerEvents = "none";
        setTimeout(() => {
            spinBtn.style.pointerEvents = "auto";
            if(isJackpot) alert("🔥 ЛУДОМАНСЬКА УДАЧА! 0.5% ВИПАЛО!");
        }, 5000);
    });
});
