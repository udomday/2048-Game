const tileConteiner = document.querySelector(".tile-conteiner")

function gameStart(array){
    newNumberOnBoard(array)
    newNumberOnBoard(array)
}

function newNumberOnBoard(array){
    let emptyArray = getEmptyList(array)
    shuffle(emptyArray)
    let random_num = emptyArray.pop()
    let x = getIndexFromNumber(random_num)[0]
    let y = getIndexFromNumber(random_num)[1]
    array = insert_2_or_4(array, x, y)
    tileConteiner.insertAdjacentHTML('afterend', `<div class="tile tile-${array[x][y].num} tile-position-${x+1}-${y+1}"><div class="tile-inner">${array[x][y].num}</div></div>`)
    console.log(`Мы заполнили ячейку под номером ${random_num}`)
    printArray(array)
}

function printArray(array){
    let printString = ''
    console.log('---------------')
    array.forEach(row => {
        row.forEach(el => {
            printString += `${el != 0 ? el.num : 0}`
        })
        printString += '\n'
    });
    console.log(printString)
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
        array[x][y] = {num: 2, x: x, y: y, position:`tile-position-${x+1}-${y+1}`}
    } else{
        array[x][y] = {num: 4, x: x, y: y, position:`tile-position-${x+1}-${y+1}`}
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

function animationMove(array){
    for(let i = 0; i < array.length; i++){
        array[i] = array[i].map((elem, count = 0)=>{
            if(elem != 0){
                let tile = document.querySelector(`.tile-position-${elem.x+1}-${elem.y+1}`)
                tile.classList.remove(`tile-position-${elem.x+1}-${elem.y+1}`)
                tile.classList.add(`tile-position-${i+1}-${count+1}`)
                elem.x = i
                elem.y = count
                elem.position = `tile-position-${i+1}-${count+1}`
            }
            count++
            return elem
        })
    }
}

function moveLeft(array, canMoveArray){
    let delta = 0
    for(let i = 0; i < array.length; i++){
        while(array[i].includes(0)){
            array[i] = array[i].filter(function(elem) {
                return elem != 0;
            })
        }
        while(array[i].length != 4){
            array[i].push(0)
        }
    }
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 3; j++){
            if(array[i][j].num === array[i][j+1].num && array[i][j] != 0){
                document.querySelector(`.tile-${array[i][j].num} .tile-position-${array[i][j].x+1}-${array[i][j].y+1}`).classList.add(`deleteTile`)
                array[i][j].num = array[i][j].num*2
                tileConteiner.insertAdjacentHTML('afterend', `<div class="tile tile-${array[i][j].num} tile-position-${array[i][j].x+1}-${array[i][j].y+1}"><div class="tile-inner">${array[i][j].num}</div></div>`)
                delta = array[i][j].num
                let tile = document.querySelector(`.tile-position-${array[i][j+1].x+1}-${array[i][j+1].y+1}`)
                tile.classList.remove(`tile-position-${array[i][j+1].x+1}-${array[i][j+1].y+1}`)
                tile.classList.add(`tile-position-${array[i][j].x+1}-${array[i][j].y+1}`)
                tile.classList.add('deleteTile')
                array[i].splice(j+1, 1)
                array[i].push(0)
            }
        }
    }
    if(isZeroInMas(array) && !arraysEqual(array, canMoveArray)){newNumberOnBoard(array)}
    animationMove(array)
    return [array, delta]
}

function moveRight(array, canMoveArray){
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
            if(array[i][j].num === array[i][j-1].num && array[i][j] != 0){
                // array[i][j] = array[i][j]*2
                // delta = array[i][j]
                // array[i].splice(j-1, 1)
                // array[i].unshift(0)
                /////
                document.querySelector(`.tile-position-${array[i][j].x+1}-${array[i][j].y+1}`).classList.add(`deleteTile`)
                array[i][j].num = array[i][j].num*2
                tileConteiner.insertAdjacentHTML('afterend', `<div class="tile tile-${array[i][j].num} tile-position-${array[i][j].x+1}-${array[i][j].y+1}"><div class="tile-inner">${array[i][j].num}</div></div>`)
                delta = array[i][j].num
                let tile = document.querySelector(`.tile-position-${array[i][j-1].x+1}-${array[i][j-1].y+1}`)
                tile.classList.remove(`tile-position-${array[i][j-1].x+1}-${array[i][j-1].y+1}`)
                tile.classList.add(`tile-position-${array[i][j].x+1}-${array[i][j].y+1}`)
                tile.classList.add('deleteTile')
                array[i].splice(j-1, 1)
                array[i].unshift(0)
            }
        }
    }
    if(isZeroInMas(array) && !arraysEqual(array, canMoveArray)){newNumberOnBoard(array)}
    animationMove(array)
    return [array, delta]
}

function moveUp(array, canMoveArray){
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
    if(isZeroInMas(array) && !arraysEqual(array, canMoveArray)){newNumberOnBoard(array)}
    return [array, delta]
}

function moveDown(array, canMoveArray){
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
    if(isZeroInMas(array) && !arraysEqual(array, canMoveArray)){newNumberOnBoard(array)}
    return [array, delta]
}

function canMove(array){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(i == 3){
               if(j != 3){
                if(array[i][j].num==array[i][j+1].num){
                    return true
                }
               } else {
                return false
               }
            } else{
                if(j == 3 && array[i][j].num==array[i+1][j].num){
                    return true
                }
                else if(array[i][j].num==array[i][j+1].num || array[i][j].num==array[i+1][j].num){
                    return true
                }
            }
        }
    }
    return false
}

function arraysEqual(array1, array2) {
    if (array1 === array2) return true;
    if (array1 == null || array2 == null) return false;
    if (array1.length !== array2.length) return false;
  
    for (let i = 0; i < array1.length; i++) {
        if(array1[i].length != array2[i].length) return false
        for(let j = 0; j < array1[i].length; j++){
            if (array1[i][j].num !== array2[i][j].num) return false;
        }
    }
    return true;
  }

//export {printArray, shuffle, getNumberFromIndex, getIndexFromNumber, insert_2_or_4, getEmptyList, isZeroInMas, gameStart, newNumberOnBoard, moveLeft, printArrayOnBoard, moveRight, moveUp, moveDown, canMove}

