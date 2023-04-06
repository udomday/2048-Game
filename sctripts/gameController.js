function printArray(array){
    console.log('---------------')
    array.forEach(el => {
        console.log(...el)
    });
    console.log('---------------')
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
        return false
    }
}

export {printArray, shuffle, getNumberFromIndex, getIndexFromNumber, insert_2_or_4, getEmptyList, isZeroInMas}

