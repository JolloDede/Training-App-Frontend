import axios from "axios";
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const LOGINURI = "auth/login";
export const MUSCLEURI = "assets/muscles";
export const EXERCISEURI = "assets/exercises";
export const USEREXERURI = "assets/user/exercises";
export const USERURI = "user";

export const LOCALSTORAGEPRESET = "training-app-";