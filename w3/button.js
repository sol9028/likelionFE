let count = 0;

function increase() {
    count++;
    document.getElementById("mangbear").src = "증가망곰이.png";
    document.getElementById("counter").innerText = count;
}

function decrease() {
    count--;
    document.getElementById("mangbear").src = "감소망곰이.png";
    document.getElementById("counter").innerText = count;
}

function reset() {
    count = 0;
    document.getElementById("mangbear").src = "시작망곰이.png";
    document.getElementById("counter").innerText = count;
}