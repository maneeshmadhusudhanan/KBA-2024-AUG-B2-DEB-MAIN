const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Simulate localStorage 
const localStorage = {
  data: {},
  setItem(key, value) {
    this.data[key] = JSON.stringify(value);
  },
  getItem(key) {
    return JSON.parse(this.data[key] || 'null');
  },
  removeItem(key) {
    delete this.data[key];
  },
};

// Predefined array of recipes
const recipes = [
  { id: "1", name: "chicken burger", ingredients: ["chicken", "bread", "cheese"] },
  { id: "2", name: "chicken nuggets", ingredients: ["chicken", "egg", "rice"] },
  { id: "3", name: "chicken Pizza", ingredients: ["bread", "cheese", "chicken"] },
  { id: "4", name: "chicken Sandwich", ingredients: ["bread", "cheese", "chicken"] },
];

function askCommand() {
  console.log("WELCOME TO RECIPE FINDER!");
  console.log("AVAILABLE COMMANDS: SEARCH, VIEW_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE, EXIT");
  rl.question("ENTER A COMMAND: ", function (command) {
    switch (command.trim().toLowerCase()) {
      case "search":
        searchRecipesPrompt();
        break;
      case "view_favorites":
        viewFavorites();
        askCommand();
        break;
      case "add_favorite":
        addFavoritePrompt();
        break;
      case "remove_favorite":
        removeFavoritePrompt();
        break;
      case "exit":
        rl.close();
        break;
      default:
        console.log("Invalid command: enter a valid choice!");
        askCommand();
    }
  });
}

// Search for recipes by ingredients
function searchRecipesPrompt() {
  rl.question("Enter ingredients (comma-separated): ", function (input) {
    const ingredients = input.split(",").map(item => item.trim().toLowerCase());
    searchRecipes(ingredients);
    askCommand();
  });
}

function searchRecipes(ingredients) {
  const results = recipes.filter(recipe =>
    ingredients.every(ingredient => recipe.ingredients.includes(ingredient))
  );
  if (results.length > 0) {
    console.log("Search Results:");
    results.forEach(recipe => console.log(`ID: ${recipe.id}, Name: ${recipe.name}`));
  } else {
    console.log("No recipes found with the specified ingredients.");
  }
}

// View favorite recipes
function viewFavorites() {
  const favorites = localStorage.getItem("favorites") || [];
  if (favorites.length > 0) {
    console.log("Favorite Recipes:");
    favorites.forEach(recipe => console.log(`ID: ${recipe.id}, Name: ${recipe.name}`));
  } else {
    console.log("No favorite recipes found.");
  }
}

// Add recipe to favorites
function addFavoritePrompt() {
  rl.question("Enter recipe ID to add to favorites: ", function (id) {
    const recipe = recipes.find(r => r.id === id.trim());
    if (recipe) {
      addFavorite(recipe);
    } else {
      console.log("Recipe not found.");
    }
    askCommand();
  });
}

function addFavorite(recipe) {
  const favorites = localStorage.getItem("favorites") || [];
  if (favorites.find(r => r.id === recipe.id)) {
    console.log("Recipe is already in favorites.");
  } else {
    favorites.push(recipe);
    localStorage.setItem("favorites", favorites);
    console.log(`Recipe with ID ${recipe.id} added to favorites!`);
  }
}

// Remove recipe from favorites
function removeFavoritePrompt() {
  rl.question("Enter recipe ID to remove from favorites: ", function (id) {
    removeFavorite(id.trim());
    askCommand();
  });
}

function removeFavorite(id) {
  let favorites = localStorage.getItem("favorites") || [];
  favorites = favorites.filter(recipe => recipe.id !== id);
  localStorage.setItem("favorites", favorites);
  console.log(`Recipe with ID ${id} removed from favorites!`);
}

// Start the command prompt loop
askCommand();
