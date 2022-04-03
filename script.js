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

let pause = false;

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("info"))
        popUp.classList.toggle("popup-opened");
    if (event.target.classList.contains("color"))
        colored()
    if (event.target.classList.contains("session-next"))
        sessionNext();
    if (event.target.classList.contains("session-prev"))
        sessionPrev();
    if (event.target.classList.contains("break-next"))
        breakNext();
    if (event.target.classList.contains("break-prev"))
        breakPrev();
    if (event.target.classList.contains("start-btn"))
        document.querySelector(".start-btn").disabled = true,
        navContainer.classList.add("nav-container-visible"),
        inputsContainer.classList.add("inputs-container-visible"),
        timer(),
        pauseBtn.addEventListener("click", () => {
            if (!pause) {
                pause = true;
            } else {
                pause = false;
            }
        }),
        document.querySelector(".start-btn").disabled = true,
        pauseBtn.classList.add("pause-visible");
    if (event.target.classList.contains("reset-btn"))
        reset();

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
                            reset(),
                            time.innerHTML = `${"00"}:${"00"}`;
                    }
                }, 10);
        }
    }, 10);
};

//reset

function reset() {
    inputsContainer.classList.remove("inputs-container-visible");
    navContainer.classList.remove("nav-container-visible");
    title.textContent = "session";
    document.querySelector(".start-btn").disabled = false;
    pauseBtn.classList.remove("pause-visible");
    clearInterval(sessionInterval);
    time.innerHTML = `${sessionInput.textContent}:${"00"}`;
    clearInterval(breakInterval);
    let pause = false;
}

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
}