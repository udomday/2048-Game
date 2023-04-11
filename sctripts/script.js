//import {printArray, shuffle, getNumberFromIndex, getIndexFromNumber, insert_2_or_4, getEmptyList, isZeroInMas, gameStart, newNumberOnBoard, moveLeft, printArrayOnBoard, moveRight, moveUp, moveDown, canMove} from './gameController.js'


let tileArray = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
];

let score = 0;

const scoreBar = document.querySelector('.score-bar')

gameStart(tileArray)

function deleteTiles(){
    let deleteTile = document.querySelectorAll('.deleteTile')
        deleteTile.forEach(el => {
            el.remove()
        })
}

document.addEventListener("keydown", function(event){
    if(isZeroInMas(tileArray) || canMove(tileArray)){
        var canMoveArray = structuredClone(tileArray)
        switch(event.code){
            case 'ArrowLeft':
                let arrayMoveLeft = moveLeft(tileArray, canMoveArray)
                tileArray = arrayMoveLeft[0]
                score += arrayMoveLeft[1]
                scoreBar.innerHTML = `Счет: ${score}`
                //if(isZeroInMas(array) && !arraysEqual(array, canMoveArray)){newNumberOnBoard(array)}
                //printArrayOnBoard(tileArray)
                setTimeout(deleteTiles, 310);
                break
            case 'ArrowRight':
                let arrayMoveRigth = moveRight(tileArray, canMoveArray)
                tileArray = arrayMoveRigth[0]
                score += arrayMoveRigth[1]
                scoreBar.innerHTML = `Счет: ${score}`
                //printArrayOnBoard(tileArray)
                setTimeout(deleteTiles, 310);
                break
            case 'ArrowUp':
                let arrayMoveUp = moveUp(tileArray, canMoveArray)
                tileArray = arrayMoveUp[0]
                score += arrayMoveUp[1]
                scoreBar.innerHTML = `Счет: ${score}`
                //printArrayOnBoard(tileArray)
                break
            case 'ArrowDown':
                let arrayMoveDown = moveDown(tileArray, canMoveArray)
                tileArray = arrayMoveDown[0]
                score += arrayMoveDown[1]
                scoreBar.innerHTML = `Счет: ${score}`
                //printArrayOnBoard(tileArray)
                break    

        }
        
    }else{
        console.log("Game Over")
    }
});