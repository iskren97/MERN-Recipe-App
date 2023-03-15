/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3002/recipes/');
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put('http://localhost:3002/recipes', {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const isRecipeSaved = (recipeID) => savedRecipes?.includes(recipeID);

  return (
    <div className="home-page">
      <h1 className="home-page-heading">Recipes</h1>

      <ul>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-container">
            <div>
              <h1>{recipe.name}</h1>
              <button
                className="save-recipe-btn"
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
              </button>
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
