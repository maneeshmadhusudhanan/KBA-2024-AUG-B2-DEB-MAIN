const lodash = require('lodash');



console.log('HELLO WORLD')
const newName  = 'Node.js';
console.log('HELLO', `${newName}`);
if(newName==='Node.js'){
    console.log('running on Node.js environment!');

}
for(let i=0;i<5;i++){
    console.log(i+1);
}

let array = [1,2,3,4,5];
console.log(lodash.reverse(array));
console.log(lodash.capitalize(''));



