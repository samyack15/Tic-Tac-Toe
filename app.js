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

const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} wins!` ;
    msgContainer.classList.remove( "hide" );
    disableBtns();
    resetBtn.classList.add("hide");
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