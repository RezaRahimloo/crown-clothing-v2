import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAdnDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());

//   try {
//     const categories = await getCategoriesAdnDocuments("categories");
//     dispatch(fetchCategoriesSuccess(categories));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed());
//   }
// };

export function* fetchCategoriesAsync(){// the saga that gets called
    try {
        const categories = yield call(getCategoriesAdnDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categories)) // dispatch
      } catch (error) {
        yield put(fetchCategoriesFailed());
      }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync) // restart the action with the latest one that hits
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]); // finish all the things then go to next line
}