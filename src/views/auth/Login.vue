<template>
  <div class="login-page">
    <form @submit.enter.prevent="handleSubmit">
      <h2>Log in</h2>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />

      <div class="error">{{ error }}</div>

      <button v-if="!isPending">Log in</button>
      <button v-else disabled>Loading...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import store from "@/store";

export default {
  setup() {
    //COMPOSABLES
    const { error, login, isPending } = useLogin();
    const router = useRouter();
    const { user } = getUser();

    //REFS
    const email = ref("");
    const password = ref("");

    //FUNCTIONS
    const handleSubmit = async () => {
      const res = await login(email.value, password.value);

      if (!error.value) {
        if (user.value) {
          store.dispatch("updateUserAction", user.value);
          router.push({
            name: "UserPlaylists",
            params: { username: user.value.displayName },
          });
        }
      }
    };

    return { email, password, error, isPending, handleSubmit };
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  margin-top: 100px;

  form {
    text-align: left;
  }
}
</style>
