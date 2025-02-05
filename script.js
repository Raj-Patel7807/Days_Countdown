const grid = document.querySelector(".grid");
const totalDays = 1096;
let checkedDays = JSON.parse(localStorage.getItem("checkedDays")) || new Array(totalDays).fill(false);

let targetDate = localStorage.getItem("targetDate");

if (!targetDate) {
    targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 3);
    localStorage.setItem("targetDate", targetDate);
} else {
    targetDate = new Date(targetDate);
}

const updateCountdown = () => {
    const now = new Date();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.querySelector(".countdown").innerHTML = `${days} : ${hours} : ${minutes} : ${seconds}`;

    if (timeLeft < 0) {
        clearInterval(timer);
        document.querySelector(".countdown").innerHTML = "Time's up!";
    }
};

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

for (let i = 0; i < totalDays; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    if (checkedDays[i]) box.classList.add("checked");

    box.addEventListener("click", () => {
        checkedDays[i] = !checkedDays[i];
        box.classList.toggle("checked");
        localStorage.setItem("checkedDays", JSON.stringify(checkedDays));
    });

    grid.appendChild(box);
}
