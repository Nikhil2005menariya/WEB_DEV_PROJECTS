const bx = Array.from(document.querySelectorAll(".boxes")); 
console.log(bx[2]);

const rows = 3; 
const cols = 3; 
let boxes = [];
let play = [];

// Initialize play array correctly
for (let i = 0; i < rows; i++) {
    let arr=[];
    for(let j=0;j<3;j++){
        arr.push(0);
    }
    play.push(arr);
}

// Convert NodeList to a 2D array
for (let i = 0; i < rows; i++) {
    boxes.push(bx.slice(i * cols, (i + 1) * cols));
}
console.log(boxes);
let p1 = true; // Player 1's turn
let gameOver = false; // To stop the game after a win

function checkWin(i, k) {
    let player = play[i][k];

    // Check row
    if (play[i][0] === player && play[i][1] === player && play[i][2] === player) {
        console.log(`Player ${player} wins (Row ${i})`);
        return player;
    }

    // Check column
    if (play[0][k] === player && play[1][k] === player && play[2][k] === player) {
        console.log(`Player ${player} wins (Column ${k})`);
        return player;
    }

    // Check main diagonal (↘)
    if (i === k && play[0][0] === player && play[1][1] === player && play[2][2] === player) {
        console.log(`Player ${player} wins (Main Diagonal)`);
        return player;
    }

    // Check anti-diagonal (↙)
    if (i + k === 2 && play[0][2] === player && play[1][1] === player && play[2][0] === player) {
        console.log(`Player ${player} wins (Anti-Diagonal)`);
        return player;
    }

    return 0;
}

function checkTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (play[i][j] === 0) {
                return false; // There is an empty space, so it's not a tie
            }
        }
    }
    console.log("Game is a Tie!");
    return true;
}
function removelisterners(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let box= boxes[i][j];
            box.removeEventListener("click", handleClick);
            box.removeEventListener("mouseenter", handleMouseEnter);
            box.removeEventListener("mouseleave", handleMouseLeave);
            box.style.backgroundColor = ""; // Reset hover effect
        }
    }
}
function createSVG(type) {
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "play");
    svg.setAttribute("viewBox", "0 0 384 512");
    svg.setAttribute("xmlns", svgNS);

    let path = document.createElementNS(svgNS, "path");
    path.setAttribute("stroke", "white");
    path.setAttribute("fill", "white");

    if (type === "X") {
        // X SVG Path (tic)
        svg.setAttribute("id","tic");
        path.setAttribute(
            "d",
            "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        );
        
    } else if (type === "O") {
        // O SVG Path (tak)
        svg.setAttribute("id","tak");
        path.setAttribute(
            "d",
            "M192 32C85.96 32 0 117.96 0 224s85.96 192 192 192 192-85.96 192-192S298.04 32 192 32zm0 336c-79.41 0-144-64.59-144-144S112.59 80 192 80s144 64.59 144 144-64.59 144-144 144z"
        );
    }

    svg.appendChild(path);
    return svg;
}
function switchPlayer() {
    let player1 = document.querySelector(".player1");
    let player2 = document.querySelector(".player2");

    if (p1) {
        player1.classList.add("active");
        player2.classList.remove("active");
    } else {
        player2.classList.add("active");
        player1.classList.remove("active");
    }
}



let game=document.querySelector(".heading");
console.log(game);
let gameover=false;
let player=document.querySelector(".player2");
player.style.color="#f3f3f3";
switchPlayer();
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let box = boxes[i][j];

        if (box) {  
            let previous_color = box.style.backgroundColor;

            function handleClick() {
                if (gameOver || play[i][j] !== 0) return; 
            
                let newSVG = p1 ? createSVG("X") : createSVG("O");
            
                box.appendChild(newSVG);
                play[i][j] = p1 ? 1 : 2; 
            
                let winner = checkWin(i, j);
                if (winner) {
                    
                    gameOver = true;
                    if (gameOver) {
                        game.textContent = `Player ${winner} Won !!`;
                    }
                    
                    
                    removelisterners();
                    return;
                }
                
                if (checkTie()) {
                    gameOver = true;
                    if (gameOver) {
                        console.log("over");
                        game.textContent = `Tie !!`;
                    }
                    removelisterners();
                    return;
                }
            
                p1 = !p1; // Switch turn
                switchPlayer();
                if(p1){
                     player=document.querySelector(".player2");
                    player.style.color="#f3f3f3";
                     pla=document.querySelector(".player1");
                    pla.style.color="";
                }
                else{
                     player=document.querySelector(".player1");
                    player.style.color="#f3f3f3";
                     pla=document.querySelector(".player2");
                    pla.style.color="";

                }
            
                // Remove event listeners after the box is clicked
                box.removeEventListener("click", handleClick);
                box.removeEventListener("mouseenter", handleMouseEnter);
                box.removeEventListener("mouseleave", handleMouseLeave);
                box.style.backgroundColor = previous_color;
            }
            
            function handleMouseEnter() {
                if (gameOver) return; // Prevent hover effect if game is over
                box.style.backgroundColor = "#ac36c9";
            }
            
            function handleMouseLeave() {
                if (gameOver) return; // Prevent hover effect if game is over
                box.style.backgroundColor = previous_color;
            }
            

            // Attach event listeners
            box.addEventListener("click", handleClick);
            box.addEventListener("mouseenter", handleMouseEnter);
            box.addEventListener("mouseleave", handleMouseLeave);
        }
    }
}
