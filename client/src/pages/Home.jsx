import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3002/recipes/');
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-page-heading">Recipes</h1>

      <ul>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-container">
            <div>
              <h1>{recipe.name}</h1>
              <button className="save-recipe-btn">Save</button>
            </div>

            <div>
              <p>{recipe?.instructions}</p>
            </div>

            <img
              src={recipe.imgUrl}
              alt=""
              style={{ height: '250px', width: '400px', objectFit: 'cover' }}
            />

            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
