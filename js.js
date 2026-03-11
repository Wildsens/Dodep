document.addEventListener("DOMContentLoaded", () => {
    const wheel = document.querySelector(".circle");
    const spinBtn = document.querySelector("#spin");
    const container = document.querySelector("#message-container");

    let currentRotation = 0;
    let isSpinning = false;

    const winPrizes = ["5 гривень", "Пирожок", "Печиво" ];
    const losePhrases = ["Майже!", "Спробуй ще 🎰", "Казино в плюсі", "Не сьогодні..."];

    spinBtn.addEventListener("click", () => {
        if (isSpinning) return;
        isSpinning = true;

        // случайный угол
        const randomAngle = Math.floor(Math.random() * 360);

        // 10 оборотов + угол
        currentRotation += 3600 + randomAngle;
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        wheel.addEventListener("transitionend", function handler() {

            // считаем угол остановки
            let finalDeg = currentRotation % 360;

            // стрелка сверху → значит нужно инвертировать
            finalDeg = (360 - finalDeg) % 360;

            let isJackpot = finalDeg >= 0 && finalDeg <= 30;

            const newDiv = document.createElement("div");
            newDiv.className = "message " + (isJackpot ? "msg-win" : "msg-lose");

            if (isJackpot) {
                const prize = winPrizes[Math.floor(Math.random() * winPrizes.length)];
                newDiv.innerHTML = "🔥 ТИ ВИГРАВ: " + prize;
            } else {
                const phrase = losePhrases[Math.floor(Math.random() * losePhrases.length)];
                newDiv.innerHTML = "❌ " + phrase;
            }

            container.prepend(newDiv);

            setTimeout(() => {
                newDiv.style.opacity = "0";
                setTimeout(() => newDiv.remove(), 500);
            }, 3000);

            isSpinning = false;
            wheel.removeEventListener("transitionend", handler);

        }, { once: true });
    });

});
