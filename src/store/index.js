import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    updateUser(state, payload) {
      console.log("PAYLOAD IN MUTATION", payload.displayName);
      state.user = payload;
    },
    logoutUser(state) {
      state.user = null;
      console.log("MUTATION LOGOUT");
    },
  },
  actions: {
    updateUserAction(context, payload) {
      console.log("ACTION WORKS", payload);
      context.commit("updateUser", payload);
    },
    logoutUserAction(context) {
      console.log(context);
      console.log("LOGOUT WORKS");
      context.commit("logoutUser");
    },
  },
});
