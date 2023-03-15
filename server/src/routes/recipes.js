import express from 'express';
import RecipeModel from '../models/Recipes.js';
import UserModel from '../models/Users.js';

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

router.put('/', async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);

    await user.save();
    res.send({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/savedRecipes/ids/:userID', async (req, res) => {
  console.log(req.params.userID);
  try {
    const user = await UserModel.findById(req.params.userID);
    res.send({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.send(error);
  }
});

router.get('/savedRecipes', async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.send({ savedRecipes });
  } catch (error) {
    res.send(error);
  }
});

export { router as recipeRouter };
