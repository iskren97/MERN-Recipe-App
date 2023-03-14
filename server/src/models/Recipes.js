import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: { type: String },
  imgUrl: { type: String },
  cookingTime: { type: Number },
  userOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const RecipeModel = mongoose.model('recipes', recipeSchema);

export default RecipeModel;
