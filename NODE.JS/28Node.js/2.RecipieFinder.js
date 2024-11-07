

        const recipes = [
            { name: 'Spaghetti Bolognese', ingredients: ['spaghetti', 'minced meat', 'tomato sauce'] },
            { name: 'Chicken Curry', ingredients: ['chicken', 'curry powder', 'coconut milk'] },
            { name: 'Vegetable Stir Fry', ingredients: ['broccoli', 'carrot', 'soy sauce'] },
            { name: 'Pancakes', ingredients: ['flour', 'milk', 'egg'] },
            { name: 'Caesar Salad', ingredients: ['lettuce', 'croutons', 'Caesar dressing'] }
        ];

        const ingredientForm = document.getElementById('ingredient-form');
        const recipeList = document.getElementById('recipe-list');
        const favoriteList = document.getElementById('favorite-list');

        ingredientForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const ingredientInput = document.getElementById('ingredients').value;
            const ingredients = ingredientInput.split(',').map(ing => ing.trim());
            findRecipes(ingredients);
        });

        function findRecipes(ingredients) {
            recipeList.innerHTML = ''; // Clear previous results
            const filteredRecipes = recipes.filter(recipe => 
                ingredients.every(ing => recipe.ingredients.includes(ing))
            );

            filteredRecipes.forEach(recipe => {
                const li = document.createElement('li');
                li.textContent = recipe.name;
                const favoriteButton = document.createElement('button');
                favoriteButton.textContent = 'Add to Favorites';
                favoriteButton.onclick = () => addToFavorites(recipe.name);
                li.appendChild(favoriteButton);
                recipeList.appendChild(li);
            });
        }

        function addToFavorites(recipeName) {
            const favorites = getFavorites();
            if (!favorites.includes(recipeName)) {
                favorites.push(recipeName);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                displayFavorites();
            } else {
                alert('Recipe is already in favorites!');
            }
        }

        function getFavorites() {
            return JSON.parse(localStorage.getItem('favorites')) || [];
        }

        function displayFavorites() {
            favoriteList.innerHTML = ''; // Clear previous favorites
            const favorites = getFavorites();

            favorites.forEach(recipe => {
                const li = document.createElement('li');
                li.textContent = recipe;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove from Favorites';
                removeButton.onclick = () => removeFromFavorites(recipe);
                li.appendChild(removeButton);
                favoriteList.appendChild(li);
            });
        }

        function removeFromFavorites(recipeName) {
            let favorites = getFavorites();
            favorites = favorites.filter(recipe => recipe !== recipeName);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            displayFavorites();
        }

        // Display favorites on page load
        displayFavorites();
    