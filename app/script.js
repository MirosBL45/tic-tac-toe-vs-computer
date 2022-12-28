var empty = 0, player = 45, computer = -45;

//make a board and create an array with 3 arrays that will store information about who played where and what they have played
function startGame() {
    var field = [];
    var table = document.querySelector('#table');
    for (let i = 0; i < 3; i++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        var row = [];
        field.push(row);
        for (let j = 0; j < 3; j++) {
            var td = document.createElement('td');
            td.classList.add('tile');

            //add click event on each field of the board
            td.onclick = playerMove(field, j, i);
            tr.appendChild(td);
            row.push({
                value: empty,
                element: td
            });
        }
    }
}

//defines what goes in the field, X or O 
function move(field, j, i, who) {
    var event = field[i][j];
    if (event.value != empty) {
        //show and close taken field message if user select used field
        let takenFieldEl = document.querySelector('.takenField');
        takenFieldEl.style.display = 'block';
        const closeEl4 = document.querySelector('#closeModal4');
        closeEl4.addEventListener('click', () => {
            takenFieldEl.style.display = 'none';
        });
        return false;
    }
    event.value = who;
    //player is 1, so if who == 1 then put X, otherwise put O
    event.element.innerHTML = who == player ? 'X' : 'O';
    return true;
}

function playerMove(field, j, i) {
    return () => {
        //if move is true, it means at point after that field is taken, just do return, because no one can select that field, either player or computer
        if (!move(field, j, i, player)) return;
        wins(field, player) ? endGame('You Won!') : computerMove(field);
    }
}

//checks which fields are filled and which player filled them
function wins(field, playerCheck) {
    function lineWines(x, y, dx, dy) {
        //store values of fields and then compare them
        var q = field[y][x].value, w = field[y + dy][x + dx].value, e = field[y + 2 * dy][x + 2 * dx].value;
        return q == w && w == e && q == playerCheck;
    }
    for (let i = 0; i < 3; i++) {
        //checks straight lines through the board
        if (lineWines(0, i, 1, 0) || lineWines(i, 0, 0, 1)) return true;
    }
    // checks diagonally across the board
    return lineWines(0, 0, 1, 1) || lineWines(2, 0, -1, 1);
}

function endGame(text) {
    //pass text from other functions to these paragraphs in divs
    setTimeout(() => {
        //select tieGame div and append message to it
        let tieGameEl = document.querySelector('.tieGame');
        const message = document.createElement('p');
        message.innerText = text;
        tieGameEl.appendChild(message);

        //show and close tie message
        tieGameEl.style.display = 'block';
        const closeEl2 = document.querySelector('#closeModal2');
        closeEl2.addEventListener('click', () => {
            tieGameEl.style.display = 'none';
        });

        //show reload button
        document.querySelector('#reload').style.display = 'inline-block';

        //change click event for each tile after end game
        let tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile) => {
            tile.onclick = () => {
                //show and close game over message
                let gameOverEl = document.querySelector('.gameOver');
                gameOverEl.style.display = 'block';
                const closeEl3 = document.querySelector('#closeModal3');
                closeEl3.addEventListener('click', () => {
                    gameOverEl.style.display = 'none'
                });
            };
        });
    }, 200);
}

function validMoves(field) {
    var moves = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            //if that field is empty, add the coordinates object to the array moves. So here is taking just empty fields
            field[i][j].value == empty && moves.push({
                j: j,
                i: i
            });
        }
    }
    return moves;
}

function findRandomMove(field) {
    var moves = validMoves(field);
    if (moves.length == 0) return null;
    //integer number between 0 an 1 multiplied by length of moves array
    return moves[Math.floor(Math.random() * moves.length)];
}

function computerMove(field) {
    var moveComp = findRandomMove(field);
    //board is full and no one has 3 in a row, column or diagonally
    if (!moveComp) {
        endGame('No winner this time!');
        return;
    }
    //if moveComp exists from findRandomMove (it means if there are empty filds in the board) do these functions
    move(field, moveComp.j, moveComp.i, computer);
    wins(field, computer) && endGame('Computer won!');
}

startGame();

//show and close rules
const rulesEl = document.querySelector('.rulesModal');
const closeEl = document.querySelector('#closeModal');
const showEl = document.querySelector('#rules');

closeEl.addEventListener('click', () => {
    rulesEl.style.display = 'none'
})


showEl.addEventListener('click', () => {
    rulesEl.style.display = 'block'
})