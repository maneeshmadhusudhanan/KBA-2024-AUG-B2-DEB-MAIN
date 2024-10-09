const readline = require('readline'); //import readline module


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    function askName(){
        rl.question("whats your name ?",function(name){
            console.log(`Hello, ${name}!`);
            askFavoriteLanguage();
        });
    }
    function askFavoriteLanguage(){
        rl.question("what is your favorite programming language ?",function(language){
            console.log(`${language} is a great choice!`);
            rl.close();
        });
    }

//start prompt
console.log('welcome to simple interface using readline!');
askName(); 

