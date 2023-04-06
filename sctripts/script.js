import {printArray, shuffle, getNumberFromIndex, getIndexFromNumber, insert_2_or_4, getEmptyList, isZeroInMas,} from './gameController.js'


let tileArray = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
];

tileArray[1][2] = 2
tileArray[3][0] = 4
console.log(getIndexFromNumber(13))
console.log(getEmptyList(tileArray))
printArray(tileArray)

document.addEventListener("keydown", function(event){
    if(isZeroInMas(tileArray)){
        if(event.code == 'ArrowDown'){
            let emptyArray = getEmptyList(tileArray)
            shuffle(emptyArray)
            let random_num = emptyArray.pop()
            let x = getIndexFromNumber(random_num)[0]
            let y = getIndexFromNumber(random_num)[1]
            tileArray = insert_2_or_4(tileArray, x, y)
            console.log(`Мы заполнили ячейку под номером ${random_num}`)
            printArray(tileArray)
        }
    }else{
        console.log("Game Over")
    }
});


// const tileConteiner = document.querySelector(".tile-conteiner");

// function getRandomInRange(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

/*function gameStart(){
    if(getRandomInRange(0,1) == 1){
        let numPool = [2, 4];
        let numRand = numPool[Math.floor(Math.random() * numPool.length)];
        var x = getRandomInRange(1, 4);
        var y = getRandomInRange(1, 4);
        tileConteiner.innerHTML += `<div class="tile tile-${numRand} tile-position-${x}-${y}"><div class="tile-inner">${numRand}</div></div>`;
        tileArray[x-1][y-1] = {'x': x, 'y': y, 'num':numRand,'tile': `tile-position-${x}-${y}`}
    }else{
        let i = 2
        while(i > 0){
            let numPool = [2, 4];
            let numRand = numPool[Math.floor(Math.random() * numPool.length)];
            var x = getRandomInRange(1, 4);
            var y = getRandomInRange(1, 4);
            if(tileArray[x-1][y-1].length == 0){
                tileConteiner.innerHTML += `<div class="tile tile-${numRand} tile-position-${x}-${y}"><div class="tile-inner">${numRand}</div></div>`;
                tileArray[x-1][y-1] = {'x': x, 'y': y,'num':numRand, 'tile': `tile-position-${x}-${y}`}
                i-- 
            }
        }
    }
}
gameStart()*/

// function test(){
//     //tileArray[3][0] = {'y': 4, 'x': 1,'num':2, 'tile': `tile-position-${4}-${1}`}
//     tileArray[2][0] = {'y': 3, 'x': 1,'num':2, 'tile': `tile-position-${3}-${1}`}
//     //tileConteiner.innerHTML += `<div class="tile tile-2 tile-position-4-1"><div class="tile-inner">2</div></div>`;
//     tileConteiner.innerHTML += `<div class="tile tile-2 tile-position-3-1"><div class="tile-inner">2</div></div>`;
// }

// test()
// console.log(tileArray)
// document.addEventListener("keydown", function(event){
//     if(event.code == 'ArrowDown'){
//         for(let y = 0; y < tileArray.length; y++){
//             for(let x = 0; x < tileArray[y].length; y++){
//                 if(tileArray[y][x].length != 0 && y != 3){
//                     if(tileArray[y+1][x].length != 0){

//                     } 
//                 }
//             }
//         }
//     }
// });

// if(tileArray[y][0].length != 0){
//     if(tileArray[y][0].length == 0){
//         console.log('down')
//     }
//     else{
//         if(tileArray[y][0].num != tileArray[y+1][0].num){
//             continue
//         }
//         else{
//             let tile = document.querySelector(`.${tileArray[y][0].tile}`)
//             tile.classList.remove(`${tileArray[y][0].tile}`, `.tile-${tileArray[y][0].num}`)
//             tile.classList.add(`tile-position-${tileArray[y][0].y + 1}-${tileArray[y][0].x}`)
//             document.querySelector(`.${tileArray[y+1][0].tile}`).remove()
            
//         }
//     }
// } 