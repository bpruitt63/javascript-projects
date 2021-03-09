{1, 2, 3, 4}

'ref'

0: {Array(3) => true}
1: {Array(3) => false}

function hasDuplicate(arr){
    let set = new Set(arr);
    if (arr.length !== set.size){
        return true;
    } return false;
}

function isVowel(char){
    return "aeiou".includes(char);
  }
  
function vowelCount(str){
    const vowelMap = new Map();
    for(let char of str){
      let lowerCaseChar = char.toLowerCase()
      if(isVowel(lowerCaseChar)){
        if(vowelMap.has(lowerCaseChar)){
          vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1);
        } else {
          vowelMap.set(lowerCaseChar, 1);
        }
      }
    }
    return vowelMap;
}