let tileArray = [[[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []]];
const tileConteiner = document.querySelector(".tile-conteiner");

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function test(){
    tileArray[3][0] = {'x': 3, 'y': 3,'num':2, 'tile': `tile-position-${4}-${1}`}
    tileArray[2][0] = {'x': 3, 'y': 3,'num':2, 'tile': `tile-position-${3}-${1}`}
    tileConteiner.innerHTML += `<div class="tile tile-2 tile-position-4-1"><div class="tile-inner">2</div></div>`;
    tileConteiner.innerHTML += `<div class="tile tile-2 tile-position-3-1"><div class="tile-inner">2</div></div>`;
}

test()
console.log(tileArray)
document.addEventListener("keydown", function(event){
    if(event.code == 'ArrowDown'){
        for(let x = 0; x > tileArray.length; x++){
            if(tileArray[x][2].length != 0){
                if(tileArray[x][3].length != 0 && tileArray[y][3].num != tileArray[y][2].num){
                    continue
                }
                else{
                    
                }
            }   
        }
    }
});