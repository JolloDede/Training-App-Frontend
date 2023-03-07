import axios from "axios";

axios.defaults.baseURL = window.location.hostname === "localhost"? "http://localhost:3000/": "https://training-app-backend.vercel.app";

export const LOGINURI = "auth/login";
export const MUSCLEURI = "assets/muscles";
export const EXERCISEURI = "assets/exercises";
export const USEREXERURI = "assets/user/exercises";
export const WORKOUTRURI = "assets/user/workouts";
export const USERURI = "user";

export const LOCALSTORAGEPRESET = "training-app-";