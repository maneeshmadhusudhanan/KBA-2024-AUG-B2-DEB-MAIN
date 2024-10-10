
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inventory = new Map(); // DEFINED A MAP

function askCommand() {
  console.log("WELCOME TO INVENTORY MANAGEMENT SYSTEM!");
  console.log("AVAILABLE COMMANDS: ADD, REMOVE,SEARCH,UPDATE,SUMMARY,EXIT");
  rl.question("ENTER A COMMAND:", function (command) {// command is a value   // we nest this call back funtion inside this call back funtion (nested call back funtion)


    //CALL BACK FUNTION
    switch (command.trim().toLowerCase()) {
      case "add":
        addItemPrompt();
        break;
      case "remove":
        removeItemPrompt();
        break;
      case "search":
        searchItemPrompt();
        break;
      case "update":
        updateItemPrompt();
        break;
      case "summary":
        printSummary();
        askCommand(); // ASK FUNTION STARTS HERE  .it continously work it go to line 7
        break;
      case "exit"://EXIT OVER HERE 
        rl.close();
        break;
      default:
        console.log("Invalid command: enter a valid choice!.");
        askCommand(); // THEN FUNTION GOES TO ASK COMMAND.
    }
  });
}
//funtion to add an item       


//we call nested funtion over here 

function addItemPrompt(){
    rl.question("Enter an item id:",function(id){//1nested funtion
        rl.question("Enter an item name:",function(name){//nested funtion
            rl.question("Enter item Category:",function(Category){
                rl.question("Enter item quantity:",function(quantity){
                    addItem(id,name,Category,parseInt(quantity));
                    askCommand();
                });
            });
    });
    });
}
function addItem(id,name,Category,quantity){// 
    if(inventory.has(id)){
        console.log(`Error item with id ${id} Item already exists!"`);
        }else{
            inventory.set(id,{name,Category,quantity});
            console.log(`Item with ID ${id} add to inventory!`)
            }

    }

    //remove funtion 

function removeItemPrompt(){
    rl.question("Enter an item id to remove :",function(id){
        removeItemPrompt(id);
        askCommand();
        });

}

function removeItem(id){
    if(inventory.has(id)){
        inventory.delete(id);//map.delete
        console.log(`Item with ID ${id} removed from inventory!`);
        }else{
            console.log(`Error :No item with ID ${id} found!`);
            }
    }


    //search funtion
    function searchItemPrompt(){
        rl.question("Enter an item id to search :",function(searchTerm){
            searchItems(searchTerm);
            askCommand(); //it loop again
        });

    }
    function searchItems(searchTerm){
        const results = [];  //saving to the array 
        for (const [id, item] of inventory) {
            if (id.includes(searchTerm)||item .name.includes(searchTerm)||item.Category.includes(searchTerm)||item.quantity.includes(searchTerm)){ //it ckeck the term search and return to the botom
                results.push({id,...item});  //item is added using spread operator it feches the value of items
                //push into the array 
            }}

            if(results.length>0){
                console.log('search result:',results);
            }else{
                console.log('no item found!')
            }

            }
// funtion to update
function updateItemPrompt(){
    
    rl.question("Enter an item id:",function(id){
        rl.question("Enter an item name:",function(newName){
            rl.question("Enter item Category:",function(newCategory){
                rl.question("Enter item quentity:",function(newQuantity){
                   updateItem(id,newName,newCategory,newQuantity ? parseInt(newQuantity) : undefined);
                    askCommand(); // it again looped
                });
            });
        });
        });
    }

    function updateItem(id,newName,newCategory,newQuantity){
        if(inventory.has(id)){
            const item = inventory.get(id);// item is an object 
            item.name = newName || item.name; // if item is new item then it update
            item.Category = newCategory || item.Category;
            item.quantity = newQuantity !== undefined? newQuantity: item.quantity;// if its undifined we will check the quantity
            inventory.set(id,item);
            console.log(`item with ID ${id} update!`);
            }else{
                console.log(`item with ID ${id} not found!`);
                }


    }

    //funtion to summary
     function printSummary(){
        if(inventory.size>0){
            console.log('inventory  Summary:');
            for(const[id,item]of inventory){
                console.log(`ID: ${id},NAME:${item.name},CATEGORY:${item.Category},QUANTITY:${item.quantity}`);
                }
                }else{
                    console.log('no items found!');
                    }
        }


        askCommand();
