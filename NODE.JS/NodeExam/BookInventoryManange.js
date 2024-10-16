const readline = require("readline");      //ALLOW TO READ INPUT FROM USER
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inventory = new Map(); //defined a map here, which is a data structure that stores key-value pairs
 

function askCommand() {
  console.log("WELCOME TO MANAGE BOOK INVENTORY  SYSTEM!");
  console.log("AVAILABLE COMMANDS: ADD, REMOVE, SEARCH, UPDATE, SUMMARY, EXIT");
  rl.question("ENTER A COMMAND: ", function (command) {  //i take command as a value and nested this call back funtioninside this call back funtion
 
    //call back funtion
    switch (command.trim().toLowerCase()) {
      case "add":
        addBookPrompt();
        break;
      case "remove":
        removeBookPrompt();
        break;
      case "search":
        searchBookPrompt();
        break;
      case "update":
        updateBookPrompt();
        break;
      case "summary":
        printSummary();
        askCommand();//ask funtion starts here
        break;
      case "exit"://exit over here
        console.log("WE ARE EXIT FROM BOOK INVENTORY MANANGEMENT SYSTEM");
        rl.close();
        break;
      default:
        console.log("WRONG COMMAND: ENTER  A VALID COMMAND!");
        askCommand();
    }
  });
}

// Function to add a book
function addBookPrompt() {
  rl.question("ENTER A BOOK ID : ", function (id) {                    //1st nested funtion
    rl.question("ENTER BOOK TITLE : ", function (title) {              //nested funtions
      rl.question("ENTER BOOK AUTHOR : ", function (author) {
        rl.question("ENTER BOOK GENRE : ", function (genre) {
          addBook(id, title, author, genre);
          askCommand();
        });
      });
    });
  });
}

function addBook(id, title, author, genre) {
  if (inventory.has(id)) {
    console.log(`ERROR: BOOK WITH ID ${id} ALREADY EXIST!`);
  } else {
    inventory.set(id, {title,author,genre });
    console.log(`BOOK WITH ID ${id} ADDED TO INVENTORY!`);
  }
}

// Function to remove a book
function removeBookPrompt() {
  rl.question("ENTER A BOOK ID TO REMOVE: ", function (id) {
    removeBook(id);
    askCommand();
  });
}

function removeBook(id) {
  if (inventory.has(id)) {
    inventory.delete(id);                                            //map.delete
    console.log(`BOOK WITH ID: ${id} REMOVED FROM INVENTORY!`);
  } else {
    console.log(`ERROR: NO BOOK WITH ID: ${id} FOUND!`);
  }
}

// Function to search for books
function searchBookPrompt() {
  rl.question("ENTER A SEARCH METHOD: (ID, TITLE, AUTHOR, or GENRE): ", function (searchTerm) {
    searchBooks(searchTerm);
    askCommand(); // it loop again
  });
}

function searchBooks(searchTerm) {
  const results = [];                                //saving to the array
  for (const [id, book] of inventory) {
    if (
      id.includes(searchTerm) ||
      book.title.includes(searchTerm) ||
      book.author.includes(searchTerm) ||
      book.genre.includes(searchTerm)                //it check the term search and return to the bottom
    ) {
      results.push({ id, ...book });                 // item is added using spread operator ,it fetches the value of items
                                                     // push into the array
    }
  }

  if (results.length > 0) {
    console.log("SEARCH RESULT:", results);
  } else {
    console.log("NO BOOKS FOUND!");
  }
}

// Function to update a book
function updateBookPrompt() {
  rl.question("ENTER A BOOK ID TO UPDATE : ", function (id) {
    rl.question("ENTER A NEW BOOK TITLE : ", function (newTitle) {
          updateBook(id, newTitle,);
          askCommand(); // it looped again
        });
      });
    };
  ;


function updateBook(id, newTitle,) {
  if (inventory.has(id)) {
    const book = inventory.get(id);   //book is an object
    book.title = newTitle || book.title;
    console.log(`BOOK UPDATED: ${book.title}`);       //if item has new title then it update.
    inventory.set(id, book);
    console.log(`BOOK WITH ID: ${id} UPDATED SUCCESSFULLY!`);
  } else {
    console.log(`ERROR: BOOK WITH  ID: ${id} NOT FOUND!`);
  }
}

// Function to print summary of all books
function printSummary() {
  if (inventory.size > 0) {
    console.log("BOOK INVENTORY SUMMARY:");
    for (const [id, book] of inventory) {
      console.log(`ID: ${id}, TITLE: ${book.title}`);
    }
  } else {
    console.log("NO BOOKS FOUND!");
  }
}

// Start the command prompt
askCommand();