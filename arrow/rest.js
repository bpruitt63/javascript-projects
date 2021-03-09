const filterOdds = (...nums) => nums.filter(num => num % 2 === 0);

const findMin = (...nums) => nums.reduce(function(min, next){
    if (min > next){
        min = next;
    } return min;
});

function mergeObjects(obj1, obj2){
    return {...obj1, ...obj2};
}

function doubleAndReturnArgs(arr, ...rest){
    let r = [...rest].map(function(val){
        return val * 2;
    })
    return [...arr, ...r];
}

const removeRandom = (items) => {
    let i = items[Math.floor(Math.random() * items.length)];
    let newItems = [...items];
    newItems.splice(i, 1);
    return newItems;
}

const extend = (array1, array2) => {
    return [...array1, ...array2];
}

const addKeyVal = (obj, key, val) => {
    return { ...obj, [key]: val};
}

const removeKey = (obj, key) => {
    let newObj = {...obj};
    delete newObj[key]
    return newObj;
}

const combine = (obj1, obj2) => {
    let newObj = {...obj1, ...obj2};
    return newObj;
}

let update = (obj, key, val) => {
    return {...obj, [key]: val};
}