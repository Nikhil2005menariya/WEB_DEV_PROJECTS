let rock = document.querySelector(".rock");
let paper = document.querySelector(".paper");
let scissor = document.querySelector(".scissor");
let comment = document.querySelector(".comment");

function whowon(i) {
    let myscore = parseInt(document.querySelector(".myscore").textContent, 10);
    let compscore = parseInt(document.querySelector(".compscore").textContent, 10);
    let comp = Math.floor(Math.random() * 3); 

    if (i === "rock") {
        if (comp === 0) {
            comment.textContent = "Tie!!";
        } else if (comp === 1) {
            comment.textContent = "Computer Won!!";
            document.querySelector(".compscore").textContent = compscore + 1;
        } else {
            comment.textContent = "You Won!!";
            document.querySelector(".myscore").textContent = myscore + 1;
        }
    }

    if (i === "paper") {
        if (comp === 0) {
            comment.textContent = "You Won!!";
            document.querySelector(".myscore").textContent = myscore + 1;
        } else if (comp === 1) {
            comment.textContent = "Tie!!";
        } else {
            comment.textContent = "Computer Won!!";
            document.querySelector(".compscore").textContent = compscore + 1;
        }
    }

    if (i === "scissor") {
        if (comp === 0) {
            comment.textContent = "Computer Won!!";
            document.querySelector(".compscore").textContent = compscore + 1;
        } else if (comp === 1) {
            comment.textContent = "You Won!!";
            document.querySelector(".myscore").textContent = myscore + 1;
        } else {
            comment.textContent = "Tie!!";
        }
    }
}

rock.addEventListener("click", () => whowon("rock"));
paper.addEventListener("click", () => whowon("paper"));
scissor.addEventListener("click", () => whowon("scissor"));
