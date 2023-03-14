import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    <>
      <h1>Recipes</h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h3>{recipe.name}</h3>
              <button>Save</button>
            </div>

            <div>
              <p>{recipe?.instructions}</p>
            </div>

            <img
              src={recipe.imgUrl}
              alt=""
              style={{ height: '220px', width: '200px', objectFit: 'cover' }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
