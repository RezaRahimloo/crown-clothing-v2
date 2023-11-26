import { AnyAction } from "redux";
import {
  fetchCategoriesStart,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./category.action";
import { CATEGORIES_ACTION_TYPE, Category } from "./category.types";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
//const { type, payload } = action;

//   switch (action.type) {
//     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
//       return { ...state, isLoading: true };

//     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
//       return { ...state, categories: action.payload, isLoading: false };

//     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
//       return { ...state, error: action.payload, isLoading: false };

//     default:
//       return state;
//   }
// };

// old
// export const categoriesReducer = (
//   state = CATEGORIES_INITIAL_STATE,
//   action = {} as CategoryAction
// ) => {
//   //const { type, payload } = action;

//   switch (action.type) {
//     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
//       return { ...state, isLoading: true };

//     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
//       return { ...state, categories: action.payload, isLoading: false };

//     case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
//       return { ...state, error: action.payload, isLoading: false };

//     default:
//       return state;
//   }
// };