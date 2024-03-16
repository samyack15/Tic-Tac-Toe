let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector( "#newGame" );
let msgContainer = document.querySelector(".msg-container") ; 
let msg = document.querySelector("#msg");

let turnO = true;    //playerX, playerO

const winPatterns = [
    [ 0, 1, 2 ],
    [ 0, 3, 6 ],
    [ 0, 4, 8 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 2, 4, 6 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ]
];




const resetGame = () => {
    turnO =true;
    enableBtns();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            //PlayerO
            box.innerText = "0";
            turnO = false;
        }
        else{
            //PlayerX
            box.innerText = "X";
            turnO =true;
        }
        box.disabled = true;
        
        checkWinner();
        checkTie();
    });
});

const disableBtns = () => {
    for(let box of boxes){
        box.disabled = true; 
    }
};
const enableBtns = () => {
    for(let box of boxes){
        box.disabled = false; 
        box.innerText = "";
    }
};

//--------------------------------- confetti ----------------

const triggerConfetti = () => {

    const duration = 5 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);


    console.log("confetti");
}; 
//----------------------------------confetti Ends ---------------
const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} wins!` ;
    msgContainer.classList.remove( "hide" );
    disableBtns();
    resetBtn.classList.add("hide");
    triggerConfetti();
};
const showTie = () => {
    msg.innerText = `It was a TIE! ` ;
    msgContainer.classList.remove( "hide" );
    disableBtns();
    resetBtn.classList.add("hide");
};

const checkTie = () => {
    let count = 0;
    for (let i of boxes) {
        if (i.innerText != ""){
            count++;
        }
    }
    if (count  == 9) {
        showTie();
    };
};


const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if ( pos1Val != "" && pos2Val != "" && pos3Val != "" ){
            if (pos1Val == pos2Val && pos2Val == pos3Val){

                showWinner(pos1Val);
            }
            
        }
    }

};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);