import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteRecipes: [], // array to store multiple recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const index = state.favoriteRecipes.findIndex(item => item.id === recipe.id);

      if (index >= 0) {
        // Remove from favorites
        state.favoriteRecipes.splice(index, 1);
      } else {
        // Add recipe to favorites array
        state.favoriteRecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
