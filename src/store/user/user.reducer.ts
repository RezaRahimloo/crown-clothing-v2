import { USER_ACTION_TYPES } from "./user.types";
import {
  SignInFailed,
  signOutFailed,
  signUpFailed,
  SignOutSuccess,
  SignInSuccess,
  signInSuccess,
  signOutSuccess,
  signInFailed,
} from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (
    signOutFailed.match(action) ||
    signInFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state;
};

// export const userReducer = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return { ...state, currentUser: payload };
//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return { ...state, currentUser: null };
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//       return { ...state, error: payload };
//     default:
//       return state;
//   }
// };
