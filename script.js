const popUp = document.querySelector(".popup");
const popUpOpenBtn = document.querySelector(".icon");
const time = document.querySelector(".time");
const sessionInput = document.querySelector(".session-input");
const breakInput = document.querySelector(".break-input");
const pauseBtn = document.querySelector(".pause");
const title = document.querySelector(".title");
const inputsContainer = document.querySelector(".inputs-container");
const numberInputs = inputsContainer.querySelectorAll(".number-input");
const prevs = inputsContainer.querySelectorAll(".prev");
const nexts = inputsContainer.querySelectorAll(".next");
const timerColored = document.querySelector(".timer");
const navContainer = document.querySelector(".nav-container");
const icons = navContainer.querySelectorAll(".icon");
const main = document.querySelector(".main");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const tomatos = document.querySelector('.tomatos');
const tomato = document.querySelectorAll('.tomato');
let pause = false;

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("info"))
        popUp.classList.toggle("popup-opened");
    if (event.target.classList.contains("color"))
        colored();
    if (event.target.classList.contains("session-next"))
        sessionNext();
    if (event.target.classList.contains("session-prev"))
        sessionPrev();
    if (event.target.classList.contains("break-next"))
        breakNext();
    if (event.target.classList.contains("break-prev"))
        breakPrev();
    if (event.target.classList.contains("start-btn"))
        start();
    if (event.target.classList.contains("reset-btn"))
        reset();
    if (event.target.classList.contains("pause"))
        if (!pause) {
            pause = true;
        } else {
            pause = false;
        };
});

// Arrows

function sessionNext() {
    sessionInput.textContent = Number(sessionInput.textContent) < 45 ? Number(sessionInput.textContent) + 5 :
        Number(sessionInput.textContent);
    time.innerHTML = `${sessionInput.textContent}:${"00"}`;
}

function sessionPrev() {
    sessionInput.textContent = Number(sessionInput.textContent) > 15 ? Number(sessionInput.textContent) - 5 :
        Number(sessionInput.textContent);
    time.innerHTML = `${sessionInput.textContent}:${"00"}`;
}

function breakNext() {
    breakInput.textContent = Number(breakInput.textContent) < 10 ? Number(breakInput.textContent) + 1 :
        Number(breakInput.textContent);
}

function breakPrev() {
    breakInput.textContent = Number(breakInput.textContent) > 3 ? Number(breakInput.textContent) - 1 :
        Number(breakInput.textContent);
}

//timer

function timer() {
    let sessionInputNumber = Number(sessionInput.textContent) * 60;
    let breakInputNumber = Number(breakInput.textContent) * 60;
    sessionInterval = setInterval(function sessionTimer() {
        if (!pause) {
            title.textContent = "session";
            let minutes = Math.floor(sessionInputNumber / 60);
            let seconds = sessionInputNumber % 60;
            seconds = seconds < 10 ? "0" + seconds :
                seconds;
            minutes = minutes < 10 ? "0" + minutes :
                minutes;
            time.innerHTML = `${minutes}:${seconds}`;
            sessionInputNumber--;
            if (sessionInputNumber === 0)
                clearInterval(sessionInterval),
                sound(),
                time.innerHTML = `${"00"}:${"00"}`,
                breakInterval = setInterval(function breakTimer() {
                    if (!pause) {
                        title.textContent = "break";
                        let minutes = Math.floor(breakInputNumber / 60);
                        let seconds = breakInputNumber % 60;
                        seconds = seconds < 10 ? "0" + seconds :
                            seconds;
                        minutes = minutes < 10 ? "0" + minutes :
                            minutes;
                        time.innerHTML = `${minutes}:${seconds}`;
                        breakInputNumber--;
                        if (breakInputNumber === 0)
                            clearInterval(breakInterval),
                            sound(),
                            reset(),
                            time.innerHTML = `${"00"}:${"00"}`;
                    };
                }, 1000);
        };
    }, 1000);
};


//sound

function sound() {
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = "./finish.mp3";
    audio.play();
}

//start

function start() {
    tomatos.classList.add("tomatos-start");
    timer();
    document.querySelector(".start-btn").disabled = true;
    navContainer.classList.add("nav-container-visible");
    inputsContainer.classList.add("inputs-container-visible");
    pauseBtn.classList.add("pause-visible");
    resetBtn.classList.add("reset-btn-pointer");
    startBtn.classList.add("start-btn-pointer");
};

//reset

function reset() {
    pause = false;
    tomatos.classList.remove("tomatos-start");
    resetBtn.classList.remove("reset-btn-pointer");
    startBtn.classList.remove("start-btn-pointer");
    inputsContainer.classList.remove("inputs-container-visible");
    navContainer.classList.remove("nav-container-visible");
    title.textContent = "session";
    document.querySelector(".start-btn").disabled = false;
    pauseBtn.classList.remove("pause-visible");
    clearInterval(sessionInterval);
    time.innerHTML = `${sessionInput.textContent}:${"00"}`;
    clearInterval(breakInterval);
};

//colored

function colored() {
    inputsContainer.classList.toggle("inputs-container-colored");
    numberInputs.forEach((num) => {
        num.classList.toggle("number-input-colored");
    });
    icons.forEach((icon) => {
        icon.classList.toggle("icon-colored");
    });
    prevs.forEach((prev) => {
        prev.classList.toggle("prev-colored");
    });
    nexts.forEach((next) => {
        next.classList.toggle("prev-colored");
    });
    timerColored.classList.toggle("timer-colored");
    navContainer.classList.toggle("nav-container-colored");
    main.classList.toggle("main-colored");
};

//animation

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

function getRndFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1)
};

tomato.forEach(tomatoRain => {
    tomatoRain.style.width = getRndFloat(12, 24) + 'px';
    tomatoRain.style.animationDuration = getRndInteger(10, 20) + 's';
    tomatoRain.style.animationDelay = getRndInteger(-1, tomato.length / 1) + 's';
});