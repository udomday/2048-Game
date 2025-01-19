import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.querySelector(".game-bar").style.display = "none"
}

const gobackBttn = document.querySelector("#goback-bttn");
gobackBttn.addEventListener("click", () => {
    window.location = "../../"
});

const gameBoard = document.getElementById('game-board');
const scoreBar = document.getElementById('score');
const grid = new Grid(gameBoard);

const bttnUp = document.querySelector("#bttn-up");
const bttnDown = document.querySelector("#bttn-down");
const bttnLeft = document.querySelector("#bttn-left");
const bttnRight = document.querySelector("#bttn-right");

document.getElementById('restart-game').addEventListener('click', () => restartGame());

function gameStart(){
    grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
    grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
    setUpInputOnce();
}

gameStart();

function setUpInputOnce(){
    window.addEventListener('keydown', handleInput, {once: true});
    bttnUp.addEventListener('click', handleInput, {once: true});
    bttnDown.addEventListener('click', handleInput, {once: true});
    bttnLeft.addEventListener('click', handleInput, {once: true});
    bttnRight.addEventListener('click', handleInput, {once: true});
}

async function handleInput(event) {
    if(event.target.tagName === "DIV"){
        event.key = event.target.getAttribute("direction");
    }

    switch(event.key) {
        case 'ArrowUp':
            if(!canMoveUp()){
                setUpInputOnce();
                return;
            }
            await moveUp();
            break;
        
        case 'ArrowDown':
            if(!canMoveDown()){
                setUpInputOnce();
                return;
            }
            await moveDown();
            break;
        
        case 'ArrowLeft':
            if(!canMoveLeft()){
                setUpInputOnce();
                return;
            }
            await moveLeft();
            break;
        
        case 'ArrowRight':
            if(!canMoveRight()){
                setUpInputOnce();
                return;
            }
            await moveRight();
        break;
        
        default:
            setUpInputOnce();
            return;
    }

    const newTile = new Tile(gameBoard);
    grid.getRandomEmptyCell().linkTile(newTile);

    if(!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()){
        await newTile.waitForAnimationEnd();
        alert('Try again!');
        restartGame();
        return;
    }

    if(winGame()){
        await newTile.waitForAnimationEnd();
        alert('Поздравляем, Вы победили!');
        restartGame();
        return;
    }

    setUpInputOnce();
}

async function moveUp(){
    await slideTiles(grid.cellsGroupedByColumn);
}

async function moveDown(){
    await slideTiles(grid.cellsGroupedByReversedColumn);
}

async function moveLeft(){
    await slideTiles(grid.cellsGroupedByRow);
}

async function moveRight(){
    await slideTiles(grid.cellsGroupedByReversedRow);
}

async function slideTiles(groupedCells){
    const promises = [];
    
    groupedCells.forEach(group => slideTilesInGroup(group, promises));

    await Promise.all(promises);

    grid.cells.forEach(cell => {
        cell.hasTileForMerge() && cell.mergeTiles();
    })
}

function winGame(){
    let flag = false
    grid.cells.forEach(cell => {
        if(!!cell.linkedTile  || !!cell.linkedTileForMerge){
            if(cell.linkedTile.value === 2048){
                flag = true
            };
        }
    });
    return flag
}

function restartGame(){
    grid.cells.forEach(cell => {
        if(!!cell.linkedTile  || !!cell.linkedTileForMerge){
            cell.removeCellsFromBoard();
        }
    });

    gameStart();
}

function slideTilesInGroup(group, promises){
    for(let i = 1; i<group.length; i++){
        if(group[i].isEmpty()){
            continue;
        }
        const cellWithTile = group[i];

        let targetCell;
        let j = i - 1;
        while(j>=0 && group[j].canAccept(cellWithTile.linkedTile)){
            targetCell = group[j];
            j--;
        }

        if(!targetCell){
            continue;
        }

        promises.push(cellWithTile.linkedTile.waitForTransitionEnd());

        if(targetCell.isEmpty()){
            targetCell.linkTile(cellWithTile.linkedTile);
        } else {
            targetCell.linkTileForMerge(cellWithTile.linkedTile);
        }

        cellWithTile.unlinkTile();
    }
}

function canMoveUp(){
    return canMove(grid.cellsGroupedByColumn);
}

function canMoveDown(){
    return canMove(grid.cellsGroupedByReversedColumn);
}

function canMoveLeft(){
    return canMove(grid.cellsGroupedByRow);
}

function canMoveRight(){
    return canMove(grid.cellsGroupedByReversedRow);
}

function canMove(groupedCells){
    return groupedCells.some(group => canMoveInGroup(group));
}

function canMoveInGroup(group){
    return group.some((cell, index) => {

        if(index === 0) {
            return false;
        }

        if(cell.isEmpty()){
            return false;
        }

        const targetCell = group[index - 1];
        return targetCell.canAccept(cell.linkedTile);
    });
}