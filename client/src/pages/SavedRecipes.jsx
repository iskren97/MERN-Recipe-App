import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="home-page">
      <h1 className="home-page-heading">
        {savedRecipes.length !== 0
          ? 'Saved Recipes'
          : 'You have no saved recipes yet'}
      </h1>

      <ul>
        {savedRecipes?.map((recipe) => (
          <div key={recipe._id} className="recipe-container">
            <div>
              <h1>{recipe.name}</h1>
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

export default SavedRecipes;
