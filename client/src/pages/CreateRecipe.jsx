import React, { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imgUrl: '',
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(recipe);

    try {
      await axios.post('http://localhost:3002/recipes/create', recipe);

      alert('Recipe created!');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="create-recipe-heading">Create Recipe</h2>

      <div className="create-recipe-container">
        <form onSubmit={onSubmit} className="simple-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} />

          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          ))}
          <button onClick={addIngredient} type="button">
            Add Ingredient
          </button>

          <label htmlFor="instructions">Instructions</label>
          <textarea
            name="instructions"
            id=""
            cols="30"
            rows="5"
            onChange={handleChange}
          ></textarea>

          <label htmlFor="imgUrl">Image URL</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            onChange={handleChange}
          />

          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            onChange={handleChange}
          />

          <button type="Submit">Create Recipe</button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
