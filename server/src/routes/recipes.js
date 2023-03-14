import express from 'express';
import RecipeModel from '../models/Recipes.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});

    if (recipes.length === 0) {
      throw new Error('No recipes yet');
    }

    res.send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/create', async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);

    await recipe.save();
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { router as recipeRouter };
