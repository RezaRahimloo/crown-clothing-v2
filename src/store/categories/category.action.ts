import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { getCategoriesAdnDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORIES_ACTION_TYPE, Category } from "./category.types";

// export const setCategories = (categoriesArray) =>
//   createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED,
  Error
>;


export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
  return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);
});

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess => {
    return createAction(
      CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    );
  }
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed => {
    return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);
  }
);

// for thunk
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());

//   try {
//     const categories = await getCategoriesAdnDocuments("categories");
//     dispatch(fetchCategoriesSuccess(categories));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed());
//   }
// };
