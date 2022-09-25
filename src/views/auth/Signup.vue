<template>
  <div class="signup-page">
    <form @submit.enter.prevent="handleSubmit">
      <h2>Sign up</h2>
      <input type="text" v-model="nickname" placeholder="Nickname" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />

      <div class="error">{{ error }}</div>

      <button v-if="!isPending">Sign up</button>
      <button v-else disabled>Loading...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import store from "@/store";

export default {
  setup() {
    // COMPOSABLES
    const { error, signup, isPending } = useSignup();
    const router = useRouter();
    const { user } = getUser();

    //REFS
    const nickname = ref("");
    const email = ref("");
    const password = ref("");

    // FUNCTIONS
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, nickname.value);

      if (!error.value) {
        if (user.value) {
          store.dispatch("updateUserAction", res.user);
          router.push({
            name: "CreatePlaylists",
          });
        }
      }
    };

    return { nickname, email, password, handleSubmit, isPending, error };
  },
};
</script>

<style lang="scss" scoped>
.signup-page {
  margin-top: 100px;

  form {
    text-align: left;
  }
}
</style>
