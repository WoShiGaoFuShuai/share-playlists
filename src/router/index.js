import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreatePlaylists from "../views/playlists/CreatePlaylists.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import UserPlaylists from "../views/playlists/UserPlaylists.vue";
import { projectAuth } from "@/firebase/config";
import store from "@/store";

const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    store.dispatch("updateUserAction", user);
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylists",
    component: CreatePlaylists,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:playlistId",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/playlists/",
    name: "UserPlaylists",
    component: UserPlaylists,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
