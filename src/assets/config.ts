import axios from "axios";

axios.defaults.baseURL = import.meta.env.REACT_APP_BASE_URL;
console.log(import.meta.env.REACT_APP_BASE_URL);

export const LOGINURI = "auth/login";
export const MUSCLEURI = "assets/muscles";
export const EXERCISEURI = "assets/exercises";
export const USEREXERURI = "assets/user/exercises";
export const USERURI = "user";

export const LOCALSTORAGEPRESET = "training-app-";