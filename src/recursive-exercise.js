function sumRange(n) {
    if (n === 1) {
        return 1
    }
    return n + sumRange(n-1)
}

function power(b , e) {
    if (e == 0) {
        return 1
    }
    return b * power(b , e - 1)
}

function factorial(n) {
    if (n === 1) {
        return 1
    }
    return n * factorial(n-1)
}

function all(arr, callback) {
    if (callback(arr[0]) == false) {
        return false
    }
    else if (arr.length == 1) {
        return true
    }
    return all(arr.slice(1), callback)
}

function productOfArray(arr) {
    if (arr.length === 1) {
        return arr[0]
    }
    return arr[0] * productOfArray(arr.slice(1))
}

function totalIntegers(arr) {
    if (Number.isInteger(arr)) {
        return 1
    }
    let total = 0
    for (const element of arr) {
        total += totalIntegers(element)
    }
    return total
}


function SumSquares(input) {
    if (Number.isInteger(input)) {
        return input * input
    }
    let total = 0
    for (const el of input) {
        total += SumSquares(el)
    }
    return total
}

function replicate(cant, num) {
    if (cant <= 0) {
        return []
    }
    const arr = replicate(cant-1, num)
    arr.push(num)
    return arr
}

function fibs(num) {
    if (num <= 0) {
        return 'please enter a positive integer'
    }
    if (num === 1) return [0]
    const fibStart = [0,1]
    if (num === 2) return fibStart
    for (let i = 2 ; i < num ; i++) {
        fibStart.push(fibStart[fibStart.length - 1] + fibStart[fibStart.length - 2])
    }
    return fibStart
}

function fibsRec(num) {
    if (num <= 0) {
        return 'please enter a positive integer'
    }
    if (num === 1) return [0]
    const fibStart = [0,1]
    if (num === 2) return fibStart
    const accumulated = fibsRec(num - 1)
    accumulated.push(accumulated[accumulated.length - 1] + accumulated[accumulated.length - 2])
    return accumulated
}

function mergeSort(arr) {
    if (arr.length === 1) return arr
    else {
        const firstHalf = arr.slice(0, Math.floor(arr.length/2))
        const secondHalf = arr.slice(Math.floor(arr.length/2))
        const sortedFirst = mergeSort(firstHalf)
        const sortedSec = mergeSort(secondHalf)
        const sortedArr = []
        while (sortedFirst.length && sortedSec.length) {
                if (sortedFirst[0] < sortedSec[0]) {
                    sortedArr.push(sortedFirst.shift())
                }
                else {
                    sortedArr.push(sortedSec.shift())
                }
        }  
        return [...sortedArr, ...sortedFirst, ...sortedSec]
        
        
    }
}

console.log(mergeSort([105, 79, 100, 110]))