import Register from '../containers/Register'
import Login from '../containers/Login'
import Home from '../containers/Home'


export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';

const ROUTES = [
  {
    path: SIGN_UP,
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: SIGN_IN,
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: HOME,
    name: "home",
    icon: "ni ni-tv-2 text-primary",
    component: Home,
    layout: "/admin" //Ne signifie pas que l'utilisateur est forcément un admin
  },
];

export default ROUTES;