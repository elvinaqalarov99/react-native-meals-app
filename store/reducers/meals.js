import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAV } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filtredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV:
      const existingIdx = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIdx >= 0) {
        const updatedFavs = [...state.favoriteMeals];
        updatedFavs.splice(existingIdx, 1);
        return { ...state, favoriteMeals: updatedFavs };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filtredMeals: filteredMeals,
      };

    default:
      return state;
  }
};

export default mealsReducer;
