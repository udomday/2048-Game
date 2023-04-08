function gameStart(array){
    newNumberOnBoard(array)
    newNumberOnBoard(array)
    printArrayOnBoard(array)
}

function newNumberOnBoard(array){
    let emptyArray = getEmptyList(array)
    shuffle(emptyArray)
    let random_num = emptyArray.pop()
    let x = getIndexFromNumber(random_num)[0]
    let y = getIndexFromNumber(random_num)[1]
    array = insert_2_or_4(array, x, y)
    console.log(`Мы заполнили ячейку под номером ${random_num}`)
    printArray(array)
}

function printArray(array){
    console.log('---------------')
    array.forEach(el => {
        console.log(...el)
    });
    console.log('---------------')
}

function printArrayOnBoard(array){
    const tileConteiner = document.querySelector(".tile-conteiner")
    tileConteiner.innerHTML = ''
    for(let x = 0; x < array.length; x++){
        for(let y = 0; y < array[x].length; y++){
            if(array[x][y] != 0){
                tileConteiner.innerHTML += `<div class="tile tile-${array[x][y]} tile-position-${x+1}-${y+1}"><div class="tile-inner">${array[x][y]}</div></div>`
            }
        }
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

function getNumberFromIndex(i, j){
    return i*4+j+1
}

function getIndexFromNumber(num){
    num -= 1
    let x = Math.floor(num/4)
    let y = Math.floor(num%4)
    return [x, y]
}

function insert_2_or_4(array, x, y){
    if(Math.random() <= 0.75){
        array[x][y] = 2
    } else{
        array[x][y] = 4
    }
    return array
}

function getEmptyList(array){
    let emptyArray = []
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array[i].length; j++){
            if(array[i][j] == 0){
                let num = getNumberFromIndex(i, j)
                emptyArray.push(num)
            }
        }
    }
    return emptyArray
}

function isZeroInMas(array){
    for(let i = 0; i < array.length; i++){
        if(array[i].includes(0)){
            return true
        }
    }
    return false
}

function moveLeft(array){
    let delta = 0
    array = array.map(row => {
        while(row.includes(0)){
            row = row.filter(function(elem) {
                return elem != 0;
            })
        }
        while(row.length != 4){
            row.push(0)
        }
        return row
    })
    for(let i = 0; i < 4; i++){
       
        for(let j = 0; j < 3; j++){
            if(array[i][j] === array[i][j+1] && array[i][j] != 0){
                array[i][j] = array[i][j]*2
                delta = array[i][j]
                array[i].splice(j+1, 1)
                array[i].push(0)
            }
       }
    }
    return [array, delta]
}

function moveRight(array){
    let delta = 0
    array = array.map(row => {
        while(row.includes(0)){
            row = row.filter(function(elem) {
                return elem != 0;
            })
        }
        while(row.length != 4){
            row.unshift(0)
        }
        return row
    })
    for(let i = 0; i < 4; i++){
       
        for(let j = 3; j > 0; j--){
            if(array[i][j] === array[i][j-1] && array[i][j] != 0){
                array[i][j] = array[i][j]*2
                delta = array[i][j]
                array[i].splice(j-1, 1)
                array[i].unshift(0)
            }
       }
    }
    return [array, delta]
}

function moveUp(array){
    let delta = 0
    for(let j = 0; j < 4; j++){
        let column = []
        for(let i = 0; i < 4; i++){
            if(array[i][j]!=0){
                column.push(array[i][j])
            }
        }
        while(column.length != 4){
            column.push(0)
        }
        for(let i = 0; i < 3; i++){
            if(column[i]==column[i+1] && column[i]!=0){
                column[i]*=2
                delta = column[i]
                column.splice(i+1, 1)
                column.push(0)
            }
        }
        for(let i = 0; i < 4; i++){
            array[i][j] = column[i]
        }
    }
    return [array, delta]
}

function moveDown(array){
    let delta = 0
    for(let j = 0; j < 4; j++){
        let column = []
        for(let i = 0; i < 4; i++){
            if(array[i][j]!=0){
                column.push(array[i][j])
            }
        }
        while(column.length != 4){
            column.unshift(0)
        }
        for(let i = 4; i > 0; i--){
            if(column[i]==column[i-1] && column[i]!=0){
                column[i]*=2
                delta = column[i]
                column.splice(i-1, 1)
                column.unshift(0)
            }
        }
        for(let i = 0; i < 4; i++){
            array[i][j] = column[i]
        }
    }
    return [array, delta]
}

function canMove(array){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            console.log(i,j)
            console.log(array)
            if(i == 3){
               if(j != 3){
                if(array[i][j]==array[i][j+1]){
                    return true
                }
               } else {
                return false
               }
            } else{
                if(j == 3 && array[i][j]==array[i+1][j]){
                    return true
                }
                else if(array[i][j]==array[i][j+1] || array[i][j]==array[i+1][j]){
                    return true
                }
            }
        }
    }
    return false
}

//export {printArray, shuffle, getNumberFromIndex, getIndexFromNumber, insert_2_or_4, getEmptyList, isZeroInMas, gameStart, newNumberOnBoard, moveLeft, printArrayOnBoard, moveRight, moveUp, moveDown, canMove}

